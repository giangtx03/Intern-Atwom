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
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { showOrHindSpinner } from "../reduces/SpinnerSlice";
import { spinner } from "../../App";
import { useNavigate } from "react-router-dom";
import { DecodedToken } from "../model/User";
import { decodeToken } from "react-jwt";
import { TokenService } from "../service/TokenService";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Tag } from "primereact/tag";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import {
  STATUS_PITCH_BOOKING_ACCESS,
  STATUS_PITCH_BOOKING_CANCEL,
  STATUS_PITCH_BOOKING_REJECT,
  STATUS_PITCH_BOOKING_SUCCESS,
  STATUS_PITCH_BOOKING_WAIT,
} from "../constant/constant";
import { access } from "fs/promises";
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import { useSelector } from "react-redux";

interface StatusSearch {
  name: string;
  code: string;
}

interface Order {
  name: string;
  type: string;
}

export default function History() {
  const [booking, setBooking] = useState([]);
  const [search, setSearch] = useState(new Search("", 5, 1, 1, 100));
  const [rows, setRows] = useState(search.limit);
  const [first, setFirst] = useState(0);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [statusBooking, setStatusBooking] = useState<StatusSearch>({
    name: "Tất cả",
    code: "",
  });
  const navigate = useNavigate();
  const handleRedirect = (path: string) => {
    navigate(path);
  };

  const userDetail = useSelector((state: any) => state.user.userDetail);
  
  const [selectOrder, setSelectOrder] = useState<Order>({
    name: "mới nhất",
    type: "DESC",
  });

  const order: Order[] = [
    { name: "mới nhất", type: "DESC" },
    { name: "lâu nhất", type: "ASC" },
  ];

  const statusSearchUser: StatusSearch[] = [
    { name: "Tất cả", code: "" },
    { name: "Chưa thanh toán", code: STATUS_PITCH_BOOKING_ACCESS },
    { name: "chờ", code: STATUS_PITCH_BOOKING_WAIT },
    { name: "Đã thanh toán", code: STATUS_PITCH_BOOKING_SUCCESS },
    { name: "Hủy", code: STATUS_PITCH_BOOKING_CANCEL },
    { name: "Từ chối", code: STATUS_PITCH_BOOKING_REJECT },
  ];

  const statusSearchAdmin: StatusSearch[] = [
    { name: "Tất cả", code: "" },
    { name: "Chưa thanh toán", code: STATUS_PITCH_BOOKING_ACCESS },
    { name: "Đã thanh toán", code: STATUS_PITCH_BOOKING_SUCCESS },
    { name: "Hủy", code: STATUS_PITCH_BOOKING_CANCEL }
  ];
  
  const user_id = decodeToken<DecodedToken>(
    TokenService.getInstance().getToken()
  )?.user_id;

  const dispatch = useAppDispatch();

  const showToastSuccess = () => {
    toast.success("Thành công !", {
      position: "top-right",
    });
  };

  const showToastError = () => {
    toast.error("Thất bại !", {
      position: "top-right",
    });
  };

  const onPageChange = (e: any) => {
    setFirst(e.first);
    setRows(e.rows);
    setSearch({
      ...search,
      page: e.page + 1,
      limit: e.rows,
      timer: new Date().getTime(),
    });
  };

  const timeFrameBodyTemplate = (item: any) => {
    return `${item.startTime.slice(0, 5)} - ${item.endTime.slice(0, 5)}`;
  };

  const dateBodyTemplate = (item: any) => {
    return dayjs(item.createAT).format("DD/MM/YYYY");
  };

  const actionBodyTemplate = (item: any) => {
    return (
      <React.Fragment>
        <Button
          label="Hủy"
          className={`p-button-danger ${
            item.status == STATUS_PITCH_BOOKING_ACCESS ||
            item.status == STATUS_PITCH_BOOKING_WAIT
              ? ""
              : "hide"
          }`}
          onClick={() => ChoseCancelBooking(item)}
        />
        <Button
          label="Đặt lại"
          className={`p-button-success ${
            item.status == STATUS_PITCH_BOOKING_CANCEL ||
            item.status == STATUS_PITCH_BOOKING_REJECT ||
            item.status == STATUS_PITCH_BOOKING_SUCCESS
              ? ""
              : "hide"
          }`}
          onClick={() => {
            handleRedirect(`/pitch/${item.pitchId}`);
          }}
        />
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (item: any) => {
    return (
      <Tag
        value={statusDisplay[item.status]}
        severity={item.status ? status[item.status] : "danger"}
      ></Tag>
    );
  };

  const fetchData = async () => {
    dispatch(showOrHindSpinner(true));
    try {
      await BookingService.getInstance()
        .getLstBooking(search, user_id, selectOrder.type)
        .then((response) => {
          if (response.data.status == 200) {
            setBooking(response.data.data);
            dispatch(showOrHindSpinner(false));
          }
        })
        .catch((response) => {
          dispatch(showOrHindSpinner(false));
          showToastError();
        });
      await BookingService.getInstance()
        .total(search, user_id)
        .then((response) => {
          if (response.data.status == 200) {
            setTotal(response.data.data);
          }
        })
        .catch((response) => {
          dispatch(showOrHindSpinner(false));
          showToastError();
        });
    } catch (error: any) {
      showToastError();
      console.log(error);
      dispatch(showOrHindSpinner(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [search.timer]);

  const ChoseCancelBooking = (bookChose: Booking) => {
    swal("Bạn muốn hủy đơn này chứ?", {
      buttons: ["Quay lại", "Đồng ý"],
      icon: "warning",
      dangerMode: true,
    }).then(async (value) => {
      if (value) {
        bookChose.status = STATUS_PITCH_BOOKING_CANCEL;
        await BookingService.getInstance()
          .CancelBooking(bookChose)
          .then((response) => {
            console.log(response);
            setSearch({
              ...search,
              timer: new Date().getTime(),
              page: 1,
            });
            showToastSuccess();
          })
          .catch((response) => {
            console.log(response);
            showToastSuccess();
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

  const status: { [key: string]: "info" | "danger" | "warning" | "success" } = {
    access: "info",
    cancel: "danger",
    wait: "warning",
    success: "success",
    reject: "danger",
  };

  const statusDisplay: { [key: string]: string } = {
    access: "Chưa thanh toán",
    cancel: "Đã hủy",
    wait: "chờ",
    success: "Đã thanh toán",
    reject: "Từ chối",
  };

  return (
    <>
      <ToastContainer />
      {booking.length == 0 && search.keySearch == "" ? (
        <div className="center" style={{ margin: "15%" }}>
          <h3>Bạn chưa đặt sân nào</h3>
          <Button
            onClick={(e) => {
              handleRedirect("/pitch");
            }}
            label="Đặt sân ngay"
          />
        </div>
      ) : (
        <div className="list-group">
          <h2 className="h4" style={{ margin: "1.5%" }}>
            Lịch sử
          </h2>
          <div>
            <Dropdown
              value={statusBooking}
              options={userDetail.role == "ADMIN" ? statusSearchAdmin : statusSearchUser}
              optionLabel="name"
              style={{ width: "15%", margin: "2%" }}
              onChange={(e: DropdownChangeEvent) => {
                setStatusBooking(e.value);
                setSearch({
                  ...search,
                  timer: new Date().getTime(),
                  keySearch: e.value.code,
                  page: 1,
                });
                setFirst(1);
              }}
            ></Dropdown>
            <Dropdown
              value={selectOrder}
              onChange={(e: DropdownChangeEvent) => {
                setSelectOrder(e.value);
                setSearch({
                  ...search,
                  timer: new Date().getTime(),
                  page: 1,
                });
                setFirst(1);
              }}
              options={order}
              optionLabel="name"
              placeholder="Sắp xếp theo"
              style={{ width: "15%", margin: "2%" }}
            ></Dropdown>
          </div>
          <DataTable
            value={booking}
            rows={5}
            tableStyle={{ minWidth: "50rem" }}
            emptyMessage="Không có đơn"
          >
            <Column field="pitchName" header="Tên sân"></Column>
            <Column field="address" header="Địa chỉ"></Column>
            <Column field="type" header="Loại sân"></Column>
            <Column
              field="status"
              header="Trạng thái"
              body={statusBodyTemplate}
            ></Column>
            <Column
              field="createAT"
              header="Ngày tạo"
              body={dateBodyTemplate}
            ></Column>
            <Column
              field="timeFrame"
              header="Khung giờ"
              body={timeFrameBodyTemplate}
            ></Column>
            <Column header="Lựa chọn" body={actionBodyTemplate}></Column>
          </DataTable>

          <Paginator
            first={first}
            rows={search.limit}
            totalRecords={total}
            rowsPerPageOptions={[5, 10]}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}
