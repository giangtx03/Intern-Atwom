import React, { useEffect } from "react";
import { TokenService } from "../service/TokenService";
import { decodeToken, isExpired } from "react-jwt";
import { DecodedToken } from "../model/User";
import { useNavigate } from "react-router-dom";

export default function AuthGuard(props: any) {
  const navigate = useNavigate();
  const token = TokenService.getInstance().getToken();
  const decode = decodeToken<DecodedToken>(token);
  const isTokenExpired = isExpired(token);

  useEffect(() => {
    if (isTokenExpired || !decode || decode.user_id <= 0) {
      TokenService.getInstance().removeToken();
      navigate("/login");
    }
  }, [isTokenExpired, decode, navigate]);


  if (isTokenExpired || !decode || decode.user_id <= 0) {
    return null;
  }

  return <>{props.children}</>;
}
