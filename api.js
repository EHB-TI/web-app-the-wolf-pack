require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const Movie = require("./DB/movie");
const {movies} = require("./DB/data.js");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const jwtAuthz = require('express-jwt-authz');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const corsOptions = {
    origin: process.env.AUTH0_BASEURL,
    credntials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.format({
        "application/json": () => next(),
        default: () => res.status(406).end(),
    });
});

const checkToken = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:  `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkForAdminPermissions = jwtAuthz(['read:movies', 'create:movies', 'update:movies', 'delete:movies'],{
    customScopeKey: 'permissions',
    checkAllScopes: true
});

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(db => {
            // remove all records from the db
            Movie.deleteMany().then(() => {
                movies.forEach((movie) => {
                    movie.save().then(res => console.log("Movie is saved"));
                });
            });
        })
        .then(res => app.listen(port, () => console.log(`Listening on port ${port}`)))
        .catch(err => console.log(err));

// PUBLIC ROUTES
app.get("/movies", async(req,res, next) => {
    try {
        const movies = await Movie.find({});
        res.status(200).send(movies);
    } 
    catch (err) { 
        next(err);
    }
});

app.get("/movies/:id", async(req,res, next) => {
   try {
         const movie = await Movie.findById(req.params.id);
         res.status(200).send(movie);
   }
   catch (err) {
       err.status = 404;
       err.name = "NotFoundError"
       err.message = "Movie not found";
       next(err);
   }
});

// PROTECTED ROUTES (only for admins)
app.post("/movies",checkToken, checkForAdminPermissions, async(req,res, next) => { 
    try {
        const newMovie = new Movie(req.body);
        console.log(newMovie);
        await newMovie.save();
        res.status(201).send(newMovie);
    }
    catch (err) {
        next(err);
    }
});

app.put('/movies/:id',checkToken, checkForAdminPermissions, async(req,res, next) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).send(updatedMovie);
    }
    catch(err) {
        err.status = 404;
        err.name = "NotFoundError"
        err.message = "Movie not found";
        next(err);
    }
});

app.delete("/movies/:id",checkToken, checkForAdminPermissions, async(req,res, next) => {
   try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(204).send({});
   }
   catch (err) {
       err.status = 404;
       err.name = "NotFoundError"
       err.message = "Movie not found";
       next(err);
   }
});

app.use((error, req, res, next) => {
    if (error.name === "UnauthorizedError") {
        res.status(error.status || 500).send({
            message: "Missing or invalid token",
            status: error.status || 500,
            name: error.name
        });
        return;
    }
    res.status(error.status || 500).send({
            message: error.message,
            status:  error.status || 500,
            name: error.name
    });
});

