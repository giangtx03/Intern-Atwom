import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { showOrHindSpinner } from "../../reduces/SpinnerSlice";
import { PitchService } from "../../service/PitchService";
import { PitchResponse } from "../../model/PitchModel";
import defaultSanBong from "../../../assets/image/defaultSanBong.jpeg";
import { FaSearch } from "react-icons/fa";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { PitchTypeService } from "../../service/PitchTypeService";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { Rating } from "primereact/rating";

type SearchModel = {
  keyword: string;
  pitchType: any;
  timeSlot: any;
  pageNumber: number;
  limit: number;
  sortBy: { name: string; value: string };
  sortOrder: { name: string; value: string };
  timer: number;
};

type TimeSlot = {
  id: number;
  start_time: string;
  end_time: string;
};

type PitchType = {
  id: number;
  name: string;
};

export default function Pitch() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [list, setList] = useState<PitchResponse[]>();
  const [listPitchType, setListPitchType] = useState<PitchType[]>();
  const [search, setSearch] = useState<SearchModel>({
    keyword: "",
    pitchType: {},
    timeSlot: {},
    pageNumber: 1,
    limit: 12,
    sortBy: { name: "id", value: "p.id" },
    sortOrder: { name: "Tăng dần", value: "asc" },
    timer: 0,
  });
  const [totalRecords, setTotalRecords] = useState<number>(0);

  useEffect(() => {
    dispatch(showOrHindSpinner(true));
    setTimeout(() => {
      PitchService.getInstance()
        .getAllPitch({
          keyword: search.keyword,
          pitch_type_id: search.pitchType.id,
          time_slot_id: search.timeSlot.id,
          page_number: search.pageNumber,
          limit: search.limit,
          sort_by: search.sortBy.value ? search.sortBy.value : search.sortBy,
          sort_order: search.sortOrder.value
            ? search.sortOrder.value
            : search.sortOrder,
        })
        .then((response: any) => {
          if (response.data.status === 200) {
            setList(response.data.data.items);
            // console.log(search);
            // console.log(response.data.data);
            setTotalRecords(response.data.data.total_items);
            dispatch(showOrHindSpinner(false));
          }
        })
        .catch((error: any) => {
          console.log(error);
          dispatch(showOrHindSpinner(false));
          navigate("/login");
        });
    }, 300);
  }, [search.timer]);

  useEffect(() => {
    PitchTypeService.getInstance()
      .getAllPitchType()
      .then((response: any) => {
        if (response.data.status === 200) {
          setListPitchType([{ id: 0, name: "Tất cả" }, ...response.data.data]);
          // console.log(response.data.data)
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const onPageChange = (event: any) => {
    setSearch({
      ...search,
      pageNumber: event.page + 1,
      limit: event.rows,
      timer: Date.now(),
    });
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row justify-content-center ">
          <div className="col-lg-6 col-md-12 p-3 rounded shadow">
            <div className="input-group" style={{ height: "45px" }}>
              <input
                type="search"
                id="form1"
                className="form-control"
                placeholder="Tìm kiếm"
                aria-label="Search"
                value={search.keyword}
                onChange={(e) => {
                  setSearch({
                    ...search,
                    keyword: e.target.value,
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearch({
                      ...search,
                      timer: Date.now(),
                    });
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  setSearch({
                    ...search,
                    timer: Date.now(),
                  });
                }}
              >
                <FaSearch />
              </Button>
              <Button
                className="mx-3"
                onClick={() => {
                  setVisible(true);
                }}
              >
                Tìm kiếm nâng cao
              </Button>
            </div>
          </div>
        </div>
        <div className="row">
          {list && list.length > 0 ? (
            <>
              <div className="row m-0">
                <p className="m-0 text-black">Tổng số sân: {totalRecords}</p>
              </div>
              {list.map((item: PitchResponse) => {
                return (
                  <div
                    key={item.id}
                    className="col-md-6 col-lg-4 mb-4 mb-lg-0 mt-3"
                  >
                    <div className="card">
                      <img
                        src={process.env.REACT_APP_API_URL + `/image/${item.images[0]?.name}`}
                        className="card-img-top"
                        alt="Laptop"
                        onError={(e) => {
                          e.currentTarget.src = defaultSanBong;
                        }}
                        style={{
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <p>
                            <b>Kiểu sân:</b> {item.pitch_type_name}
                          </p>
                        </div>
                        <Link
                          to={`/pitch/${item.id}`}
                          className="d-flex justify-content-between mb-3"
                        >
                          <h5 className="text-dark mb-0">{item.name}</h5>
                        </Link>
                        <div className="d-flex justify-content-between">
                          <p style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow:"ellipsis"}}>Địa chỉ : {item.address}</p>
                        </div>
                        <div className="col-12 d-flex align-items-center">
                          <p className="me-1 mb-0">Đánh giá: </p>
                          <b className="mb-0 me-3" style={{color: "#FFCC00"}}>
                            {item.avg_star.toFixed(2)}/5
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <Paginator
                first={(search.pageNumber - 1) * search.limit}
                rows={search.limit}
                totalRecords={totalRecords}
                rowsPerPageOptions={[6, 12, 18, 24]}
                onPageChange={onPageChange}
                className="mt-3"
              />
            </>
          ) : (
            <h3 className="mt-3 text-danger">Không tồn tại sân bóng !</h3>
          )}
        </div>
      </div>
      <Dialog
        header="Tìm kiếm nâng cao"
        visible={visible}
        style={{ width: "40vw", minWidth: "450px", zIndex: 1000 }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="row justify-content-center align-items-center mb-3">
          <div className="col-5">
            <label className="mx-3">Chọn kiểu sân:</label>
          </div>
          <div className="col-7">
            <Dropdown
              value={search.pitchType}
              onChange={(e) =>
                setSearch({
                  ...search,
                  pitchType: e.target.value,
                })
              }
              defaultValue={0}
              options={listPitchType}
              style={{ width: "14rem" }}
              optionLabel="name"
              placeholder="Chọn kiểu sân"
              className="w-full md:w-14rem"
            />
          </div>
        </div>
        <div className="row justify-content-center align-items-center mb-3">
          <div className="col-5">
            <label className="mx-3">Sắp xếp theo: </label>
          </div>
          <div className="col-7">
            <Dropdown
              value={search.sortBy}
              onChange={(e) => {
                setSearch({
                  ...search,
                  sortBy: e.target.value,
                });
              }}
              style={{ width: "14rem" }}
              defaultValue={0}
              optionLabel="name"
              placeholder="Sắp xếp theo"
              options={[
                { name: "Số thứ tự", value: "p.id" },
                { name: "Ngày tạo", value: "p.create_at" },
                { name: "Đánh giá", value: "avg(c.star)" },
              ]}
              className="w-full md:w-14rem"
            />
          </div>
        </div>
        <div className="row justify-content-center align-items-center mb-3">
          <div className="col-5">
            <label className="mx-3">Thứ tự sắp xếp: </label>
          </div>
          <div className="col-7">
            <Dropdown
              value={search.sortOrder}
              onChange={(e) => {
                setSearch({
                  ...search,
                  sortOrder: e.target.value,
                });
              }}
              style={{ width: "14rem" }}
              defaultValue={0}
              optionLabel="name"
              placeholder="Thứ tự sắp xếp"
              options={[
                { name: "Tăng dần", value: "asc" },
                { name: "Giảm dần", value: "desc" },
              ]}
              className="w-full md:w-14rem"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
            <Button
              onClick={() => {
                setSearch({
                  ...search,
                  pitchType: { id: 0 },
                  timeSlot: { id: 0 },
                  sortBy: { name: "Số thứ tự", value: "p.id" },
                  sortOrder: { name: "Tăng dần", value: "asc" },
                  timer: Date.now(),
                });
                setVisible(false);
              }}
            >
              Làm mới
            </Button>
          </div>
          <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
            <Button
              onClick={() => {
                setSearch({
                  ...search,
                  timer: Date.now(),
                });
                setVisible(false);
              }}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      </Dialog>
    </section>
  );
}
