import { Link } from "react-router-dom";
import { IUser } from "../../../types/users";
import { Avatar, Menu, message } from "antd";
import { useEffect, useState } from "react";
import {
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface IProps {
  user?: IUser[];
}

const HUserAcount = (props: IProps) => {
  const [user, setUser] = useState<IUser[]>();
  useEffect(() => {
    const u1: any = [];
    u1.push(props.user);
    setUser(u1);
  }, [props]);
  const menuItemsGuest = [
    {
      key: "men",
      icon: <LoginOutlined />,
      label: (
        <Link style={{ fontWeight: "500" }} to={"/auth"}>
          Đăng nhập
        </Link>
      ),
    },
  ];
  const menuItems = [
    {
      key: "men",
      icon: <UserOutlined />,
      label: (
        <Link style={{ fontWeight: "500" }} to={"/profile"}>
          Thông tin
        </Link>
      ),
    },
    {
      key: "women",
      icon: <SettingOutlined />,
      label: (
        <Link style={{ fontWeight: "500" }} to={"/profile/settings"}>
          Cài đặt
        </Link>
      ),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: (
        <span
          style={{ fontWeight: "500", margin: "0", padding: "0" }}
          onClick={async () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            await message.success("Đăng xuất thành công");
            location.reload();
          }}
        >
          Đăng xuất
        </span>
      ),
    },
  ];
  if (user && user[0] == undefined) {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: "3000",
          top: "0",
          right: "-48%",
          minWidth: "100%",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            margin: "10px auto",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(240, 240, 240)",
          }}
        >
          <Avatar size="default" icon={<UserOutlined />} />
        </div>
        <Menu
          style={{
            display: "flex",
            flexDirection: "column",
            border: "none",
          }}
          items={menuItemsGuest}
        />
      </div>
    );
  } else {
    let img: any;
    if (user) {
      img = user[0]?.avatar;
    }
    return (
      <div
        style={{
          position: "absolute",
          zIndex: "3000",
          top: "0",
          right: "-48%",
          minWidth: "100%",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            margin: "10px auto",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(240, 240, 240)",
          }}
        >
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
            }}
            src={img}
            alt=""
          />
        </div>
        <Menu
          style={{
            display: "flex",
            flexDirection: "column",
            border: "none",
          }}
          items={menuItems}
        />
      </div>
    );
  }
};

export default HUserAcount;
