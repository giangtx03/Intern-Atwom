import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./comp/Sidebar";
import Header from "./comp/Header";
import { useAppSelector } from "../../store/hooks";
import { spinner } from "../../../App";

export default function Layout() {
  const loading = useAppSelector((state) => state.spinner.loading);

  const location = useLocation();

  return (
    <>
      {loading && spinner}
      <div className="d-flex justify-content-center">
        <div className="col-12">
          <Header />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
