import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./comp/Sidebar";
import Header from "./comp/Header";
import { useAppSelector } from "../../store/hooks";
import { spinner } from "../../../App";

export default function Layout() {
  const loading = useAppSelector((state) => state.spinner.loading);

  const auth = useAppSelector((state) => state.user.isAuthenticated);

  return (
    <>
    {loading && spinner}
      <div className="d-flex justify-content-center">
        {false && (
          <div className="col-2">
            <Sidebar />
          </div>
        )}
        <div className={auth ? "col-10" : "col-12"}>
          <Header />
          <div className="mt-3">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
