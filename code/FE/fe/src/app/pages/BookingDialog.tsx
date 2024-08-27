import { Dialog } from "primereact/dialog";
import React, { useEffect, useRef, useState } from "react";
import PitchTimeService from "../service/PitchTimeService";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import Booking from "../model/Booking";
import { BookingService } from "../service/BookingService";
import { Message } from "primereact/message";
import { Messages } from "primereact/messages";
import swal from "sweetalert";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useAppDispatch } from "../store/hooks";
import { showOrHindSpinner } from "../reduces/SpinnerSlice";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { DecodedToken } from "../model/User";
import { TokenService } from "../service/TokenService";
import {
  STATUS_PITCH_BOOKING_ACCESS,
  STATUS_PITCH_BOOKING_WAIT,
} from "../constant/constant";
import { useSelector } from "react-redux";
import { InputTextarea } from "primereact/inputtextarea";

const formatTimeOption = (
  option: { startTime: string; endTime: string } | null
) => {
  if (!option) {
    return "Chọn khung thời gian";
  }
  return `${option.startTime.slice(0, 5)} - ${option.endTime.slice(0, 5)}`;
};
const formatCurrency = (value: number) => {
  if (value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(value)
      .replace("₫", "")
      .trim();
  }
  return 0;
};

export default function BookingDialog(props: any) {
  let { visible, setVisible, pitch_id } = props;
  const [listPitchTime, setListPitchTime] = useState<[]>();
  const [selectTime, setSelectTime] = useState(Object);
  const [message, setMessage] = useState<boolean>(false);
  const [note, setNote] = useState("");
  const user_id = decodeToken<DecodedToken>(
    TokenService.getInstance().getToken()
  )?.user_id;
  const navigate = useNavigate();
  const handleRedirect = (path: string) => {
    navigate(path);
  };

  const userDetail = useSelector((state: any) => state.user.userDetail);

  const add = () => {
    if (selectTime.timeSlotId == undefined) {
      setMessage(true);
    } else {
      swal("Bạn muốn đặt sân này ?", {
        buttons: ["Quay lại", "Đồng ý"],
        icon: "warning",
        dangerMode: true,
      }).then(async (value) => {
        if (value == true) {
          await BookingService.getInstance()
            .addBooking(
              new Booking(
                userDetail.role == "ADMIN"
                  ? STATUS_PITCH_BOOKING_ACCESS
                  : STATUS_PITCH_BOOKING_WAIT,
                note,
                user_id,
                pitch_id.id,
                selectTime.timeSlotId
              )
            )
            .then((response) => {
              if (response.data.status == 204) {
                swal("Đặt thành công", {
                  icon: "success",
                  text: response.data.message,
                });
                handleRedirect("/history");
              } else if (response.data.status == 302) {
                swal("đặt thất bại", {
                  icon: "warning",
                  text: response.data.message,
                });
              } else {
                swal("đặt thất bại", {
                  icon: "warning",
                });
              }
              setVisible(false);
            })
            .catch((response) => {
              swal("Cancel false", {
                icon: "warning",
              });
              setVisible(false);
            });
        }
      });
    }
  };

  const fetchData = async () => {
    try {
      if (pitch_id != undefined) {
        await PitchTimeService.getInstance()
          .getLstPitchTime(pitch_id.id)
          .then((response) => {
            if (response.data.status == 200) {
              setListPitchTime(response.data.data);
              setSelectTime(new Object());
              setNote("");
              setMessage(false);
            } else {
            }
          });
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Lỗi: ", error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [visible]);

  return (
    <Dialog
      header="Chọn thời gian"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      <div className="row">
        <div className="col-4">
          <label htmlFor="price">Giá khung giờ: </label>
        </div>
        <div className="col-8">
          <b className="w-full md:w-14rem">
            {selectTime != null ? formatCurrency(selectTime.price) : ""} VND
          </b>
        </div>
      </div>

      <div className="row mt-3 flex align-items-center">
        <div className="col-4">
          <label htmlFor="slot_time"> Chọn khung giờ: </label>
        </div>
        <div className="col-8 d-flex">
          <Dropdown
            value={selectTime}
            onChange={(e: DropdownChangeEvent) => {
              setSelectTime(e.value);
              setMessage(false);
            }}
            options={listPitchTime}
            optionLabel="startTime"
            itemTemplate={(option) => formatTimeOption(option)}
            placeholder={
              listPitchTime?.length === 0
                ? "Không còn khung giờ trống"
                : "Chọn khung giờ"
            }
            valueTemplate={(option) => {
              return listPitchTime?.length === 0
                ? "Không còn khung giờ trống"
                : formatTimeOption(option);
            }}
          />
        </div>
        <div className="center">
          <Message
            severity="error"
            text="Hãy chọn thời gian"
            className={message == false ? "hide " : ""}
            style={{ width: "25%" , margin:"1%"}}
          />
        </div>
      </div>
      <div className="row mt-3 flex align-items-center">
        <div className="col-4">
          <label htmlFor="note">Ghi chú: </label>
        </div>
        <div className="col-8">
          <InputTextarea  value={note} cols={30} onChange={(e) => setNote(e.target.value)} />
        </div>
      </div>
      <div className="row mt-3">
        <Button label="Đặt sân" onClick={add} />
      </div>
    </Dialog>
  );
}
