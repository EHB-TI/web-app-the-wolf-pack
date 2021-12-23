import React, { useState, useEffect } from "react";
import { getMovieById } from "../api/movies";

export const Winkelwagen = () => {
  const [quantity, setQuantity] = useState(1);
  const urlParams = new URLSearchParams(window.location.search);
  const vertoning_id = urlParams.get('vertoning');
  const movie_id = urlParams.get('movie');
  const [movie, setMovie] = useState(undefined);
  const [vertoning, setVertoning] = useState(undefined);

  useEffect(() => {
    getMovieById(movie_id).then(movie => {
      setMovie(movie)
      return movie;
    }).then(movie => setVertoning(movie.vertoningen.find(vertoning => vertoning._id === vertoning_id)));
  });

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

  const toStripeCheckout = (e) => {
    e.preventDefault();
    //console.log()
    //console.log("inside");
    fetch ( `${process.env.REACT_APP_API_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [{
           quantity : quantity,
           name: movie.titel,
           price: 900,
           image: movie.img_url,
           zaal: vertoning.zaal,
           uur: vertoning.uur,
           datum: vertoning.datum,
           "description": `${vertoning.datum} ${vertoning.uur}\nZaal: ${vertoning.zaal}`
        }]
    })
  }).then(res => res.json()).then(({url, id}) => window.location = url)
  .catch(err => console.log(err));
}

  return (
    <div class="container p-8 mx-auto font-bold text-color-footer">
      <div class="w-full overflow-x-auto">
        <table class="w-full shadow-inner">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-6 py-3 font-bold whitespace-nowrap"></th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Ticket</th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Datum en Uur</th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Zaal</th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Aantal</th>
              <th class="px-6 py-3 font-bold whitespace-nowrap">Prijs</th>
            </tr>
          </thead>
          <tbody>{
               movie &&
            <tr>
              <td>
                <div class="flex justify-center">
                  <img
                    src={movie.img_url}
                    class="object-cover h-72 w-48"
                    alt="Workflow"
                  />
                </div>
              </td>
              <td class="p-4 px-6 text-center whitespace-nowrap">
                <div class="flex flex-col items-center justify-center">
                  <h3>{movie.titel}</h3>
                </div>
              </td>
              {
                vertoning &&  <>
                <td class="p-4 px-6 text-center whitespace-nowrap">
                <div class="flex flex-col items-center justify-center">
                  <h3>{vertoning.datum} {vertoning.uur}</h3>
                </div>
                </td>
                <td class="p-4 px-6 text-center whitespace-nowrap">
                <div class="flex flex-col items-center justify-center">
                  <h3>{vertoning.zaal}</h3>
                </div>
              </td>
              </>
              }
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
              <td class="p-4 px-6 text-center whitespace-nowrap">€9</td>
            </tr>
        }
          </tbody>
        </table>
        <div class="mt-4">
          <button class="shadow font-bold py-2 px-4 rounded hover:bg-gray-50 w-full text-center" onClick={toStripeCheckout}>
            Betalen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Winkelwagen;
