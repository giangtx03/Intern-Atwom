import React, { useEffect } from "react";
import { LoginRequest } from "../../model/User";
import { useForm } from "react-hook-form";
import { UserService } from "../../service/UserService";
import { useAppDispatch } from "../../store/hooks";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { showOrHindSpinner } from "../../reduces/SpinnerSlice";
import { TokenService } from "../../service/TokenService";
import { Button } from "primereact/button";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginRequest>({ mode: "onTouched" });

  const onSubmit = (data: any) => {
    dispatch(showOrHindSpinner(true));
    setTimeout(() => {
      UserService.getInstance()
        .login({ email: data.email, password: data.password })
        .then((response) => {
          // console.log(response.data);
          if (response.data.status === 202) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            TokenService.getInstance().setToken(response.data.data.token);
            navigate("/pitch");
            dispatch(showOrHindSpinner(false));
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: "top-right",
          });
          dispatch(showOrHindSpinner(false));
        });
    }, 300);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex flex-column mt-3"
      style={{
        width: "60%",
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="text-center mb-3">
        <h3>Đăng nhập</h3>
      </div>

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" htmlFor="loginName">
          Email
        </label>
        <input
          type="text"
          id="loginName"
          {...register("email", {
            required: "Email không được để trống",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Email không đúng định dạng",
            },
          })}
          className="form-control"
          placeholder="Nhập email"
        />
      </div>
      {touchedFields.email && errors.email && (
        <p className="text-danger">{errors.email.message}</p>
      )}

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" htmlFor="loginPassword">
          Mật khẩu
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Mật khẩu không được để trống",
          })}
          id="loginPassword"
          className="form-control"
          placeholder="Nhập mật khẩu"
        />
      </div>
      {touchedFields.password && errors.password && (
        <p className="text-danger">{errors.password.message}</p>
      )}

      {/* <div className="row mb-4">
        <div className="col-md-6 d-flex justify-content-center">
          <div className="form-check mb-3 mb-md-0">
            <input className="form-check-input" type="checkbox" value="" id="loginCheck" checked />
            <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
          </div>
        </div>

        <div className="col-md-6 d-flex justify-content-center">
          <a href="#!">Forgot password?</a>
        </div>
      </div> */}

      <Button
        type="submit"
        className="d-flex justify-content-center align-items-center"
      >
        Đăng nhập
      </Button>

      <div className="text-center mt-3">
        <p>
          Chưa có tài khoản? <Link to={"/register"}>Đăng ký ngay</Link>
        </p>
      </div>
    </form>
  );
}
