// Added Apex Charts ( https://apexcharts.com/ ) 9/28/2024
//npm install --save react-apexcharts apexcharts

// import React  from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React, { Suspense } from 'react';
import { Routes, Route  } from "react-router-dom";

import './App.css';

import Home from "./pages/Home";
import About from "./pages/About";
import Minervini from "./pages/Minervini";
import PositionCalc from "./pages/PositionCalc";
import Trend from './pages/Trend';
import Settings from './pages/Settings'
import Charting from './pages/Charting';



function App() {
  // return  <RouterProvider router={router}></RouterProvider>
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/about" element={<About/>} />
          <Route path="/poscalc" element={<PositionCalc/>} />
          <Route path="/mm" element={<Minervini/>} />
          <Route path="/trend" element={<Trend/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/chart" element={<Charting/>} />
      </Routes>
    </Suspense>
    );

}

export default App;
