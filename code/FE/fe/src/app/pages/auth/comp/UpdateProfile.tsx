import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import { UpdateUserDetailsRequest } from "../../../model/User";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/hooks";
import Swal from "sweetalert2";
import { showOrHindSpinner } from "../../../reduces/SpinnerSlice";
import { UserService } from "../../../service/UserService";
import { toast } from "react-toastify";
import defaultAvatar from "../../../../assets/image/defaultAvatar.jpg";
import { FiUpload } from "react-icons/fi";
import { Image } from "primereact/image";
import { login } from "../../../reduces/UserSlice";

export default function UpdateProfile(props: any) {
  const { user, handleUpdate } = props;
  const dispatch = useAppDispatch();

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    // console.log(data);
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
              // console.log(response.data);
              if (response.data.status === 200) {
                toast.success(response.data.message, {
                  position: "top-right",
                });
                handleUpdate();
                // window.location.reload();
                dispatch(login(response.data.data));
                dispatch(showOrHindSpinner(false));
              }
            })
            .catch((error) => {
              toast.error(error.response.data.message, {
                position: "top-right",
              });
              console.log(error);
              dispatch(showOrHindSpinner(false));
            });
        }, 300);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-3">
          <div
            className="image-container"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src={
                preview ||
                process.env.REACT_APP_API_URL + `/image/${user?.avatar}`
              }
              alt="User Avatar"
              width="280"
              height="280"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultAvatar;
              }}
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                objectFit: "cover",
              }}
            />
            <div className="overlay">
              <div className="icon-wrapper">
                <FiUpload className="upload-icon" />
              </div>
            </div>
            <input
              type="file"
              {...register("avatar")}
              onChange={(e) => {
                register("avatar").onChange(e);
                handleImageChange(e);
              }}
              accept="image/*"
              className="form-control"
              ref={(e) => {
                register("avatar").ref(e);
                fileInputRef.current = e;
              }}
              hidden
            />
          </div>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="mb-4">
            <div className="card-body">
              <div className="row">
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="registerFullname">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="registerFullname"
                    {...register("fullname", {
                      required: "Tên không được để trống",
                    })}
                    className="form-control"
                    placeholder="Nhập họ và tên"
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
                    Số điện thoại
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
                    placeholder="Nhập số điện thoại"
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
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    id="registerAddress"
                    {...register("address")}
                    className="form-control"
                    placeholder="Nhập địa chỉ"
                  />
                </div>
              </div>
              <hr />
            </div>
          </div>
          <div className="d-flex justify-content-center mb-2">
            <Button
              onClick={() => handleUpdate()}
              label="Hủy"
              severity="secondary"
              type="button"
            />
            <Button type="submit" label="Cập nhật" className="mx-3" />
          </div>
        </div>
      </div>
    </form>
  );
}
