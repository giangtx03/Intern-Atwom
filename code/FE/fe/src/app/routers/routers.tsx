import React, { Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api'


export const RoutersHook: any = {
  path: '/',
  children: [
    { path: '/dashboard' },
    {path: '/admin'},
    {path: '/user'}
  ],
};
