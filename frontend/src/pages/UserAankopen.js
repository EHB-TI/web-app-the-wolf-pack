import React,{useState, useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import SidebarUser from '../components/SidebarUser';

export const UserAankopen = () => {

    const {user } = useAuth0();
    const [orders, setOrders] = useState(undefined);

    useEffect(() => {
        (async() => {
            if (user){
              const res = await fetch(`${process.env.REACT_APP_API_URL}/orders?email=${user.email}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
              const data = await res.json();
              setOrders(data);
            }
        })();
    }, [user]);
    return (
        <div className="App font-bold flex-grow">
        <div class="container mx-auto px-2 mt-16 text-left text-color-footer">
            <div class=" border-gray-300 flex flex-wrap">
            <SidebarUser />
            <div class="mt-2 ml-20 pr-20 float-right w-3/4 h-auto">
              <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left"
                  >
                    Aankoop datum
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left"
                  >
                    Aankoop factuur (PDF)
                  </th>
                  
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                 {
                      orders && orders.map((order, index) => { 
                        return (
                          <tr>
                              <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                  <div>
                                     {order.date}
                                  </div>
                                </div>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap">
                              <div class="flex items-center">
                                  <button onClick={() => window.open(order.order_url, '_blank').focus()}>
                                    PDF
                                  </button>
                                </div>
                              </td>
                          </tr>
                        )
                   })
                }
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    )
}
export default UserAankopen;
