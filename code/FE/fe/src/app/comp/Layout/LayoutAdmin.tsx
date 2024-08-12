import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import Header from './comp/Header';

export default function LayoutAdmin() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>("messagebooks");

  const redirect = (url: string) => {
    setActiveButton(url);
    navigate(url);
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <div className='flex-grow-1 container-fluid'>
        <div className="row" style={{ height: "670px" }}>
          <div className="col-2 bg-body-secondary">
            <Button
              className={`w-100 rounded-2 my-2 text-start ${activeButton !== "messagebooks" ? 'p-button-text' : ''}`}
              label="Message Books"
              onClick={() => redirect("messagebooks")}
            />
            <Button
              className={`w-100 rounded-2 my-2 text-start ${activeButton !== "payments" ? 'p-button-text' : ''}`}
              label="Payments"
              onClick={() => redirect("payments")}
            />
            <Button
              className={`w-100 rounded-2 my-2 text-start ${activeButton !== "dashboard" ? 'p-button-text' : ''}`}
              label="Dashboard"
              onClick={() => redirect("dashboard")}
            />
            <Button
              className={`w-100 rounded-2 my-2 text-start ${activeButton !== "editPitch" ? 'p-button-text' : ''}`}
              label="Edit Pitch"
              onClick={() => redirect("editPitch")}
            />
          </div>
          <div className="col-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
