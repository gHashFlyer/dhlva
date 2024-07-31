import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';


import Home from "./pages/Home"
import Login from "./pages/Login"
import RecentFlights from './pages/RecentFlights';
import FlyingNow from './pages/FlyingNow';
import PilotStories from './pages/PilotStories';
import JoinForm from './pages/Join';
import JoinFormLanding from './pages/JoinLanding';
//import AdminPirepInfo from './pages/AdminPirepInfo';
//import AdminUserNew from './pages/AdminUserNew';

{/* Authenticated pages */}
// import UserHome from './pages/UserHome';
const UserHome = React.lazy(() => import('./pages/UserHome'));
const UserLogbook = React.lazy(() => import('./pages/UserLogbook'));
const UserLogDetail = React.lazy(() => import('./pages/UserLogDetail'));
const AdminUserApps = React.lazy(()=> import('./pages/AdminUserApps'))
const AdminUserNew = React.lazy(()=> import('./pages/AdminUserNew'))
const AdminPireps = React.lazy(()=> import('./pages/AdminPireps'))
const AdminPirepInfo = React.lazy(()=> import('./pages/AdminPirepInfo'))


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [callsign, setCallsign] = useState("");
  const [userAuth, setUserAuth] = useState("");
  const [adminLevel, setAdminLevel] = useState(0);

  useEffect(() => {
    console.log("app useEffect")
    let callsign = localStorage.getItem("callsign")
    if(callsign){
      setLoggedIn(true)
      setCallsign(callsign)
      setFullName(localStorage.getItem("fullname"))
      setUserAuth(localStorage.getItem("auth"))
    }
      return () => {}
  }, [])


  // This is called from Login.js ONLY IF the login was successful
  const loginUpdate = (obj) => {
    console.log(obj);
    setLoggedIn(true);
    setFullName(obj.fullname);
    setCallsign(obj.callsign);
    setUserAuth(obj.auth)


    localStorage.setItem("epoch", Date.now().toString());
    localStorage.setItem("fullname", obj.fullname);
    localStorage.setItem("callsign", obj.callsign);
    localStorage.setItem("auth", obj.auth);

  }

  const appLogout = () =>{
    localStorage.clear()
    setLoggedIn(false)

  }


  return (
  <Suspense fallback={<p>Loading...</p>}>
    <Routes>
        <Route path="/" element={ <Home loggedIn={loggedIn} /> } />
        <Route path="/joinform" element={<JoinForm /> } />
        <Route path="/joinlanding" element={<JoinFormLanding /> } />
        <Route path="/login" element={ <Login appLogin={loginUpdate}/> } />
        <Route path="/userhome" element={ <UserHome appLogout={appLogout} fullname={fullName} callsign={callsign} loggedIn={loggedIn} userauth={userAuth}/> } />
        <Route path="/userlogbook" element={ <UserLogbook appLogout={appLogout} fullname={fullName} callsign={callsign} loggedIn={loggedIn} userauth={userAuth}/> } />
        <Route path="/user_log_detail/:id" element={ <UserLogDetail appLogout={appLogout} fullname={fullName} callsign={callsign} loggedIn={loggedIn} userauth={userAuth}/> } />
        <Route path="/recentflights" element={ <RecentFlights /> } />
        <Route path="/flyingnow" element={ <FlyingNow /> } />
        <Route path="/pilotstories" element={ <PilotStories /> } />
        <Route path="/admin_user_apps" element= { <AdminUserApps/> } />
        <Route path="/admin_user_new/:id" element= { <AdminUserNew/> } />
        <Route path="/admin_pireps" element= { <AdminPireps/> } />
        <Route path="/admin_pirep_info/:id" element= { <AdminPirepInfo/> } />

    </Routes>
  </Suspense>
  );
}

export default App;
