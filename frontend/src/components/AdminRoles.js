import React from 'react'
import { deleteUser,getManagmentAccessApiToken } from "../api/users";

export const AdminRoles = ({user}) => {
    
  const uitschrijven = async () =>{
    // Getting the management access api token
    const token = await getManagmentAccessApiToken();
    // Deleting user
    const del = await deleteUser(token.access_token,user.user_id);
    window.location.reload();
  }
    return (
        <tr>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <p>
              {user.email}
            </p>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <select>
            <option value="Klant">Klant</option>
            <option value="Beheerder">Beheerder</option>
          </select>
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