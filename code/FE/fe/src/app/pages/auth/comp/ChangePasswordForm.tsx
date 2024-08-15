import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChangePasswordRequest } from "../../../model/User";
import { useAppDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { showOrHindSpinner } from "../../../reduces/SpinnerSlice";
import { UserService } from "../../../service/UserService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ChangePasswordForm(props: any) {
  const { userId, handleUpdate } = props;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, touchedFields },
  } = useForm<ChangePasswordRequest>({ mode: "onTouched" });

  const onSubmit = (data: any) => {
    Swal.fire({
      title: "Bạn có chắc chắn ?",
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(showOrHindSpinner(true));
        setTimeout(() => {
          UserService.getInstance()
            .changePassword({
              user_id: userId,
              old_password: data.oldPassword,
              new_password: data.newPassword,
            })
            .then((response) => {
              console.log(response.data);
              if (response.data.status === 200) {
                toast.success(response.data.message, {
                  position: "top-right",
                });
                handleUpdate();
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
      }
    });
  };

  useEffect(() => {
    const retypePassword = watch("retypePassword");
    if (retypePassword && retypePassword !== watch("newPassword")) {
      setError("retypePassword", {
        type: "manual",
        message: "Mật khẩu không khớp",
      });
    } else {
      clearErrors("retypePassword");
    }
  }, [watch("newPassword"), watch, setError, clearErrors]);
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
        <h3>Change Password</h3>
      </div>

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" htmlFor="registerPassword">
          Password
        </label>
        <input
          type="password"
          id="registerPassword"
          {...register("oldPassword", {
            required: "Mật khẩu không được để trống",
          })}
          className="form-control"
        />
      </div>
      {touchedFields.oldPassword && errors.oldPassword && (
        <p className="text-danger">{errors.oldPassword.message}</p>
      )}

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" htmlFor="registerPassword">
          New Password
        </label>
        <input
          type="password"
          id="registerPassword"
          {...register("newPassword", {
            required: "Mật khẩu không được để trống",
            minLength: {
              value: 8,
              message: "Mật khẩu tối thiểu 8 ký tự",
            },
          })}
          className="form-control"
        />
      </div>
      {touchedFields.newPassword && errors.newPassword && (
        <p className="text-danger">{errors.newPassword.message}</p>
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
            required: "Xác nhận mật khẩu không được để trống",
            validate: (value) =>
              value === watch("newPassword") || "Mật khẩu không khớp",
          })}
        />
      </div>
      {touchedFields.retypePassword && errors.retypePassword && (
        <p className="text-danger">{errors.retypePassword.message}</p>
      )}

      <button
        type="submit"
        data-mdb-button-init
        data-mdb-ripple-init
        className="btn btn-primary btn-block mb-3"
      >
        Update
      </button>
    </form>
  );
}
