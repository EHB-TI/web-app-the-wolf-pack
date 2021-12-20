import React from 'react';
import SidebarUser from '../components/SidebarUser';

export const UserAankopen = () => {
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
              <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div>
                        Dinsdag 21/12/2021
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                      <div>
                        DitIsZogezegdDePdf.pdf
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div>
                        Maandag 20/12/2021
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                      <div>
                        DitIsZogezegdDePdf.pdf
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    )
}
export default UserAankopen;