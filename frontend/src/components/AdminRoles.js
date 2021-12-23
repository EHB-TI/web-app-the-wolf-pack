import React from 'react'
import { deleteUser,getRoleUser,getManagmentAccessApiToken,assignRoleAdminToUser,deleteAdminRoleFromUser } from "../api/users";

export const AdminRoles = ({user,rol}) => {

  const uitschrijven = async () =>{
    // Getting the management access api token
    const token = await getManagmentAccessApiToken();
    // Deleting user
    const del = await deleteUser(token.access_token,user.user_id);
    window.location.reload();
  }
  const changeRole = async () =>{
    const token = await getManagmentAccessApiToken();
    const getrole = await getRoleUser(token.access_token,user.user_id);

     if(getrole[0] === undefined){
       const wordtAdmin = await assignRoleAdminToUser(token.access_token,user.user_id,process.env.REACT_APP_AUTH0_ROLE_ID);
       alert('De Klant krijgt de rol: Beheerder');
       window.location.reload();
     }
     else{
       const wordtKlant = await deleteAdminRoleFromUser(token.access_token,user.user_id,process.env.REACT_APP_AUTH0_ROLE_ID);
       alert('De Beheerder krijgt de rol: Klant');
       window.location.reload();
     }
  }
      return (
        <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <p id='txt'>
              {user.email}
            </p>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className='shadow font-bold rounded py-2 px-4' onClick={changeRole}>Verander rol</button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <button className="ml-2 font-bold py-2 px-4 shadow font-bold" onClick={uitschrijven}>
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