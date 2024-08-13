import { Navigate } from "react-router-dom";
import MessageBooks from "../../pages/admin/components/MessageBooks";
import Payments from "../../pages/admin/components/Payments";
import Spinner from "../../comp/Spinner";
import Layout from "../../comp/Layout/Layout";
import LayoutAdmin from "../../comp/Layout/LayoutAdmin";

export const AdminRouter: any =
{
    path: 'admin',
    element: (

        <LayoutAdmin />
    ),
    children: [
        { path: '', element: <Navigate to="messagebooks" replace /> },  // Redirect to MessageBooks by default
        { path: 'messagebooks', element: <MessageBooks /> },
        { path: 'payments', element: <Payments /> },
        { path: 'dashboard', element: <Spinner /> },
        { path: 'editPitch', element: <Spinner /> },
    ],
};