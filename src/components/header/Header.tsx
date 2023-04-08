import React, { useEffect, useState } from "react";
import { Row, Col, Menu } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import HUserAcount from "../../pages/client/users/HUserAcount";
import { checkPermissions } from "../../api/auth";
import { getOneUser } from "../../api/user";
import { IUser } from "../../types/users";
const Header = () => {
  const [showChild, setShowChild] = useState<boolean>(false);
  const [user, setUser] = useState<IUser[]>();

  function handleClick() {
    setShowChild(!showChild);
  }
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await checkPermissions(String(token));
        if (!data.user) return;
        const { user } = data;
        const _id = user._id;
        if (_id) {
          try {
            const res = await getOneUser(String(_id));
            // console.log("user ", res.data);
            setUser(res.data);
            return;
          } catch (error: any) {
            // await message.error(error.response.data.message);
          }
        }
        return null;
      } catch (error: any) {
        // navigate("/");
        // // console.log(error.response);
        // await message.error("Bạn không đủ quyền");
      }
    })();
  }, []);
  const menuItemsLeft = [
    {
      key: "men",
      icon: null,
      label: (
        <Link style={{ fontWeight: "500" }} to={"/products/men"}>
          Men
        </Link>
      ),
    },
    {
      key: "women",
      icon: null,
      label: (
        <Link style={{ fontWeight: "500" }} to={"/products/women"}>
          Women
        </Link>
      ),
    },
    {
      key: "kids",
      icon: null,
      label: (
        <Link style={{ fontWeight: "500" }} to={"/products/kids"}>
          Kids
        </Link>
      ),
    },
  ];
  const menuItemsRight = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: (
        <Link to={"/"} style={{ fontWeight: "500" }}>
          Home
        </Link>
      ),
    },
    {
      key: "shop",
      icon: <ShoppingOutlined />,
      label: (
        <Link to={"/products"} style={{ fontWeight: "500" }}>
          Shop
        </Link>
      ),
    },
    {
      key: "account",
      icon: null,
      label: (
        <div onClick={handleClick} style={{ position: "relative" }}>
          <span style={{ paddingRight: "10px" }}>
            <UserOutlined />
          </span>
          Account{showChild && <HUserAcount user={user} />}
        </div>

        // <Link to={"/auth"} style={{ fontWeight: "500" }}>
        //   Account
        // </Link>
      ),
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "white",
        position: "sticky",
        top: "0",
        left: "0",
        zIndex: "91",
      }}
    >
      <Row style={{ padding: "10px 20px" }}>
        <Col span={8}>
          <Menu
            style={{ border: "none" }}
            mode="horizontal"
            items={menuItemsLeft}
          />
        </Col>
        <Col span={8}>
          <div className="logo" style={{ textAlign: "center", color: "white" }}>
            <Link style={{ fontWeight: "500" }} to={"/"}>
              <img
                height={"30px"}
                style={{ margin: "18px 0" }}
                src="https://i.imgur.com/bTDDGUd.png"
                alt=""
              />
            </Link>
          </div>
        </Col>
        <Col span={8}>
          <Menu
            style={{
              justifyContent: "flex-end",
              border: "none",
            }}
            mode="horizontal"
            items={menuItemsRight}
          />
        </Col>
      </Row>
    </section>
  );
};

export default Header;
