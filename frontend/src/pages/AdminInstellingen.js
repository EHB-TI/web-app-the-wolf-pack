import React, { useEffect, useState } from "react";
import { getAllUsers, getManagmentAccessApiToken,getRoleUser } from "../api/users";
import { useAuth0 } from "@auth0/auth0-react";
import SidebarAdmin from "../components/SidebarAdmin";
import AdminRoles from "../components/AdminRoles";

export const AdminInstellingen = () => {

  const[allusers,setAllusers] = useState([]);

  // Alle user opvragen en in die table steken
  const getUsers = async () =>{
    const token = await getManagmentAccessApiToken();
    const users = await getAllUsers(token.access_token);
    return users;
  }
  const getRole = async (user) =>{
    const token = await getManagmentAccessApiToken();
    const gett = await getRoleUser(token.access_token,user.user_id);
    return gett[0]
 }
  useEffect(async () =>{
    getUsers().then(allusers => setAllusers(allusers))
  },[]);

allusers.map(user => user);
for (var i = allusers.length - 1; i >= 0; --i) {
  if (allusers[i].email == "admin@ehb.be") {
      allusers.splice(i,1);
  }
}
  return (
    <div className="App font-bold">
      <div className="container mx-auto px-2 mt-16 text-left text-color-footer">
        <div className="border-gray-300 flex flex-wrap">
          <SidebarAdmin />
          <div className="mt-2 ml-20 pr-20 float-right w-3/4 h-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left"
                  >
                    Role
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  
                 allusers.map(user => <AdminRoles user={user} rol={getRole(user).then(function(response) {
                  return response;
                })} key={user.user_id}/>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminInstellingen;
