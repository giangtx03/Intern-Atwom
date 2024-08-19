import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { showOrHindSpinner } from "../../reduces/SpinnerSlice";
import { PitchService } from "../../service/PitchService";
import { PitchResponse } from "../../model/PitchModel";
import { STATUS_PITCH_TIME_ACTIVE } from "../../constant/constant";
import defaultAvatar from '../../../assets/image/avatar.jpg';

export default function Pitch() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [list, setList] = useState<PitchResponse[]>();
  const [prices, setPrices] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    dispatch(showOrHindSpinner(true));
    setTimeout(() => {
      PitchService.getInstance()
        .getAllPitch()
        .then((response: any) => {
          if (response.data.status === 200) {
            setList(response.data.data.items);
            // console.log(response.data.data.items)
            dispatch(showOrHindSpinner(false));
          }
        })
        .catch((error: any) => {
          console.log(error);
          dispatch(showOrHindSpinner(false));
          navigate("/login");
        });
    }, 300);
  }, []);

  const handlePriceChange = (itemId: number, price: number) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [itemId]: price,
    }));
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
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
                        {prices[item.id] || item.times.find(time => time.status === STATUS_PITCH_TIME_ACTIVE)?.price || 0} VND
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
                            <option key={index} value={index} disabled={time.status !== STATUS_PITCH_TIME_ACTIVE}>
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
    </section>
  );
}
