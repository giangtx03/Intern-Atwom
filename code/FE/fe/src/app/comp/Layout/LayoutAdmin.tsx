import React, { useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import Header from './comp/Header';

export default function LayoutAdmin() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>("messagebooks");

  const redirect = (url: string) => {
    setActiveButton(url);
    navigate(url);
  };

  const location = useLocation();

  // Nếu đường dẫn không phải admin thì điều hướng về trang khác (ví dụ '/')
  if (!location.pathname.startsWith('/admin')) {
    return <Navigate to="/" />;
  }

  return (
    <div className='d-flex flex-column'>
      <div className='container-fluid'>
        <div className="row" style={{ height: "629px" }}>
          <div className="col-2 bg-body-secondary pt-2">
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
              className={`w-100 rounded-2 my-2 text-start ${activeButton !== "revenue" ? 'p-button-text' : ''}`}
              label="Revenue"
              onClick={() => redirect("revenue")}
            />
            <Button
              className={`w-100 rounded-2 my-2 text-start ${activeButton !== "editPitch" ? 'p-button-text' : ''}`}
              label="Edit Pitch"
              onClick={() => redirect("editPitch")}
            />
          </div>
          <div className="col-10 p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
