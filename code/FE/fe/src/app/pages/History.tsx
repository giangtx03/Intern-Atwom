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

interface StatusSearch {
  name: string;
  code: string;
}

export default function History() {
  const [booking, setBooking] = useState([]);
  const [search, setSearch] = useState(new Search("", 5, 1, 1, 100));
  const [rows, setRows] = useState(search.limit);
  const [first, setFirst] = useState(0);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);
  const [choseBookingId, setChoseBookingID] = useState<number | undefined>(
    undefined
  );

  const statusSearch: StatusSearch[] = [
    { name: "Tất cả", code: "" },
    { name: "Thành công", code: "success" },
    { name: "chờ", code: "wait" },
    { name: "Đã thanh toán", code: "finished" },
    { name: "Hủy", code: "cancel" },
  ];
  const toast = useRef<Toast>(null);
  const token = localStorage.getItem("access_token");
  const user_id = decodeToken<DecodedToken>(
    TokenService.getInstance().getToken()
  )?.user_id;

  const dispatch = useAppDispatch();

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };
  const showError = (message: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
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
    return `${item.startTime} - ${item.endTime}`;
  };

  const dateBodyTemplate = (item: any) => {
    return dayjs(item.createAt).format("DD/MM/YYYY");
  };

  const actionBodyTemplate = (item: any) => {
    return (
      <React.Fragment>
        <Button
          label="Cancel"
          className={`p-button-danger ${
            item.status == "success" || item.status == "wait" ? "" : "hide"
          }`}
          onClick={() => ChoseCancelBooking(item)}
        />
        <Button
          label="Order"
          className={`p-button-success ${
            item.status == "cancel" || item.status == "finished" ? "" : "hide"
          }`}
          onClick={() => {
            setVisible(true);
            setChoseBookingID(item.pitchId);
          }}
        />
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (item: any) => {
    return (
      <Tag
        value={item.status}
        severity={item.status ? status[item.status] : "danger"}
      ></Tag>
    );
  };

  const fetchData = async () => {
    dispatch(showOrHindSpinner(true));
    try {
      await BookingService.getInstance()
        .getLstBooking(search, user_id)
        .then((response) => {
          if (response.data.status == 200) {
            setBooking(response.data.data);
            dispatch(showOrHindSpinner(false));
          }
        })
        .catch((response) => {
          dispatch(showOrHindSpinner(false));
          showError(response.data.message);
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
          showError(response.message);
        });
    } catch (error: any) {
      showError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search.timer]);

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
            showSuccess(response.data.message);
          })
          .catch((response) => {
            showSuccess(response.data.message);
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
    finished: "info",
    cancel: "danger",
    wait: "warning",
    success: "success",
  };
  return (
    <>
      {token && (
        <div className="list-group">
          <Toast ref={toast} />
          <h2 className="h4" style={{ margin: "1.5%" }}>
            History
          </h2>
          <Dropdown
            value={search.keySearch}
            options={statusSearch}
            optionLabel="name"
            onChange={(e: DropdownChangeEvent) => {
              setSearch({
                ...search,
                timer: new Date().getTime(),
                keySearch: e.value.code,
                page: 1,
              });
            }}
          ></Dropdown>
          <DataTable
            value={booking}
            rows={5}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="pitchName" header="Name"></Column>
            <Column field="address" header="Address"></Column>
            <Column field="type" header="Type"></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
            ></Column>
            <Column
              field="createAt"
              header="Create"
              body={dateBodyTemplate}
            ></Column>
            <Column
              field="timeFrame"
              header="Time Frame"
              body={timeFrameBodyTemplate}
            ></Column>
            <Column header="Action" body={actionBodyTemplate}></Column>
          </DataTable>
          <Paginator
            first={first}
            rows={search.limit}
            totalRecords={total}
            rowsPerPageOptions={[5, 10]}
            onPageChange={onPageChange}
          />
          <BookingDialog
            visible={visible}
            setVisible={setVisible}
            choseBookingId={choseBookingId}
            setChoseBookingID={setChoseBookingID}
            search={search}
            setSearch={setSearch}
          ></BookingDialog>
        </div>
      )}
    </>
  );
}
