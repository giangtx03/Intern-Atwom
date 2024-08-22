import React, { Suspense } from "react";
import "./App.css";
import "./assets/spinner.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import './assets/css/spinner.css';
import { Navigate, useRoutes } from 'react-router-dom';
import { RoutersHook } from './app/routers/routers';
import { ToastContainer } from 'react-toastify';
import NotFound from "./app/pages/error/NotFound";
import Forbidden from "./app/pages/error/Forbidden";
import ErrNetWork from "./app/pages/error/ErrNetWork";

export const spinner = (
  <div className="progress-spinner text-center">
    <div className="swm-loader"></div>
  </div>
);

function App() {

  let router = useRoutes([
    { path: 'not-permission',element: <Forbidden/> }, //403
    { path: '/', element: <Navigate to="/home" replace /> },
    RoutersHook,
    { path: 'err-network',  element: <ErrNetWork/> }, //500
    { path: '*',  element: <NotFound/> }, //404
  ]);

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Suspense fallback={spinner}>{router}</Suspense>
    </div>
  );
}

export default App;