import { stat } from "fs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { decodeToken } from "react-jwt";
import { DecodedToken, UserDetails } from "../../model/User";
import { TokenService } from "../../service/TokenService";
import { UserService } from "../../service/UserService";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const decode = decodeToken<DecodedToken>(
    TokenService.getInstance().getToken()
  );

  const [user, setUser] = useState<UserDetails>();

  useEffect(() => {
    if (decode) {
      UserService.getInstance()
        .getUserDetails(decode.user_id)
        .then((response) => {
          if (response.data.status === 200) {
            setUser(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
          TokenService.getInstance().removeToken();
          navigate("/login");
        });
    }
  }, [decode]);

  return (
    <div>
      <h3>{user?.id}</h3>
      <h3>{user?.email}</h3>
      <h3>{user?.fullname}</h3>
      <div>
        <img
          src={`http://localhost:8080/public/api/v1/image/${user?.avatar}`}
          style={{
            width: "200px",
            height: "150px",
            objectFit: "cover",
          }}
          alt=""
          className="rounded"
        />
      </div>
      <h3>{user?.phoneNumber}</h3>
      <h3>{user?.address}</h3>
      <h3>{user?.role}</h3>
    </div>
  );
}
