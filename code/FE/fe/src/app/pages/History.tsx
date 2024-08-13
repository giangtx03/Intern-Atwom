import React, { useEffect, useRef, useState } from "react";
import { BookingService } from "../service/BookingService";
import Search from "../model/SearchModel";
import dayjs from "dayjs";
import "../../App.css";
import Booking from "../model/Booking";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import BookingDialog from "./BookingDialog";
import { Toast } from "primereact/toast";
import swal from "sweetalert";

export default function History() {
  const [booking, setBooking] = useState([]);
  const [search, setSearch] = useState(new Search("", 5, 1, 1, 100));
  const [total, setTotal] = useState<number>(10);
  const [visible, setVisible] = useState<boolean>(false);
  const [choseBookingId, setChoseBookingID] = useState<number | undefined>(
    undefined
  );
  const toast = useRef<Toast>(null);

  const show = () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Message Content",
    });
  };

  const fetchData = async () => {
    try {
      const response = await BookingService.getInstance().getLstBooking(
        search,
        1
      );
      const responseTotal = await BookingService.getInstance().total(search, 1);
      setTotal(responseTotal.data.data);
      setBooking(response.data.data);
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
  }, [search.timer, choseBookingId, visible]);

  type StatusType = {
    [key: string]: string;
  };

  const ChoseCancelBooking = (bookChose: Booking) => {
    swal("Bạn muốn cập nhật tượng này chứ?", {
      buttons: ["Quay lại", "Đồng ý"],
      icon: "warning",
      dangerMode: true,
    }).then(async (value) => {
      if (value) {
        bookChose.status = "cancel";
        await BookingService.getInstance()
          .CancelBooking(bookChose)
          .then((response) => {
            setSearch({
              ...search,
              timer: new Date().getTime(),
              page: 1,
            });
            swal("Cancel success", {
              icon: "success",
            });
          })
          .catch((response) => {
            swal("Cancel false", {
              icon: "warning",
            });
          });
      } else {
        setSearch({
          ...search,
          timer: new Date().getTime(),
          page: 1,
        });
        swal("Cancel false", {
          icon: "warning",
        });
      }
    });
  };

  const status: StatusType = {
    finished: "table-success",
    cancel: "table-danger",
    wait: "table-secondary",
    success: "table-warning",
  };
  return (
    <div className="list-group">
      <h2 className="h4" style={{ margin: "1.5%" }}>
        History
      </h2>
      <select
        className="custom-select"
        onChange={(e: any) => {
          setSearch({
            ...search,
            timer: new Date().getTime(),
            keySearch: e.target.value,
            page: 1,
          });
        }}
      >
        <Toast ref={toast} />
        <option selected value="">
          Status
        </option>
        <option value="success">Thành công</option>
        <option value="wait">chờ</option>
        <option value="finished">đã xong</option>
        <option value="cancel">huy</option>
      </select>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">address</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">create</th>
            <th scope="col"> time frame</th>
            <th scope="col"> action</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((item: any, index: number) => {
            return (
              <tr className={status[`${item.status}`]}>
                <th scope="row">{index + 1}</th>
                <td>{item.pitchName}</td>
                <td>{item.address}</td>
                <td>{item.type}</td>
                <td>{item.status}</td>
                <td>{dayjs(item.createAt).format("DD/MM/YYYY")}</td>
                <td>{`${item.startTime} - ${item.endTime}`}</td>
                <td>
                  <button
                    type="button"
                    className={`btn btn-danger ${item.status == "success" || item.status == "wait"
                        ? ""
                        : "hide"
                      } `}
                    onClick={(e) => {
                      ChoseCancelBooking(item);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={`btn btn-success ${item.status == "cancel" || item.status == "finished"
                        ? ""
                        : "hide"
                      } `}
                    onClick={(e) => {
                      setVisible(true);
                      setChoseBookingID(item.pitchId);
                    }}
                  >
                    Order
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="center">
        <button
          className="btn btn-secondary"
          onClick={() => {
            if (search.page > 1) {
              setSearch({
                ...search,
                page: search.page - 1,
                timer: new Date().getTime(),
              });
            }
          }}
        >
          Pre
        </button>
        <span>{search.page}</span>
        <button
          className="btn btn-dark"
          onClick={() => {
            if (search.page <= total / search.limit) {
              setSearch({
                ...search,
                page: search.page + 1,
                timer: new Date().getTime(),
              });
            }
          }}
        >
          Next
        </button>
      </div>
      <BookingDialog
        visible={visible}
        setVisible={setVisible}
        choseBookingId={choseBookingId}
        setChoseBookingID={setChoseBookingID}
        show={show}
      ></BookingDialog>
    </div>
  );
}
