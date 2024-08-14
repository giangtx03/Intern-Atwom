import React, { Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api'
import Layout from '../comp/Layout/Layout';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import Dashboard from '../pages/Dashboard';
import UserProfile from '../pages/auth/UserProfile';
import History from '../pages/History';
import CommentDisplay from '../pages/comment';
import { AdminRouter } from './admin/adminRouter';


export const RoutersHook: any = {
  path: '/',
  element: (
    <Layout />
  ),
  children: [
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/profile', element: <UserProfile /> },
    { path: 'history', element: <History /> },
    { path: "comment", element: <CommentDisplay /> },
    { ...AdminRouter }

  ]
};
