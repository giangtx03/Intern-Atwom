import React, { Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api'
import Layout from '../comp/Layout/Layout';


export const RoutersHook: any = {
  path: '/',
    element: (
        <Layout />
    ),
    children: [
      { path: '/dashboard'},
    ],
};
