import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Vertoning = ({ vertoning,movie }) => {

    const {isAuthenticated} = useAuth0();
    const onClickHandler = () => {
        if (isAuthenticated){
           window.location = `/winkelwagen?vertoning=${vertoning._id}&movie=${movie._id}`;
        }
        else {
            alert("U moet ingelogd zijn om tickets te kunnen aankopen");
        }
    }
   
    return (
        <div className="flex flex-row text-black mt-2">
            <div className="flex flex-col w-3/4 ">
                 <p> {vertoning.dag.toUpperCase()} </p>
                 <p className="font-extralight"> {vertoning.datum} </p>
            </div>
            <button class="ml-2 shadow font-bold py-2 px-4 rounded hover:bg-gray-50" type="submit" onClick={onClickHandler}>{vertoning.uur}</button>
        </div>
    );

}

export default Vertoning;