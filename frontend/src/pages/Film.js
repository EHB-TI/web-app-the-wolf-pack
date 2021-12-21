import React, {useEffect, useState} from "react";
import { getMovieById } from "../api/movies";
import {useLocation} from "react-router-dom";
import Vertoning from "../components/Vertoning";

export const Film = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [movie, setMovie] = useState(undefined);

  useEffect(() => {
    getMovieById(id).then(movie => setMovie(movie));
  }, [id]);

  return (
    <>
    { movie && <div class="App flex-grow mb-5">
      <div class="container mx-auto px-6 mt-16 text-left text-color-footer">
        <div class="border-gray-300 flex flex-wrap">
        <div class="grid grid-cols-4 gap-2 place-content-start mt-10 overflow-auto w-auto">
            <div class="font-bold">
              <img
                class="h-72 w-auto"
                src={movie.img_url}
                alt="Workflow"
                height="20%"
                width="20%"
              />
            </div>
            <div class="ml-1 font-extrabold">
            <p class="text-black"> {movie.titel}</p>
              <br />
              <p class="text-black font-bold">
                Regisseur: <span class="ml-5 font-normal"> {movie.regisseur} </span>
              </p>
              <p class="text-black font-bold">
                Cast: <span class="ml-5 font-normal"> {movie.hoofdrollen.join(", ")} </span>
              </p>
              <p class="text-black font-bold">
                Release date: <span class="ml-5 font-normal"> {movie.release_datum} </span>
              </p>
              <p class="text-black font-bold">
                Duur: <span class="ml-5 font-normal"> {movie.duur} </span>
              </p>
              <p class="text-black font-bold">
                Beschrijving: <span class="ml-5 font-normal"> {movie.description} </span>
              </p>
            </div>

            {
              movie.vertoningen &&  movie.vertoningen.length > 0 && 
              <div class="ml-32 font-bold">
                  <p class="text-black font-extrabold">Tickets</p>
                  {
                    movie.vertoningen.map(vertoning => <Vertoning vertoning={vertoning} movie={movie}/>)
                  }
              </div> 
              }  
          </div>
        </div>
      </div>
    </div>
    }
    </>
  );
}

export default Film;
