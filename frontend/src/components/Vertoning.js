import React from "react";
import Winkelwagen from "../pages/Winkelwagen";
import { Link } from "react-router-dom";


const Vertoning = ({ vertoning }) => {
   
    return (
        <div className="flex flex-row text-black mt-2">
            <div className="flex flex-col w-3/4 ">
                 <p> {vertoning.dag.toUpperCase()} </p>
                 <p className="font-extralight"> {vertoning.datum} </p>
            </div>
            <Link to="/winkelwagen">
            <button class="ml-2 shadow font-bold py-2 px-4 rounded hover:bg-gray-50" type="submit">{vertoning.uur}</button>
            </Link>
        </div>
    );

}

export default Vertoning;