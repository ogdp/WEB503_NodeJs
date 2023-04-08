import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, message, Row, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  CheckCircleTwoTone,
  HeartTwoTone,
  SmileTwoTone,
} from "@ant-design/icons";
import { formatDate } from "../../../function_global/products";
import { IUser } from "../../../types/users";
import SearchBox from "../product/SearchBox";
const { confirm } = Modal;

interface IProps {
  getAllUser: () => any;
  removeUser: (_id: string) => any;
}

const UserList = (props: IProps) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>();
  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: IUser[] } = await props.getAllUser();
        setUsers(data);
      } catch (error) {}
    })();
  }, []);
  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      width: "calc(100% / 7)",
      render: (_: any, record: IUser) => (
        <span
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            fontWeight: "600",
          }}
        >
          {record.name}
        </span>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "avatar",
      key: "avatar",
      render: (_: any, record: IUser) => (
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
          }}
        >
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
            }}
            src={`${record.avatar}`}
            alt=""
          />
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "calc(100% / 4)",
      render: (_: any, record: IUser) => (
        <span
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
          }}
        >
          {record.email}
        </span>
      ),
    },
    {
      title: "Loại tài khoản",
      dataIndex: "role",
      key: "role",
      render: (_: any, record: IUser) =>
        record.role === "admin" ? (
          <div>
            Quản trị viên{" "}
            <span
              style={{ margin: "0 5px" }}
              role="img"
              aria-label="check-circle"
              className="anticon anticon-check-circle"
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="check-circle"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                  fill="#52c41a"
                ></path>
                <path
                  d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm193.4 225.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.3 0 19.9 5 25.9 13.3l71.2 98.8 157.2-218c6-8.4 15.7-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.4 12.7z"
                  fill="#f6ffed"
                ></path>
                <path
                  d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
                  fill="#52c41a"
                ></path>
              </svg>
            </span>
          </div>
        ) : (
          "Dân đen"
        ),
    },
    {
      title: "Lịch sử hoạt động",
      dataIndex: "createAt",
      key: "createdAt",
      render: (_: any, record: IUser) => (
        <div style={{ color: "#666" }}>
          <h5 style={{ margin: "0", padding: "0" }}>Thời gian tạo</h5>
          <h5 style={{ margin: "0", padding: "0" }}>
            {formatDate(record.createdAt)}
          </h5>
          <h5 style={{ margin: "0", padding: "0" }}>Cập nhật gần nhất</h5>
          <h5 style={{ margin: "0", padding: "0" }}>
            {formatDate(record.updatedAt)}
          </h5>
        </div>
      ),
    },
    {
      title: "Tuỳ chọn",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: IUser) => (
        <div>
          <Button
            style={{
              color: "#2f54eb",
              border: "1px solid #2f54eb",
              marginRight: "5px",
            }}
            onClick={() => {
              navigate(`/admin/users/${record._id}/update`);
            }}
          >
            Cập nhật
          </Button>

          <Button
            onClick={async () => {
              confirm({
                title: "Bạn có chắc chắn xoá tài khoản này không?",
                icon: <ExclamationCircleOutlined />,
                content: `Tài khoản: ${record.name}`,
                okText: "Xoá",
                okType: "danger",
                cancelText: "Huỷ",
                onOk() {
                  const id = record._id;
                  (async () => {
                    try {
                      const response = await props.removeUser(id);
                      setUsers(users?.filter((p) => p._id !== record._id));
                      const { data }: { data: IUser[] } =
                        await props.getAllUser();
                      setUsers(data);
                      message.success(response.data.message);
                    } catch (error) {}
                  })();
                },
              });
            }}
            danger
          >
            Xoá
          </Button>
        </div>
      ),
    },
  ];
  if (users?.length == 0) {
    return <div>Loadding ... </div>;
  }
  const handleSearch = async (value: string) => {
    const { data }: { data: IUser[] } = await props.getAllUser();
    function searchKeyword(keyword: string, array: any) {
      const result = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i].name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          result.push(array[i]);
        }
      }
      return result;
    }
    const filteredData: any = searchKeyword(value, data);
    if (filteredData.length > 0) {
      setUsers(filteredData);
    } else {
      message.warning("Không tìm thấy tài khoản");
      await setUsers(data);
    }
  };
  return (
    <section>
      <Link to="/admin/products/add">
        <Button style={{ backgroundColor: "#1677ff", color: "white" }}>
          Thêm người dùng
        </Button>
      </Link>
      <Link to="/admin/products/category">
        {/* <Button style={{ backgroundColor: "#fa8c16", color: "white" }}>
          Quản lý danh mục
        </Button> */}
      </Link>
      <div>
        <Row>
          <Col md={12}></Col>
          <Col md={12} style={{ padding: "0 10%" }}>
            <SearchBox onSearch={handleSearch} />
          </Col>
        </Row>
      </div>
      <div>
        <h3
          style={{ textAlign: "center", fontSize: "29px", fontWeight: "500" }}
        >
          Danh sách người dùng
        </h3>
        <Table columns={columns} dataSource={users} rowKey="_id" />
      </div>
    </section>
  );
};
export default UserList;
