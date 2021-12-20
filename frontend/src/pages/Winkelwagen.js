import React, { useState } from "react";

export const Winkelwagen = () => {
  const [quantity, setQuantity] = useState(1);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevcount) => prevcount - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((prevcount) => prevcount + 1);
    }
  };

  return (
    <div class="container p-8 mx-auto font-bold text-color-footer">
      <div class="w-full overflow-x-auto">
        <table class="w-full shadow-inner">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-6 py-3 font-bold whitespace-nowrap"></th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Ticket</th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Aantal</th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Prijs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="flex justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    class="object-cover h-72 w-28"
                    alt="image"
                  />
                </div>
              </td>
              <td class="p-4 px-6 text-center whitespace-nowrap">
                <div class="flex flex-col items-center justify-center">
                  <h3>Venom: Let There Be Carnage</h3>
                </div>
              </td>
              <td class="p-4 px-6 text-center whitespace-nowrap">
                <div>
                  <button onClick={handleDecrement}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="inline-flex w-6 h-6 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <input
                    style={{ backgroundColor: "white" }}
                    type="text"
                    name="qty"
                    value={quantity}
                    class="w-12 text-center bg-gray-100 outline-none"
                    color="white"
                  />
                  <button onClick={handleIncrement}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="inline-flex w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td class="p-4 px-6 text-center whitespace-nowrap">€10</td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4">
          <button class="shadow font-bold py-2 px-4 rounded hover:bg-gray-50 w-full text-center">
            Betalen
          </button>
        </div>
      </div>
    </div>
  );
};
export default Winkelwagen;
