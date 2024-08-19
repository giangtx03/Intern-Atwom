import React from "react";
import UserProfile from "../../pages/auth/UserProfile";
import Layout from "../../comp/Layout/Layout";
import path from "path";
import { Navigate } from "react-router-dom";
import AuthGuard from "../../guard/authGuard";

export const UserRouter: any = {
  path: "user",
  children: [
    { path: "", element: <Navigate to="/profile" /> },
    { path: "profile", element: <AuthGuard> <UserProfile /> </AuthGuard> },
  ],
};
