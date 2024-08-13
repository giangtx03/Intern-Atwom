import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';

// import './assets/css/spinner.css';
import { Navigate, useRoutes } from 'react-router-dom';
import { RoutersHook } from './app/routers/routers';
import { ToastContainer } from 'react-toastify';
import { AdminRouter } from './app/routers/admin/AdminRouter';

export const spinner = (
  <div className="progress-spinner text-center">
    <div className="swm-loader"></div>
  </div>
);

function App() {

  let router = useRoutes([
    { path: 'not-permission' }, //403
    { path: '/', element: <Navigate to="/dashboard" replace /> },
    RoutersHook,
    AdminRouter,
    { path: 'err-network' }, //500
    { path: '*' }, //404
  ]);

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Suspense fallback={spinner}>{router}</Suspense>
    </div>
  );
}

export default App;