import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Table, Modal, message, Row, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IProduct, ICategory } from "../../../types/product";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import SearchBox from "../product/SearchBox";

const { confirm } = Modal;

interface IProps {
  getAllCategory: () => any;
  getOneCategory: (id: string) => any;
  removeCategory: (id: string) => any;
  createCategory: (category: ICategory) => any;
}

const CategoryList = (props: IProps) => {
  const navigate = useNavigate();
  const [checkRong, setCheckRong] = useState<any>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    (async () => {
      try {
        setCategories((await props.getAllCategory()).data);
        setCheckRong((await props.getAllCategory()).data);
      } catch (error) {}
    })();
  }, [props]);
  const columns: ColumnsType<any> = [
    {
      title: "STT",
      key: "id",
      render: (item, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tuỳ chọn",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: ICategory) => (
        <div>
          <Button
            style={{
              color: "#2f54eb",
              border: "1px solid #2f54eb",
              marginRight: "5px",
            }}
            onClick={function () {
              navigate(`/admin/products/category/${record._id}/update`);
              location.reload();
            }}
          >
            Cập nhật
          </Button>
          <Button onClick={() => showDeleteConfirm(record)} danger>
            Xoá
          </Button>
        </div>
      ),
    },
  ];
  if (categories?.length == 0) {
    return <div>Loadding ... </div>;
  }
  const showDeleteConfirm = (category: ICategory) => {
    confirm({
      title: "Bạn có chắc chắn xoá danh mục này không?",
      icon: <ExclamationCircleOutlined />,
      content: `Danh mục: ${category.name}`,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      onOk() {
        const id = category._id;
        (async () => {
          await props.removeCategory(id);
          setCategories(categories.filter((c) => c._id !== category._id));
          const { data }: { data: ICategory[] } = await props.getAllCategory();
          setCategories(data);
          message.success("Xoá danh mục thành công");
        })();
      },
    });
  };

  const onFinish = (values: any) => {
    let count: number = 0;
    for (const category of categories) {
      if (category.name == values.name) {
        count++;
      }
    }
    if (count > 0) {
      message.error("Danh mục đã tồn tại");
    } else {
      (async () => {
        try {
          const res = await props.createCategory(values);
          await message.success("Thêm danh mục thành công");
          setCategories([...categories, values]);
        } catch (error) {}
      })();
    }
  };
  const getRowKey = (record: any) => record._id;
  const handleSearch = async (value: string) => {
    const { data }: { data: ICategory[] } = await props.getAllCategory();
    const filteredData = await data?.filter((p) => p.name == value);
    if (filteredData.length > 0) {
      // console.log("Tìm thấy", filteredData);
      setCategories(filteredData);
    } else {
      await setCategories(data);
      message.warning("Không tìm thấy mục");
      // console.log("Không tìm thấy", data);
    }
  };
  return (
    <section>
      <Link to="/admin/products">
        <Button style={{ backgroundColor: "#fa8c16", color: "white" }}>
          Quản lý sản phẩm
        </Button>
      </Link>
      <div>
        <h3
          style={{ textAlign: "center", fontSize: "29px", fontWeight: "500" }}
        >
          Danh sách danh mục
        </h3>
        <Row>
          <Col md={12}></Col>
          <Col md={12} style={{ padding: "0 10%" }}>
            <SearchBox onSearch={handleSearch} />
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{ paddingRight: "10%" }}>
            <Outlet context={[categories, setCategories]} />
          </Col>
          <Col md={12}>
            <Table
              columns={columns}
              dataSource={categories}
              rowKey={getRowKey}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default CategoryList;
