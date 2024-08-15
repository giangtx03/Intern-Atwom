import React, { useEffect, useRef, useState } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Link, useNavigate } from "react-router-dom";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { TokenService } from "../../../service/TokenService";
import { isExpired, decodeToken } from "react-jwt";
import { DecodedToken, UserDetails } from "../../../model/User";
import { UserService } from "../../../service/UserService";
import { error } from "console";

interface MenuItem {
  label: string;
  icon: string;
  link?: string;
  badge?: string;
  shortcut?: string;
  command?: () => void;
}

export default function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserDetails | null>(null);

  useEffect(() => {
    const decode = decodeToken<DecodedToken>(
      TokenService.getInstance().getToken()
    );
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
  }, [navigate]);

  const menu = useRef<Menu>(null);

  const items: MenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "History",
      icon: "pi pi-star",
      command: () => navigate("/history"),
    },
    {
      label: "admin",
      icon: "pi pi-lock",
      command: () => navigate("/admin"),
    },
  ];

  const userMenuItems = [
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => navigate("/profile"),
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      command: () => {
        console.log(decodeToken(TokenService.getInstance().getToken()));
      },
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        TokenService.getInstance().removeToken();
        setUser(null);
        navigate("/login");
      },
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      {user ? (
        <>
          <Avatar
            image={`http://localhost:8080/public/api/v1/image/${user?.avatar}`}
            shape="circle"
            className="cursor-pointer"
            onClick={(e) => menu.current?.toggle(e)}
          />
          <p className="m-0 font-semibold">{user.fullname}</p>
          <Menu model={userMenuItems} popup ref={menu} />
        </>
      ) : (
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      )}
    </div>
  );

  return (
    <div className="card rounded-0">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
