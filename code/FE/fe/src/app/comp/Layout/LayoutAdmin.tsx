import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import Header from './comp/Header';

export default function LayoutAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy phần sau "/admin/"
  const link = location.pathname.split("/admin/")[1];
  const [activeButton, setActiveButton] = useState<string>(link);

  // Cập nhật activeButton khi location.pathname thay đổi
  useEffect(() => {
    setActiveButton(link);
  }, [location.pathname]);

  // Điều hướng về trang khác nếu đường dẫn không bắt đầu bằng '/admin'
  if (!location.pathname.startsWith('/admin')) {
    return <Navigate to="/" />;
  }

  const redirect = (url: string) => {
    setActiveButton(url);
    navigate(url);
  };

  return (
    <div className='d-flex flex-column'>
      <div className='container-fluid'>
        <div className="row" style={{ height: "629px" }}>
          <div className="col-2 bg-body-secondary pt-2">
            <Button
              className={`w-100 rounded-2 my-2 text-start ${activeButton !== "revenue" ? 'p-button-text' : ''}`}
              label="Dashboard"
              onClick={() => redirect("revenue")}
            />
            <Button
              className={`w-100 rounded-2 my-2 text-start ${activeButton !== "messagebooks" ? 'p-button-text' : ''}`}
              label="Duyệt sân"
              onClick={() => redirect("messagebooks")}
            />
            <Button
              className={`w-100 rounded-2 my-2 text-start ${activeButton !== "payments" ? 'p-button-text' : ''}`}
              label="Thanh toán"
              onClick={() => redirect("payments")}
            />
            <Button
              className={`w-100 rounded-2 my-2 text-start ${activeButton !== "editPitch" ? 'p-button-text' : ''}`}
              label="Quản lý sân"
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
