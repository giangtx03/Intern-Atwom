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
import { STATUS_PITCH_BOOKING_WAIT } from "../constant/constant";

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

  const add = () => {
    if (selectTime.timeSlotId == undefined) {
      setMessage(true);
    } else {
      swal("Bạn muốn cập nhật tượng này chứ?", {
        buttons: ["Quay lại", "Đồng ý"],
        icon: "warning",
        dangerMode: true,
      }).then(async (value) => {
        await BookingService.getInstance()
          .addBooking(
            new Booking(
              STATUS_PITCH_BOOKING_WAIT,
              note,
              user_id,
              pitch_id.id,
              selectTime.timeSlotId
            )
          )
          .then((response) => {
            if (response.data.status == 204) {
              swal("add success", {
                icon: "success",
                text: response.data.message,
              });
            } else if (response.data.status == 302) {
              swal("add success", {
                icon: "warning",
                text: response.data.message,
              });
            } else {
              swal("An error occurred", {
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
            {selectTime !== undefined ? selectTime.price : ""} VND
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
            placeholder="Chọn thời gian"
            className="w-full md:w-14rem"
          />
          <p className="w-full md:w-14rem" style={{ margin: "auto 0 auto 1%" }}>
            {" "}
            - {selectTime !== undefined ? selectTime.endTime : ""}
          </p>
        </div>
      </div>
      <Message
        severity="error"
        text="Error Message"
        className={message == false ? "hide" : ""}
      />
      <div className="row mt-3 flex align-items-center">
        <div className="col-4">
          <label htmlFor="note">Ghi chú: </label>
        </div>
        <div className="col-8">
          <InputText value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
      </div>
      <div className="row mt-3">
        <Button label="Đặt sân" onClick={add} />
      </div>
    </Dialog>
  );
}
