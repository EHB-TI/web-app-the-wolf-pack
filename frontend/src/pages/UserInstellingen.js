import React from "react";
import { deleteUser,getManagmentAccessApiToken } from "../api/users";
import SidebarUser from "../components/SidebarUser";
import { useAuth0 } from "@auth0/auth0-react";

export const UserInstellingen = () => {
  const {getIdTokenClaims} = useAuth0();

  const uitschrijven = async () =>{
    
    if (window.confirm('Are you sure you want to delete your account from our website ?')){
        // Getting the management access api token
      const token = await getManagmentAccessApiToken();
      // Current user that is logged in
      const claims = await getIdTokenClaims();
      // Deleting user
      await deleteUser(token.access_token,claims.sub);
      window.location.href = '/';
    }
  }

  return (
    <div className="App font-bold flex-grow">
      <div class="container mx-auto px-2 mt-16 text-left text-color-footer">
        <div class="flex flex-wrap">
          <SidebarUser />
          <div class="mt-2 ml-20 pr-20 float-right w-auto h-auto">
              <button
                class="shadow focus:shadow-outline focus:outline-none text-color-label font-bold py-2 px-4 rounded ml-2"
                type="button" onClick={uitschrijven}
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
