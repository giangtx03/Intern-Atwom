import React, { Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api'
import Layout from '../comp/Layout/Layout';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import Dashboard from '../pages/Dashboard';


export const RoutersHook: any = {
  path: '/',
    element: (
        <Layout />
    ),
    children: [
      { path: '/dashboard', element: <Dashboard/>},
      {path: '/login', element: <LoginPage/>},
      {path: '/register', element: <RegisterPage/>}
    ],
};
