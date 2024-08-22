import { Navigate } from "react-router-dom";
import LayoutAdmin from "../../comp/Layout/LayoutAdmin";
import MessageBooks from "../../pages/admin/MessageBooks";
import Payments from "../../pages/admin/Payments";
import Revenue from "../../pages/admin/Dashboard";
import EditPitches from "../../pages/admin/EditPitches";

export const AdminRouter: any = {
  path: "admin",
  element: <LayoutAdmin />,
  children: [
    { path: "", element: <Navigate to="revenue" /> },
    { path: "messagebooks", element: <MessageBooks /> },
    { path: "payments", element: <Payments /> },
    { path: "revenue", element: <Revenue /> },
    { path: "editPitch", element: <EditPitches /> },
    { path: "/admin" },
  ],
};
