import React, { Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api'
import Layout from '../comp/Layout/Layout';
import History from '../pages/History';
import CommentDisplay from '../pages/comment';


export const RoutersHook: any = {
  path: '/',
    element: (
        <Layout />
    ),
    children: [
      { path: '/dashboard'},
      {path: 'history' , element: <History/>},
      {path:"comment", element: <CommentDisplay/>}
    ],
};
