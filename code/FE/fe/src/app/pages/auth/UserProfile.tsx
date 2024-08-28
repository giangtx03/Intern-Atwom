import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { DecodedToken, UserDetails } from "../../model/User";
import { TokenService } from "../../service/TokenService";
import { UserService } from "../../service/UserService";
import { useNavigate } from "react-router-dom";
import { showOrHindSpinner } from "../../reduces/SpinnerSlice";
import { formatDate } from "../../utils/FormatDate";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ChangePasswordForm from "./comp/ChangePasswordForm";
import { decodeToken } from "react-jwt";
import UpdateProfile from "./comp/UpdateProfile";
import defaultAvatar from "../../../assets/image/defaultAvatar.jpg";
import { useSelector } from "react-redux";
import { Image } from "primereact/image";

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userDetail = useSelector((state: any) => state.user.userDetail);

  const [user, setUser] = useState<UserDetails>();
  const [visible, setVisible] = useState(false);
  const [visibleForm, setVisibleForm] = useState<number>();

  useEffect(() => {
    dispatch(showOrHindSpinner(true));
    setTimeout(() => {
      setUser(userDetail);
      dispatch(showOrHindSpinner(false));
    }, 300);
  }, [navigate, userDetail]);

  return user ? (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container-fluid py-1">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
              <h4 className="mb-sm-0 p-3">Trang cá nhân</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <Image
                  src={ process.env.REACT_APP_API_URL + `/image/${user?.avatar}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultAvatar;
                  }}
                  alt="Image"
                  preview={user.avatar ? true : false}
                  width="200px"
                  height="200px"
                  style={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    objectFit: "cover",
                  }}
                />
                <h5 className="my-3">{user?.fullname}</h5>
                <p className="text-muted mb-1">{user?.email}</p>
                <p className="text-muted mb-4">{user?.address}</p>
                <div className="d-flex justify-content-center mb-2">
                  <Button
                    label="Đổi mật khẩu"
                    onClick={() => {
                      setVisible(true);
                      setVisibleForm(1);
                    }}
                  />
                  <Button
                    label="Cập nhật"
                    className="mx-3"
                    onClick={() => {
                      setVisible(true);
                      setVisibleForm(2);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Họ và tên</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user?.fullname}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user?.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Số điện thoại</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user?.phone_number}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Địa chỉ</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user?.address}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Thời gian tạo</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {formatDate(user?.create_at)}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Thời gian cập nhật</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {formatDate(user?.update_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        header={`Email: ${user.email}`}
        visible={visible}
        style={{ width: "60vw", minWidth: "450px", zIndex: 1000 }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        {visibleForm && visibleForm === 1 ? (
          <ChangePasswordForm
            userId={user.id}
            handleUpdate={() => {
              setVisible(false);
            }}
          />
        ) : (
          <UpdateProfile
            user={user}
            handleUpdate={() => {
              setVisible(false);
            }}
          />
        )}
      </Dialog>
    </section>
  ) : (
    <>
      <h1>User not found</h1>
    </>
  );
}
