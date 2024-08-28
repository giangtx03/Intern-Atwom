import { useEffect, useRef, useState } from "react";
import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { TokenService } from "../../../service/TokenService";
import { decodeToken } from "react-jwt";
import { DecodedToken, UserDetails } from "../../../model/User";
import { UserService } from "../../../service/UserService";
import { useAppDispatch } from "../../../store/hooks";
import { login, logout } from "../../../reduces/UserSlice";
import { useSelector } from "react-redux";
import { ROLE_ADMIN } from "../../../constant/constant";
import { Button } from "primereact/button";
import defaultAvatar from "../../../../assets/image/defaultAvatar.jpg";

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
  const dispatch = useAppDispatch();

  const isAuthenticated = useSelector(
    (state: any) => state.user.isAuthenticated
  );
  const [user, setUser] = useState<UserDetails | null>(null);
  const userDetail = useSelector((state: any) => state.user.userDetail);

  useEffect(() => {
    const decode = decodeToken<DecodedToken>(
      TokenService.getInstance().getToken()
    );
    if (decode) {
      UserService.getInstance()
        .getUserDetails(decode.user_id)
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(login(response.data.data));
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(logout());
          navigate("/login");
        });
    }
  }, [TokenService.getInstance().getToken()]);

  useEffect(() => {
    setUser(userDetail);
  }, [userDetail]) 

  const menu = useRef<Menu>(null);

  const items: MenuItem[] = [
    {
      label: "Trang chủ",
      icon: "pi pi-home",
      command: () => navigate("/home"),
    },
    {
      label: "Sân bóng",
      icon: "pi pi-list",
      command: () => navigate("/pitch"),
    },
    ...(isAuthenticated
      ? [
          {
            label: "Lịch sử đặt sân",
            icon: "pi pi-star",
            command: () => navigate("/history"),
          },
          ...(user?.role === ROLE_ADMIN
            ? [
                {
                  label: "admin",
                  icon: "pi pi-lock",
                  command: () => navigate("/admin"),
                },
              ]
            : []),
        ]
      : []),
  ];

  const userMenuItems = [
    {
      label: "Trang cá nhân",
      icon: "pi pi-user",
      command: () => navigate("/user/profile"),
    },
    // {
    //   label: "Cài đặt",
    //   icon: "pi pi-cog",
    //   command: () => {},
    // },
    {
      label: "Đăng xuất",
      icon: "pi pi-sign-out",
      command: () => {
        dispatch(logout());
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
      {isAuthenticated && user ? (
        <div className="d-flex align-items-center">
          <Avatar
            image={
              user.avatar
                ? process.env.REACT_APP_API_URL + `/image/${user.avatar}`
                : undefined
            }
            icon={!user.avatar || user.avatar.length === 0 ? "pi pi-user" : undefined}
            shape="circle"
            className="cursor-pointer mx-2"
            onClick={(e) => menu.current?.toggle(e)}
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultAvatar;
            }}
          />
          <p className="m-0 font-semibold">{user.fullname}</p>
          <Menu
            model={userMenuItems}
            style={{ width: "14rem" }}
            popup
            baseZIndex={1000}
            ref={menu}
          />
        </div>
      ) : (
        <Button
          onClick={() => {
            navigate("/login");
          }}
        >
          Đăng nhập
        </Button>
      )}
    </div>
  );

  return (
    <div className="card rounded-0">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
