import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PitchService } from "../../service/PitchService";
import { useAppDispatch } from "../../store/hooks";
import { showOrHindSpinner } from "../../reduces/SpinnerSlice";
import { PitchResponse } from "../../model/PitchModel";
import { formatDate } from "../../utils/FormatDate";
import { Carousel } from "primereact/carousel";
import { STATUS_PITCH_TIME_ACTIVE } from "../../constant/constant";
import CommentDisplay from "../comment";
import BookingDialog from "../BookingDialog";
import { TokenService } from "../../service/TokenService";
import { decodeToken } from "react-jwt";
import { DecodedToken } from "../../model/User";

export default function PitchDetail() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [pitch, setPitch] = useState<PitchResponse>();
  const [price, setPrice] = useState(0);
  const [visible, setVisible] = useState<boolean>(false);

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  const user_id = decodeToken<DecodedToken>(
    TokenService.getInstance().getToken()
  )?.user_id;

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
            navigate("/not-permission");
          });
      }, 300);
    }
  }, [id]);

  const imageTemplate = (image: any) => {
    return (
      <div className="carousel-item active">
        <img
          className="d-block w-100"
          src={`http://localhost:8080/public/api/v1/image/${image.name}`}
          alt="Ảnh sân bóng"
        />
      </div>
    );
  };

  return pitch ? (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                <h4 className="mb-sm-0">Pitch Details</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Pitch Details</li>
                  </ol>
                </div>
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
                        <Carousel
                          value={pitch.images}
                          numScroll={1}
                          numVisible={1}
                          itemTemplate={imageTemplate}
                        />
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
                          <button
                            className="btn btn-success"
                            onClick={(e) => {
                              if (user_id) {
                                setVisible(true);
                              } else {
                                handleRedirect("/login");
                              }
                            }}
                          >
                            Đặt sân ngay
                          </button>
                          <BookingDialog
                            visible={visible}
                            setVisible={setVisible}
                            pitch_id={pitch}
                          ></BookingDialog>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-3 col-sm-6">
                            <div className="p-2 border border-dashed rounded">
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm me-2">
                                  <div className="avatar-title rounded bg-transparent text-success fs-24">
                                    <i className="ri-money-dollar-circle-fill" />
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <p className="text-muted mb-1">Price :</p>
                                  <h5 className="mb-0">
                                    {price === 0
                                      ? pitch.times.find(
                                          (time) =>
                                            time.status ===
                                            STATUS_PITCH_TIME_ACTIVE
                                        )?.price
                                      : price}{" "}
                                    VND
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end col */}
                        </div>
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="mt-4">
                              <h5 className="fs-14">Times :</h5>
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  const selectedIndex = e.target.selectedIndex;
                                  const selectedTime =
                                    pitch.times[selectedIndex];
                                  setPrice(selectedTime.price);
                                }}
                              >
                                {pitch.times.map((time, index) => (
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
                        {/* end row */}
                        <div className="product-content mt-5">
                          <h5 className="fs-14 mb-3">Pitch Description :</h5>
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
                                        Pitch Type
                                      </th>
                                      <td>{pitch.pitch_type_name}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Address</th>
                                      <td>{pitch.address}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Create At</th>
                                      <td>{formatDate(pitch.create_at)}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Update At</th>
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
              <CommentDisplay pitch_id={pitch}></CommentDisplay>
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
