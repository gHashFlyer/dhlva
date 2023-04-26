import React, { Suspense, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';


import Home from "./pages/Home"
import Login from "./pages/Login"
import UserHome from './pages/UserHome';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [callsign, setCallsign] = useState("");
  const [adminLevel, setAdminLevel] = useState(0)

  // This is called from Login.js ONLY IF the login was successful
  const loginUpdate = (obj) => {
    
    console.log(obj);
    setLoggedIn(true);
    setFullName(obj.fullname);
    setCallsign(obj.callsign);
    setAdminLevel(obj.adminlevel);

    localStorage.setItem("epoch", Date.now().toString());
    localStorage.setItem("fullname", obj.fullname);
    localStorage.setItem("callsign", obj.callsign);
    
  }

  return (
  <Suspense fallback={<p>Loading...</p>}>
    <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login appLogin={loginUpdate}/> } />
        <Route path="/userhome" element={ <UserHome fullname={fullName} callsign={callsign} /> } />
    </Routes>
  </Suspense>
  );
}

export default App;
