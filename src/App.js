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

// const router = createBrowserRouter([
//   {path: '/', element: <Home/>},
//   {path: '/about', element: <About/>},
//   {path: '/poscalc', element: <PositionCalc/>},
//   {path: '/trend', element: <Minervini/>},
// ])

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
      </Routes>
    </Suspense>
    );

}

export default App;
