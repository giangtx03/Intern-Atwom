import { Navigate } from "react-router-dom";
import Spinner from "../../comp/Spinner";
import LayoutAdmin from "../../comp/Layout/LayoutAdmin";
import Revenue from "../../pages/admin/Revenues";
import EditPitches from "../../pages/admin/EditPitches";
import MessageBooks from "../../pages/admin/MessageBooks";
import Payments from "../../pages/admin/Payments";

export const AdminRouter: any = {
  path: "admin",
  element: <LayoutAdmin />,
  children: [
    { path: "", element: <Navigate to="messagebooks" /> },
    { path: "messagebooks", element: <MessageBooks /> },
    { path: "payments", element: <Payments /> },
    { path: "revenue", element: <Revenue /> },
    { path: "editPitch", element: <EditPitches /> },
    { path: "/admin" },
  ],
};
