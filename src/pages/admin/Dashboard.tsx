import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SkinOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Layout, Menu, Row, message, theme } from "antd";
import { Link, useLocation } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import "../../css/admin/Dashboard.css";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { checkPermissions } from "../../api/auth";
import { getOneUser } from "../../api/user";
const { Header, Sider, Content } = Layout;
const DashBoard: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const PrivateRouter = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
      const res = await checkPermissions(String(token));
      const { _id } = res.data.user;
      if (_id) {
        try {
          const res = await getOneUser(_id);
          switch (res.data.role) {
            case "admin":
              break;
            case "member":
              navigate("/");
              await message.warning("Hãy đăng nhập bằng tài khoản admin");
              break;
            default:
              navigate("/");
              await message.success("Trang chủ");
              break;
          }
          return;
        } catch (error: any) {
          // await message.error(error.response.data.message);
        }
      }
      return null;
    } catch (error: any) {
      navigate("/");
      // console.log(error.response);
      await message.error("Bạn không đủ quyền");
    }
  };
  useEffect(() => {
    PrivateRouter();
  }, []);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" style={{ textAlign: "center", color: "white" }}>
          <Link to={"/admin"}>
            <img
              height={"30px"}
              style={{ margin: "18px 0" }}
              src="https://i.imgur.com/bTDDGUd.png"
              alt=""
            />
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Trang chủ",
              onClick: () => {
                navigate("/admin");
              },
            },
            {
              key: "2",
              icon: <SkinOutlined />,
              label: "Quản lý sản phẩm",
              onClick: () => {
                navigate("/admin/products");
              },
            },
            {
              key: "3",
              icon: <TeamOutlined />,
              label: "Quản lý thành viên",
              onClick: () => {
                navigate("/admin/users");
              },
            },
            {
              key: "4",
              icon: <ShoppingCartOutlined />,
              label: "Quản lý đơn hàng",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Row>
            <Col md={18}>
              <span style={{ fontSize: "22px", margin: " 0 25px" }}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
              </span>
            </Col>
            <Col
              md={6}
              className="control"
              style={{ textAlign: "right", paddingRight: "12px" }}
            >
              {/* <Avatar src="https://i.imgur.com/Jugp8su.jpeg"></Avatar> */}
              <Avatar size="default" icon={<UserOutlined />} />
              <span
                style={{
                  fontWeight: "500",
                  margin: "2px 10px 0px",
                  fontSize: "15px",
                }}
              >
                Le Quang Minh Duc ✓
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginBottom: "-5px",
                  }}
                  height={"18px"}
                  viewBox="0 0 448 512"
                >
                  <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                </svg>
              </span>
              <span className="iconSetting">
                <SettingOutlined
                  style={{ fontSize: "22px", marginBottom: "-30px" }}
                />
              </span>
              <span
                className="iconSetting"
                onClick={async () => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");

                  navigate("/");
                  // await location.reload();
                  message.success("Đăng xuất thành công", 1);
                  // navigate("/auth", { replace: true });
                  // location.reload();
                }}
              >
                <LogoutOutlined
                  style={{ fontSize: "22px", marginBottom: "-30px" }}
                />
              </span>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 180px)",
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ minHeight: "60px", textAlign: "center" }}>
          <span style={{ fontWeight: "600" }}>2023.Inc Le Quang Minh Duc</span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
