import SidebarAdmin from "../components/SidebarAdmin";
import React, {useEffect, useState} from "react";
import { getMovieById } from "../api/movies";
import {useLocation} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { UpdateMovie } from "../api/movies";
import { initializeApp } from "firebase/app";
import { getStorage, ref , uploadBytes,getDownloadURL  } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};  

const firebaseApp = initializeApp(config);

const AdminFilmsAanpassen = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const [movie, setMovie] = useState(undefined);
  const [titel, setTitel] = useState(undefined);
  const [img , setImg] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [regisseur, setRegisseur] = useState(undefined);
  const [cast , setCast] = useState(undefined);
  const [trailer, setTrailer] = useState(undefined);
  const [duur , setDuur] = useState(undefined);
  const [temp, setTemp] = useState(undefined);
  const {getAccessTokenSilently} = useAuth0();

  useEffect(() => {
    getMovieById(id).then(movie => {
      setMovie(movie);
      setTitel(movie.titel);
      setImg(movie.img_url);
      setDescription(movie.description);
      setRegisseur(movie.regisseur);
      setCast(movie.hoofdrollen.join(", "));
      setTrailer(movie.trailer_url);
      setDuur(movie.duur);
    });
  }, [id]);

  const sumbitHandler = async (e) => {
    e.preventDefault();

    if (temp) {
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `/images/${temp.name}`);
      const snapshot = await uploadBytes(storageRef, temp);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImg(async(img) => {
        img = downloadURL;
        const movie = {
          titel: titel,
          img_url: img,
          description: description,
          regisseur: regisseur,
          hoofdrollen: cast,
          trailer_url: trailer,
          duur: duur,
        };
        const accessToken = await getAccessTokenSilently();
        await UpdateMovie(id,accessToken, movie);
        window.location.href = "/admin/films";
      });
    }
    else {
      const movie = {
        titel: titel,
        img_url: img,
        description: description,
        regisseur: regisseur,
        hoofdrollen: cast,
        trailer_url: trailer,
        duur: duur,
      };

      const accessToken = await getAccessTokenSilently();
      await UpdateMovie(id,accessToken, movie);
      window.location.href = "/admin/films";
   }
  }

  return (
    <>
    {movie && <div className="App font-bold">
      <div class="container mx-auto px-6 mt-16 text-left text-color-footer py-5">
        <div class=" border-gray-300 flex flex-wrap">
          <SidebarAdmin />
          <div class="flex flex-grow gap-2 mt-5 overflow-auto no-scroll w-auto">
            <div class="ml-20">
              <img
                class="h-72 w-auto"
                src={img}
                alt="Workflow"
                height="20%"
                width="20%"
              />
            </div>
            <div class="ml-1 font-bold flex-grow">
              <form class="w-full" onSubmit={sumbitHandler}>
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/6">
                    <label
                      class="block text-color-label md:text-left mb-1 md:mb-0 pr-4"
                      for="inline-full-title"
                    >
                      Titel
                    </label>
                  </div>
                  <div class="md:w-5/6">
                    <input
                      class="border-2 border-gray-200 rounded w-11/12 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ml-2"
                      id="inline-full-title"
                      type="text"
                      value={titel}
                      onChange={(e) => setTitel(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/6">
                    <label
                      class="block text-color-label md:text-left mb-1 md:mb-0 pr-4"
                      for="inline-full-director"
                    >
                      Regisseur
                    </label>
                  </div>
                  <div class="md:w-5/6">
                    <input
                      class="border-2 border-gray-200 rounded w-11/12 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ml-2"
                      id="inline-full-director"
                      type="text"
                      value={regisseur}
                      onChange={(e) => setRegisseur(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/6">
                    <label
                      class="block text-color-label md:text-left mb-1 md:mb-0 pr-4"
                      for="inline-full-cast"
                    >
                      Cast
                    </label>
                  </div>
                  <div class="md:w-5/6">
                    <input
                      class="border-2 border-gray-200 rounded w-11/12 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ml-2"
                      id="inline-full-cast"
                      type="text"
                      value={cast}
                      onChange={(e) => setCast(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/6">
                    <label
                      class="block text-color-label md:text-left mb-1 md:mb-0 pr-4"
                      for="inline-full-trailer"
                    >
                      Trailer url
                    </label>
                  </div>
                  <div class="md:w-5/6">
                    <input
                      class="border-2 border-gray-200 rounded w-11/12 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ml-2"
                      id="inline-full-trailer"
                      type="text"
                      value={trailer}
                      onChange={(e) => setTrailer(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                  <div class="md:w-1/6">
                    <label
                      class="block text-color-label md:text-left mb-1 md:mb-0 pr-4"
                      for="inline-full-time"
                    >
                      Duur
                    </label>
                  </div>
                  <div class="md:w-5/6">
                    <input
                      class="border-2 border-gray-200 rounded w-11/12 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ml-2"
                      id="inline-full-time"
                      type="text"
                      value={duur}
                      onChange={(e) => setDuur(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div class="md:flex md:items-center mb-6 h-50">
                  <div class="md:w-1/6">
                    <label
                      class="block text-color-label md:text-left mb-1 md:mb-0 pr-4"
                      for="inline-description"
                    >
                      Beschrijving
                    </label>
                  </div>
                  <div class="md:w-5/6">
                    <textarea
                      class="border-2 border-gray-200 rounded w-11/12 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ml-2 overflow-auto h-100"
                      id="inline-description"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div class="md:flex  mb-6">
                  <div class="md:w-1/6">
                    <label
                      class="block text-color-label md:text-left mb-1 md:mb-0 pr-4"
                      for="inline-full-cast"
                    >
                      Poster
                    </label>
                  </div>
                  <div class="md:w-1/6 text-center">
                    <label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 block m-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span class="mt-2 text-base leading-normal">
                        {temp ? temp.name : "Upload a image"}
                      </span>
                      <input
                        class="py-2 px-4 text-gray-700 leading-tight focus:outline-none ml-2 hidden"
                        id="inline-full-cast"
                        type="file"
                        accept="img/*"
                        onChange={(e) => e.target.files[0] && setTemp(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>
                <button class="shadow font-bold py-2 px-4 rounded hover:bg-gray-50" type="submit">
                  Aanpassen
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
   }
   </>
  );
};
export default AdminFilmsAanpassen;
