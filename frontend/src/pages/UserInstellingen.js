import React from "react";
import { deleteUser, getManagmentAccessApiToken } from "../api/users";
import SidebarUser from "../components/SidebarUser";

export const UserInstellingen = () => {

  const getToken = async () =>{
    const token = await getManagmentAccessApiToken();
    console.log(token.access_token);
  }

  return (
    <div className="App font-bold flex-grow">
      <div class="container mx-auto px-2 mt-16 text-left text-color-footer">
        <div class="flex flex-wrap">
          <SidebarUser />
          <div class="mt-2 ml-20 pr-20 float-right w-auto h-auto">
              <button
                class="shadow focus:shadow-outline focus:outline-none text-color-label font-bold py-2 px-4 rounded ml-2"
                type="button" onClick={getToken}
              >
                Uitschrijven van de website
              </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserInstellingen;
