import React  from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';

import Home from "./pages/Home";
import About from "./pages/About";
import Minervini from "./pages/Minervini";
import PositionCalc from "./pages/PositionCalc";

const router = createBrowserRouter([
  {path: '/', element: <Home/>},
  {path: '/about', element: <About/>},
  {path: '/poscalc', element: <PositionCalc/>},
  {path: '/trend', element: <Minervini/>},
])

function App() {
  return  <RouterProvider router={router}></RouterProvider>
}

export default App;
