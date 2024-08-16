import React, { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import Layout from "../comp/Layout/Layout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import CommentDisplay from "../pages/comment";
import path from "path";
import { AdminRouter } from "./admin/adminRouter";
import { UserRouter } from "./user/userRouter";
import Pitch from "../pages/pitch/Pitch";
import PitchDetail from "../pages/pitch/PitchDetail";

export const RoutersHook: any = {
  path: '/',
  element: (
    <Layout />
  ),
  children: [
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/home', element: <PitchDetail /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: 'history', element: <History /> },
    { path: "comment", element: <CommentDisplay /> },
    { ...AdminRouter},
    { ...UserRouter }
  ]
};
