import React, { useEffect } from "react";
import { RegisterRequest } from "../../model/User";
import { useForm } from "react-hook-form";
import { UserService } from "../../service/UserService";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { showOrHindSpinner } from "../../reduces/SpinnerSlice";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, touchedFields },
  } = useForm<RegisterRequest>({ mode: "onTouched" });

  const handleInput = (event: any) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  };

  const onSubmit = (data: any) => {
    dispatch(showOrHindSpinner(true));
    setTimeout(() => {
      UserService.getInstance()
        .register({
          email: data.email,
          password: data.password,
          fullname: data.fullname,
          phone_number: data.phoneNumber,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 201) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            navigate("/login");
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

  useEffect(() => {
    const retypePassword = watch("retypePassword");
    if (retypePassword && retypePassword !== watch("password")) {
      setError("retypePassword", {
        type: "manual",
        message: "Mật khẩu không khớp",
      });
    } else {
      clearErrors("retypePassword");
    }
  }, [ watch("password"), watch, setError, clearErrors]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex flex-column"
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
        <h3>Sign up</h3>
      </div>

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" htmlFor="registerEmail">
          Email
        </label>
        <input
          type="email"
          id="registerEmail"
          {...register("email", {
            required: "Email không được để trống",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Email không đúng định dạng",
            },
          })}
          className="form-control"
        />
      </div>
      {touchedFields.email && errors.email && (
        <p className="text-danger">{errors.email.message}</p>
      )}

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" htmlFor="registerFullname">
          Fullname
        </label>
        <input
          type="text"
          id="registerFullname"
          {...register("fullname", {
            required: "Tên không được để trống",
          })}
          className="form-control"
        />
      </div>
      {touchedFields.fullname && errors.fullname && (
        <p className="text-danger">{errors.fullname.message}</p>
      )}

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" htmlFor="registerPassword">
          Password
        </label>
        <input
          type="password"
          id="registerPassword"
          {...register("password", {
            required: "Mật khẩu không được để trống",
            minLength: {
              value: 8,
              message: "Mật khẩu tối thiểu 8 ký tự",
            },
          })}
          className="form-control"
        />
      </div>
      {touchedFields.password && errors.password && (
        <p className="text-danger">{errors.password.message}</p>
      )}

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" htmlFor="registerRetypePassword">
          Retype Password
        </label>
        <input
          type="password"
          id="registerRetypePassword"
          className="form-control"
          {...register("retypePassword", {
            required: "Retype Password không được để trống",
            validate: (value) =>
              value === watch("password") || "Mật khẩu không khớp",
          })}
        />
      </div>
      {touchedFields.retypePassword && errors.retypePassword && (
        <p className="text-danger">{errors.retypePassword.message}</p>
      )}

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" htmlFor="registerPhoneNumber">
          PhoneNumber
        </label>
        <input
          type="text"
          id="registerPhoneNumber"
          {...register("phoneNumber", {
            required: "Số điện thoại không được để trống",
            minLength: {
              value: 3,
              message: "Số điện thoại tối thiểu 3 chữ số",
            },
          })}
          onInput={handleInput}
          className="form-control"
        />
      </div>
      {touchedFields.phoneNumber && errors.phoneNumber && (
        <p className="text-danger">{errors.phoneNumber.message}</p>
      )}

      {/* <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="registerCheck"
            checked
            aria-describedby="registerCheckHelpText"
          />
          <label className="form-check-label" htmlFor="registerCheck">
            I have read and agree to the terms
          </label>
        </div> */}

      <button
        type="submit"
        data-mdb-button-init
        data-mdb-ripple-init
        className="btn btn-primary btn-block mb-3"
      >
        Sign in
      </button>
    </form>
  );
}
