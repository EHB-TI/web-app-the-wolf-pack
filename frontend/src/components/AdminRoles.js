import React from 'react'
import { deleteUser,getRoleUser,getManagmentAccessApiToken,assignRoleAdminToUser,deleteAdminRoleFromUser } from "../api/users";

export const AdminRoles = ({user,rol}) => {
  console.log(rol);
  rol.then(function(response) {
    console.log("Success!", response);
    if(response === undefined){
      console.log(response);
      document.getElementById('roluser').innerHTML = 'Klant';
    }else{
      console.log(response);
    }
  });
  console.log(rol.resolve);
  if(rol.then(res => res) === undefined){
    console.log('un');
  }
  else{
    console.log('okk');
  }
  const uitschrijven = async () =>{
    // Getting the management access api token
    const token = await getManagmentAccessApiToken();
    // Deleting user
    const del = await deleteUser(token.access_token,user.user_id);
    window.location.reload();
  }
  const changeRole = async () =>{
    const token = await getManagmentAccessApiToken();
    const gett = await getRoleUser(token.access_token,user.user_id);
    console.log(gett);
    console.log(rol);
    console.log(user.user_id);
     if(gett[0] === undefined){
       console.log('Dit moet een admin worden');
       const wordtAdmin = await assignRoleAdminToUser(token.access_token,user.user_id,process.env.REACT_APP_AUTH0_ROLE_ID);
       window.location.reload();
       document.getElementById('roluser').innerHTML = 'Admin';
     }
     else{
       console.log('Dit moet een klant worden');
       const wordtKlant = await deleteAdminRoleFromUser(token.access_token,user.user_id,process.env.REACT_APP_AUTH0_ROLE_ID);
       window.location.reload();
       document.getElementById('roluser').innerHTML = 'Klant';
     }
   
  }
      return (
        <tr>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <p id='txt'>
              {user.email}
            </p>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <p id='roluser'>Dit moet een rol zijn</p>
          <button onClick={changeRole}>Verander rol</button>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right">
          <button class="ml-2 font-bold py-2 px-4" onClick={uitschrijven}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </td>
      </tr>
    )
}
export default AdminRoles