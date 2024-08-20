import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { showOrHindSpinner } from "../../reduces/SpinnerSlice";
import { PitchService } from "../../service/PitchService";
import { PitchResponse } from "../../model/PitchModel";
import { STATUS_PITCH_TIME_ACTIVE } from "../../constant/constant";
import defaultAvatar from "../../../assets/image/avatar.jpg";
import { FaSearch } from "react-icons/fa";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { TimeSlotService } from "../../service/TimeSlotService";
import { PitchTypeService } from "../../service/PitchTypeService";

type SearchModel = {
  keyword: string;
  pitchType: any;
  timeSlot: any;
  pageNumber: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
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
  const [listTimeSlot, setListTimeSlot] = useState<TimeSlot[]>();
  const [prices, setPrices] = useState<{ [key: number]: number }>({});
  const [search, setSearch] = useState<SearchModel>({
    keyword: "",
    pitchType: {},
    timeSlot: {},
    pageNumber: 1,
    limit: 12,
    sortBy: "p.id",
    sortOrder: "asc",
    timer: 0,
  });

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
          sort_by: search.sortBy,
          sort_order: search.sortOrder,
        })
        .then((response: any) => {
          if (response.data.status === 200) {
            setList(response.data.data.items);
            // console.log(search);
            // console.log(response.data.data.items);
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
    TimeSlotService.getInstance()
      .getAllTimeSlot()
      .then((response: any) => {
        if (response.data.status === 200) {
          setListTimeSlot([{id: 0, start_time: '00:00:00', end_time: '23:59:59'}, ...response.data.data]);
          // console.log(response.data.data)
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    PitchTypeService.getInstance()
      .getAllPitchType()
      .then((response: any) => {
        if (response.data.status === 200) {
          setListPitchType([{id: 0, name: "ALL"}, ...response.data.data]);
          // console.log(response.data.data)
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const handlePriceChange = (itemId: number, price: number) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [itemId]: price,
    }));
  };

  const formattedTimeSlots = listTimeSlot?.map((slot) => ({
    ...slot,
    label: `${slot.start_time} - ${slot.end_time}`,
  }));

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row justify-content-center ">
          <div className="col-6 p-3 rounded shadow">
            <div className="input-group" style={{ height: "45px" }}>
              <input
                type="search"
                id="form1"
                className="form-control"
                placeholder="Search"
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
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => {
                  setSearch({
                    ...search,
                    timer: Date.now(),
                  });
                }}
              >
                <FaSearch />
              </button>
              <button
                className="btn btn-primary mx-3"
                onClick={() => {
                  setVisible(true);
                }}
              >
                Tìm kiếm nâng cao
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {list?.map((item: PitchResponse) => {
            return (
              <div
                key={item.id}
                className="col-md-6 col-lg-4 mb-4 mb-lg-0 mt-3"
              >
                <div className="card">
                  <img
                    src={`http://localhost:8080/public/api/v1/image/${item.images[0]?.name}`}
                    className="card-img-top"
                    alt="Laptop"
                    onError={(e) => {
                      e.currentTarget.src = defaultAvatar;
                    }}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <p className="small">{item.pitch_type_name}</p>
                      <p className="small text-danger">
                        <s>1099 VND</s>
                      </p>
                    </div>
                    <Link
                      to={`/pitch/${item.id}`}
                      className="d-flex justify-content-between mb-3"
                    >
                      <h5 className="text-dark mb-0">{item.name}</h5>
                      <h5 className="text-dark mb-0">
                        {prices[item.id] ||
                          item.times.find(
                            (time) => time.status === STATUS_PITCH_TIME_ACTIVE
                          )?.price ||
                          0}{" "}
                        VND
                      </h5>
                    </Link>
                    <div className="d-flex justify-content-between">
                      <p>Address : {item.address}</p>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="d-flex align-items-center w-100">
                        <p className="text-muted mb-0 me-2">Khung giờ:</p>
                        <select
                          className="form-select"
                          onChange={(e) => {
                            const selectedIndex = e.target.selectedIndex;
                            const selectedTime = item.times[selectedIndex];
                            handlePriceChange(item.id, selectedTime.price);
                          }}
                          style={{ width: "60%" }}
                        >
                          {item.times.map((time, index) => (
                            <option
                              key={index}
                              value={index}
                              disabled={
                                time.status !== STATUS_PITCH_TIME_ACTIVE
                              }
                            >
                              {time.startTime} - {time.endTime}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Dialog
        header="Tìm kiếm nâng cao"
        visible={visible}
        style={{ width: "40vw", zIndex: 1000 }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="row justify-content-center align-items-center mb-3">
          <div className="col-5">
            <label className="mx-3">Select pitch type:</label>
          </div>
          <div className="col-7">
            <Dropdown
              value={search.pitchType}
              onChange={(e) =>
                setSearch({
                  ...search,
                  pitchType: e.target.value,
                  timer: Date.now(),
                })
              }
              defaultValue={0}
              options={listPitchType}
              style={{ width: "14rem" }}
              optionLabel="name"
              placeholder="Select a pitch type"
              className="w-full md:w-14rem"
            />
          </div>
        </div>
        <div className="row justify-content-center align-items-center mb-3">
          <div className="col-5">
            <label className="mx-3">Select time slot: </label>
          </div>
          <div className="col-7">
            <Dropdown
              value={search.timeSlot}
              onChange={(e) => {
                setSearch({
                  ...search,
                  timeSlot: e.target.value,
                  timer: Date.now(),
                });
              }}
              style={{ width: "14rem" }}
              defaultValue={0}
              options={formattedTimeSlots}
              optionLabel="label"
              placeholder="Select a time slot"
              className="w-full md:w-14rem"
            />
          </div>
        </div>
        <div className="row justify-content-center align-items-center mb-3">
          <div className="col-5">
            <label className="mx-3">Select sort by: </label>
          </div>
          <div className="col-7">
            <Dropdown
              value={search.sortBy}
              onChange={(e) => {
                setSearch({
                  ...search,
                  sortBy: e.target.value,
                  timer: Date.now(),
                });
              }}
              style={{ width: "14rem" }}
              defaultValue={0}
              options={["p.id", "pt_time.price", "p.create_at"]}
              placeholder="Select sort by"
              className="w-full md:w-14rem"
            />
          </div>
        </div>
        <div className="row justify-content-center align-items-center mb-3">
          <div className="col-5">
            <label className="mx-3">Select sort by: </label>
          </div>
          <div className="col-7">
            <Dropdown
              value={search.sortOrder}
              onChange={(e) => {
                setSearch({
                  ...search,
                  sortOrder: e.target.value,
                  timer: Date.now(),
                });
              }}
              style={{ width: "14rem" }}
              defaultValue={0}
              options={["asc", "desc"]}
              placeholder="Select sort order"
              className="w-full md:w-14rem"
            />
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSearch({
              ...search,
              pitchType: { id: 0},
              timeSlot: {id: 0},
              sortBy: "p.id",
              timer: Date.now(),
            });
          }}
        >
          Clear All
        </button>
      </Dialog>
    </section>
  );
}
