import { Navigate } from "react-router-dom";
import MessageBooks from "../../pages/admin/components/MessageBooks";
import Payments from "../../pages/admin/components/Payments";
import Spinner from "../../comp/Spinner";
import LayoutAdmin from "../../comp/Layout/LayoutAdmin";
import Revenue from "../../pages/admin/components/Revenue";

export const AdminRouter: any =
{
    path: 'admin',
    element: (
        <LayoutAdmin />
    ),
    children: [
        { path: '', element: <Navigate to="messagebooks" /> },
        { path: 'messagebooks', element: <MessageBooks /> },
        { path: 'payments', element: <Payments /> },
        { path: 'revenue', element: <Revenue /> },
        { path: 'editPitch', element: <Spinner /> },
      { path: '/admin'},
    ],
  };
