import Layout from "../comp/Layout/Layout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import CommentDisplay from "../pages/comment";
import { AdminRouter } from "./admin/adminRouter";
import { UserRouter } from "./user/userRouter";
import { PitchRouter } from "./pitchRouters";

export const RoutersHook: any = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "history", element: <History /> },
    { path: "comment", element: <CommentDisplay /> },
    { ...AdminRouter },
    { ...UserRouter },
    { ...PitchRouter },
  ],
};
