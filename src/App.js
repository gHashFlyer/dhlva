import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';

import Header from "./components/Header"
import Home from "./components/Home"

function App() {
  return (
<React.Fragment>
  <div className='main-wrapper'>

    <Home />
  </div>


  {/* <Route path="/feedback" element={<Feedback/>}/> */}
</React.Fragment>
  );
}

export default App;
