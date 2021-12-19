import React, {useEffect, useState} from 'react';
import SidebarUser from '../components/SidebarUser';
import Movie from "../components/Movie";
import {getAllMovies} from "../api/movies.js";

var today = new Date(Date.now());

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getLocalDateString(date){
  return date.toLocaleDateString("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: 'long'
});
}

export const UserDashboard = () => {
    const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies().then(movies => setMovies(movies));
  }, []);

  return (
    <div className="App font-bold flex-grow">
      <div class="container mx-auto px-2 mt-16 text-left text-color-footer">
          <div class=" border-gray-300 flex flex-wrap">
          <SidebarUser />
          <div class="mt-2 ml-20 pr-20 float-right w-auto h-auto">
            <h1 class="text-center">{capitalize(today.toLocaleDateString('nl-NL', {weekday: "long"})) + '\t' +today.getDate() + '/' + (today.getMonth() + 1)}</h1>
            <div class="grid grid-cols-4 gap-2 place-content-start mt-10 overflow-auto w-auto">
                {
                  movies.filter(movie => movie.vertoningen.filter(vertoning => vertoning.datum === getLocalDateString(new Date(today)).split(" ").slice(1).join(" ")).length > 0).map(movie => <Movie movie={movie} key={movie._id}/>)
                }
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default UserDashboard;