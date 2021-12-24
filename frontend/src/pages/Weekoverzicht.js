import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api/movies";
import { Link } from "react-router-dom";

export const Weekoverzicht = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies().then((movies) => setMovies(movies));
  }, [movies]);

  return (
    <div className="App font-bold flex-grow mb-3 text-color-footer">
      <div className="grid grid-cols-2 gap-2 place-content-start overflow-auto w-auto p-4">
        {movies.filter(movie => movie.isReleased && movie.vertoningen.length > 0).map((movie) => (
          <>
            <div className="ml-20 mb-5">
              <Link to={`/movies/${movie._id}`}>
                {" "}
                <img
                  className="h-72 w-auto float-left"
                  src={movie.img_url}
                  alt="Workflow"
                  height="20%"
                  width="20%"
                />
              </Link>

              <p className="text-center">{movie.titel}</p>
              {movie.vertoningen.map((vertoning) => (
                  <p>{vertoning.dag.toUpperCase()} {vertoning.datum}: {vertoning.uur} zaal: {vertoning.zaal}</p>    
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Weekoverzicht;
