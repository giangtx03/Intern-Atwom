import { Button } from "primereact/button";
import React, { useState } from "react";
import { UpdateUserDetailsRequest } from "../../../model/User";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/hooks";
import Swal from "sweetalert2";
import { showOrHindSpinner } from "../../../reduces/SpinnerSlice";
import { UserService } from "../../../service/UserService";
import { toast } from "react-toastify";

export default function UpdateProfile(props: any) {
  const { user, handleUpdate } = props;
  const dispatch = useAppDispatch();

  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<UpdateUserDetailsRequest>({
    mode: "onTouched",
    defaultValues: {
      fullname: user.fullname,
      id: user.id,
      phone_number: user.phone_number,
      address: user.address,
    },
  });

  const handleInput = (event: any) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
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
        const formData = new FormData();
        formData.append("id", data.id);
        formData.append("fullname", data.fullname);
        formData.append("phoneNumber", data.phone_number);
        formData.append("address", data.address || "");
        if (data.avatar?.[0]) {
          formData.append("avatar", data.avatar[0]);
        }
        setTimeout(() => {
          UserService.getInstance()
            .updateUserDetails(formData)
            .then((response) => {
              console.log(response.data);
              if (response.data.status === 200) {
                toast.success(response.data.message, {
                  position: "top-right",
                });
                handleUpdate();
                window.location.reload();
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-4">
          <div className="row">
            <img
              src={
                preview ||
                `http://localhost:8080/public/api/v1/image/${user?.avatar}`
              }
              alt="User Avatar"
              width="250"
            />
          </div>
          <div className="row">
            <p className="mb-0">Chọn ảnh đại diện</p>
            <input
              type="file"
              {...register("avatar")}
              onChange={(e) => {
                register("avatar").onChange(e);
                handleImageChange(e);
              }}
              accept="image/*"
              className="form-control"
            />
          </div>
        </div>
        <div className="col-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
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
              </div>
              <hr />
              <div className="row">
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="registerPhoneNumber">
                    PhoneNumber
                  </label>
                  <input
                    type="text"
                    id="registerPhoneNumber"
                    {...register("phone_number", {
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
                {touchedFields.phone_number && errors.phone_number && (
                  <p className="text-danger">{errors.phone_number.message}</p>
                )}
              </div>
              <hr />
              <div className="row">
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="registerAddress">
                    Address
                  </label>
                  <input
                    type="text"
                    id="registerAddress"
                    {...register("address")}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-2">
            <Button
              onClick={() => handleUpdate()}
              label="Hủy"
              severity="secondary"
            />
            <Button type="submit" label="Cập nhật" className="mx-3" />
          </div>
        </div>
      </div>
    </form>
  );
}
