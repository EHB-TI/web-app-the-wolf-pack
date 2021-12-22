import React, { useEffect, useState } from "react";
import { getAllUsers, getManagmentAccessApiToken } from "../api/users";
import { useAuth0 } from "@auth0/auth0-react";
import SidebarAdmin from "../components/SidebarAdmin";
import AdminRoles from "../components/AdminRoles";

export const AdminInstellingen = () => {

  const[allusers,setAllusers] = useState([]);

  // Alle user opvragen en in die table steken
  const getToken = async () =>{
    const token = await getManagmentAccessApiToken();
    const users = await getAllUsers(token.access_token);
    
    return users;
  }
  useEffect(async () =>{
    getToken().then(allusers => setAllusers(allusers))
  },[]);

console.log(allusers.map(user => user));
  return (
    <div className="App font-bold">
      <div class="container mx-auto px-2 mt-16 text-left text-color-footer">
        <div class="border-gray-300 flex flex-wrap">
          <SidebarAdmin />
          <div class="mt-2 ml-20 pr-20 float-right w-3/4 h-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left"
                  >
                    Role
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {
                 allusers.map(user => <AdminRoles user={user} key={user.user_id}/>)
                }
              </tbody>
            </table>
            <button class="shadow font-bold py-2 px-4 rounded hover:bg-gray-50 w-full text-center">Opslaan</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminInstellingen;
