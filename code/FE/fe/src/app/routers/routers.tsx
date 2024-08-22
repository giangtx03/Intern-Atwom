import Layout from "../comp/Layout/Layout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import CommentDisplay from "../pages/comment";
import { AdminRouter } from "./admin/adminRouter";
import { UserRouter } from "./user/userRouter";
import { PitchRouter } from "./pitchRouters";
import { Navigate } from "react-router-dom";
import AuthGuard from "../guard/authGuard";
import PublicGuard from "../guard/publicGuard";

export const RoutersHook: any = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "/login", element: <PublicGuard><LoginPage /></PublicGuard> },
    { path: "/register", element: <PublicGuard><RegisterPage /> </PublicGuard> },
    { path: "history", element: <AuthGuard> <History /> </AuthGuard> },
    { path: "comment", element: <CommentDisplay /> },
    { ...AdminRouter },
    { ...UserRouter },
    { ...PitchRouter },
  ],
};
