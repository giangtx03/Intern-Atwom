import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PitchService } from "../../service/PitchService";
import { useAppDispatch } from "../../store/hooks";
import { showOrHindSpinner } from "../../reduces/SpinnerSlice";
import { PitchResponse } from "../../model/PitchModel";
import { formatDate, formatTime } from "../../utils/FormatDate";
import { Carousel } from "primereact/carousel";
import { STATUS_PITCH_TIME_ACTIVE } from "../../constant/constant";
import CommentDisplay from "../comment";
import BookingDialog from "../BookingDialog";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { FaExclamationCircle } from "react-icons/fa";
import defaultSanBong from "../../../assets/image/defaultSanBong.jpeg";
import { Rating } from "primereact/rating";

export default function PitchDetail() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: any) => state.user.isAuthenticated
  );

  const { id } = useParams<{ id: string }>();

  const [pitch, setPitch] = useState<PitchResponse>();
  const [price, setPrice] = useState(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [options, setOptions] = useState<
    { label: string; value: number; isReservation: boolean }[]
  >([]);
  const [reload, setReload] = useState<number>();

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    if (id) {
      dispatch(showOrHindSpinner(true));
      setTimeout(() => {
        PitchService.getInstance()
          .getPitchById(Number.parseInt(id))
          .then((response: any) => {
            if (response.data.status === 200) {
              setPitch(response.data.data);
              dispatch(showOrHindSpinner(false));
            }
          })
          .catch((error: any) => {
            console.log(error);
            dispatch(showOrHindSpinner(false));
            navigate("*");
          });
      }, 300);
    }
  }, [id, reload]);

  const imageTemplate = (image: any) => {
    return (
      <div className="carousel-item active">
        <img
          className="d-block w-100"
          src={process.env.REACT_APP_API_URL + `/image/${image.name}`}
          alt="Ảnh sân bóng"
          onError={(e) => {
            e.currentTarget.src = defaultSanBong;
          }}
          style={{ height: "380px", width: "500px", objectFit: "cover" }}
        />
      </div>
    );
  };

  useEffect(() => {
    if (pitch) {
      const newOptions = pitch.times.map((time, index) => ({
        label: `${formatTime(time.startTime.toString())} - ${formatTime(
          time.endTime.toString()
        )}`,
        value: index,
        isReservation: time.status !== STATUS_PITCH_TIME_ACTIVE,
      }));
      setOptions(newOptions);
      if (selectedTime === null) {
        setSelectedTime(0);
        setPrice(pitch.times[0]?.price ?? 0);
      }
    }
  }, [pitch?.times, selectedTime]);

  const handleChange = (e: any) => {
    if (pitch) {
      const selectedIndex = e.value;
      if (selectedIndex !== selectedTime && selectedIndex !== null) {
        setSelectedTime(selectedIndex);
        setPrice(pitch.times[selectedIndex]?.price ?? 0);
      }
    }
  };

  return pitch ? (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                <h4 className="mb-sm-0 p-3">Chi tiết sân bóng</h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row gx-lg-5">
                    <div className="col-xl-4 col-md-8 mx-auto">
                      <div className="product-img-slider sticky-side-div carousel-inner">
                        {pitch.images && pitch.images.length > 0 ? (
                          <Carousel
                            value={pitch.images}
                            numScroll={1}
                            numVisible={1}
                            itemTemplate={imageTemplate}
                          />
                        ) : (
                          <div className="carousel-item active">
                            <img
                              className="d-block w-100"
                              src={defaultSanBong}
                              alt="Ảnh sân bóng"
                              onError={(e) => {
                                e.currentTarget.src = defaultSanBong;
                              }}
                            />
                          </div>
                        )}

                        {/* end swiper nav slide */}
                      </div>
                    </div>
                    {/* end col */}
                    <div className="col-xl-8">
                      <div className="mt-xl-0 mt-5">
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <h4>{pitch.name}</h4>
                          </div>
                          <Button
                            onClick={(e) => {
                              if (isAuthenticated) {
                                setVisible(true);
                              } else {
                                handleRedirect("/login");
                              }
                            }}
                          >
                            Đặt sân ngay
                          </Button>
                          <BookingDialog
                            visible={visible}
                            setVisible={setVisible}
                            pitch_id={pitch}
                          ></BookingDialog>
                        </div>
                        <div className="row mt-2 ">
                          <div className="col-12 d-flex align-items-center">
                            <h5 className="text-muted mb-0 me-3">
                              Giá theo khung giờ:
                            </h5>
                            <h5 className="mb-0 text-bg-light text-success">
                              {price === 0
                                ? pitch.times
                                    .find(
                                      (time) =>
                                        time.status === STATUS_PITCH_TIME_ACTIVE
                                    )
                                    ?.price.toLocaleString()
                                : price.toLocaleString()}{" "}
                              VND
                            </h5>
                          </div>
                          {/* end col */}
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="mt-4">
                              <h5 className="fs-14">Khung giờ:</h5>
                              <SelectButton
                                value={selectedTime}
                                onChange={handleChange}
                                options={options}
                                itemTemplate={(option: any) => (
                                  <div className="d-flex align-items-center">
                                    {option.isReservation ? (
                                      <span className="position-absolute top-0 end-0 bg-warning small">
                                        <FaExclamationCircle
                                          size={16}
                                          color="red"
                                        />
                                        <small className="text-danger">
                                          Đã đặt
                                        </small>
                                      </span>
                                    ) : (
                                      <></>
                                    )}
                                    {option.label}
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                        {/* end row */}
                        <div className="row mt-3 ">
                          <div className="col-12 d-flex align-items-center">
                            <h5 className="me-1 mb-0">Đánh giá: </h5>
                            <b
                              className="mb-0 me-3"
                              style={{ color: "#FFCC00" }}
                            >
                              {pitch.avg_star.toFixed(2)}/5
                            </b>
                          </div>
                        </div>
                        <div className="row product-content mt-5">
                          <h5 className="fs-14 mb-3">Mô tả sân bóng:</h5>
                          <div
                            className="tab-content border border-top-0 p-4"
                            id="nav-tabContent"
                          >
                            <div
                              className="tab-pane fade show active"
                              id="nav-speci"
                              role="tabpanel"
                              aria-labelledby="nav-speci-tab"
                            >
                              <div className="table-responsive">
                                <table className="table mb-0">
                                  <tbody>
                                    <tr>
                                      <th scope="row" style={{ width: 200 }}>
                                        Kiểu sân
                                      </th>
                                      <td>{pitch.pitch_type_name}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Địa chỉ</th>
                                      <td>{pitch.address}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Thời gian tạo</th>
                                      <td>{formatDate(pitch.create_at)}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Thời gian cập nhật</th>
                                      <td>{formatDate(pitch.update_at)}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end card body */}
                      </div>
                    </div>
                    {/* end col */}
                  </div>
                  {/* end row */}
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
              <CommentDisplay
                handleChange={() => {
                  setReload(Date.now());
                }}
                pitch_id={pitch}
              ></CommentDisplay>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* container-fluid */}
      </div>
    </div>
  ) : (
    <></>
  );
}
