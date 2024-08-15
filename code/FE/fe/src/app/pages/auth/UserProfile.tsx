import { stat } from "fs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
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

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const decode = decodeToken<DecodedToken>(
    TokenService.getInstance().getToken()
  );

  const [user, setUser] = useState<UserDetails>();
  const [visible, setVisible] = useState(false);
  const [visibleForm, setVisibleForm] = useState<number>();

  useEffect(() => {
    dispatch(showOrHindSpinner(true));
    setTimeout(() => {
      if (decode) {
        UserService.getInstance()
          .getUserDetails(decode.user_id)
          .then((response) => {
            if (response.data.status === 200) {
              setUser(response.data.data);
              dispatch(showOrHindSpinner(false));
            }
          })
          .catch((error) => {
            console.log(error);
            dispatch(showOrHindSpinner(false));
            TokenService.getInstance().removeToken();
            navigate("/login");
          });
      }
    }, 300);
  }, [navigate]);

  return user ? (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <nav
              aria-label="breadcrumb"
              className="bg-body-tertiary rounded-3 p-3 mb-4"
            >
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">User</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  User Profile
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={`http://localhost:8080/public/api/v1/image/${user?.avatar}`}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
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
                    <p className="mb-0">Full Name</p>
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
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user?.phone_number}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user?.address}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Create At</p>
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
                    <p className="mb-0">Update At</p>
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
        header={user.email}
        visible={visible}
        style={{ width: "60vw", zIndex: 1000 }}
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
