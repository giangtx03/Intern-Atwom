import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./comp/Sidebar";
import Header from "./comp/Header";
import { useAppSelector } from "../../store/hooks";
import { spinner } from "../../../App";

export default function Layout() {
  const loading = useAppSelector((state) => state.spinner.loading);
  return (
    <>
      {loading && spinner}
      <div className="d-flex">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}
