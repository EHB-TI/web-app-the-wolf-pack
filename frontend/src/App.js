import './App.css';
import { Route, Routes} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import WordtVerwacht from './pages/WordtVerwacht';
import Weekoverzicht from './pages/Weekoverzicht';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Film from './pages/Film';
import AdminDashboard from './pages/AdminDashboard';
import AdminFilms from './pages/AdminFilms';
import AdminFilmsAanpassen from './pages/AdminFilmsAanpassen';
import UserInstellingen from './pages/UserInstellingen';
import AdminFilmsToevoegen from './pages/AdminFilmsToevoegen';
import AdminKalender from './pages/AdminKalender';
import AdminInstellingen from './pages/AdminInstellingen';
import Unauthorized from './components/Unauthorized';
import React, {useState, useEffect} from 'react';
import isAdmin from './Util.js';
import {useAuth0} from '@auth0/auth0-react';
import NotLoggedIn from './components/NotLoggedIn';
import UserDashboard from './pages/UserDashboard';

function App() {

  const [authorized, setAuthorized] = useState(false);
  const {getAccessTokenSilently, isAuthenticated, isLoading}  = useAuth0();

 

  useEffect(() => {
    const checkAutorized = async () => {
      const token = await getAccessTokenSilently();
      return await isAdmin(token);
    }

    async function checkAdmin () {
      if (isAuthenticated){
        const response = await checkAutorized();
        setAuthorized(response);
      }
    };
    checkAdmin();
  },[setAuthorized, isAuthenticated, getAccessTokenSilently]);

  return (
      <div className="App flex flex-col min-h-screen">
        <Nav authorized={authorized}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/weekoverzicht' element={<Weekoverzicht />} />
          <Route path='/verwacht' element={<WordtVerwacht />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/movies/*' element={<Film />} />
          {
            authorized ? <> <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/films' element={<AdminFilms />} />
            <Route path='/admin/films/toevoegen' element={<AdminFilmsToevoegen />} />
            <Route path='/admin/films/*' element={<AdminFilmsAanpassen />} />
            <Route path='/admin/instellingen' element={<AdminInstellingen />} />
            <Route path='/admin/kalender' element={<AdminKalender />} /> </> 
            : isLoading ? <> <Route path='/admin/dashboard' element={<div> </div>} />
            <Route path='/admin/films' element={<div> </div>} />
            <Route path='/admin/films/toevoegen' element={<div> </div>} />
            <Route path='/admin/films/1' element={<div> </div>} />
            <Route path='/admin/instellingen' element={<div> </div>} />
            <Route path='/admin/kalender' element={<div> </div>} />  </> 
             : isAuthenticated ? <> <Route path='/admin/dashboard' element={<Unauthorized />} />
            <Route path='/admin/films' element={<Unauthorized />} />
            <Route path='/admin/films/toevoegen' element={<Unauthorized />} />
            <Route path='/admin/films/1' element={<Unauthorized />} />
            <Route path='/admin/instellingen' element={<Unauthorized />} />
            <Route path='/admin/kalender' element={<Unauthorized />} /> </> 
            : <> <Route path='/admin/dashboard' element={<NotLoggedIn />} />
            <Route path='/admin/films' element={<NotLoggedIn />} />
            <Route path='/admin/films/toevoegen' element={<NotLoggedIn />} />
            <Route path='/admin/films/1' element={<NotLoggedIn />} />
            <Route path='/admin/instellingen' element={<NotLoggedIn />} />
            <Route path='/admin/kalender' element={<NotLoggedIn />} /> </>
          }
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/instellingen" element={<UserInstellingen />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
