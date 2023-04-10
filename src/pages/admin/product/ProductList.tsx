import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, message, Row, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IProduct, ICategory } from "../../../types/product";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import SearchBox from "./SearchBox";
import {
  formatCurrencyVND,
  formatDate,
} from "../../../function_global/products";
const { confirm } = Modal;

interface IProps {
  getProduct: (paginite: any) => any;
  remove: (id: string) => any;
  getCategory: () => any;
}

const ProductList = (props: IProps) => {
  const navigate = useNavigate();
  const [checkRong, setCheckRong] = useState<any>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await props.getProduct(null);
        setCheckRong(res.data);
        setProducts(res.data.docs);
        setCategories((await props.getCategory()).data);
      } catch (error) {
        console.log(error);
      }
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
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: "calc(100% / 7)",
      render: (_: any, record: IProduct) => (
        <span
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
          }}
        >
          {record.name}
        </span>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (_: any, record: IProduct) => (
        <h4 style={{ color: "red" }}>{formatCurrencyVND(record.price)}</h4>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: IProduct) => (
        <div>
          <img
            style={{
              width: "calc( 697px / 14 )",
              height: "calc( 961px / 14 )",
            }}
            src={`${record.image}`}
            alt=""
          />
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "calc(100% / 4)",
      render: (_: any, record: IProduct) => (
        <span
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
          }}
        >
          {record.description}
        </span>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (_: any, record: IProduct) => (
        <div>
          {categories.map((item) =>
            item._id == record.categoryId ? item.name : ""
          )}
        </div>
      ),
    },
    {
      title: "Lịch sử hoạt động",
      dataIndex: "createAt",
      key: "createdAt",
      render: (_: any, record: IProduct) => (
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
      render: (_: any, record: IProduct) => (
        <div>
          <Button
            style={{
              color: "#2f54eb",
              border: "1px solid #2f54eb",
              marginRight: "5px",
            }}
            onClick={() => {
              navigate(`/admin/products/${record._id}/update`);
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
  if (products?.length == 0) {
    return <div>Loadding ... </div>;
  }
  const showDeleteConfirm = (product: IProduct) => {
    confirm({
      title: "Bạn có chắc chắn xoá sản phẩm này không?",
      icon: <ExclamationCircleOutlined />,
      content: `Sản phẩm: ${product.name}`,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      onOk() {
        const id = product._id;
        (async () => {
          try {
            const response = await props.remove(id);
            setProducts(products?.filter((p) => p._id !== product._id));
            const { data } = await props.getProduct(null);
            setProducts(data.docs);
            message.success(response.data.message);
          } catch (error) {}
        })();
      },
    });
  };
  const handleSearch = async (value: string) => {
    const { data }: { data: any } = await props.getProduct(null);
    // --
    function searchKeyword(keyword: string, array: any) {
      const result = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i].name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          result.push(array[i]);
        }
      }
      return result;
    }
    const filteredData = searchKeyword(value, data.docs);
    // --
    // const filteredData = await data?.filter((p) => p.name == value);
    if (filteredData.length > 0) {
      // console.log("Tìm thấy", filteredData);
      setProducts(filteredData);
    } else {
      await setProducts(data.docs);
      message.warning("Không tìm thấy sản phẩm");
      // console.log("Không tìm thấy", data);
    }
  };
  // console.log(typeof products);
  return (
    <section>
      <Link to="/admin/products/add">
        <Button style={{ backgroundColor: "#1677ff", color: "white" }}>
          Thêm sản phẩm
        </Button>
      </Link>
      <Link to="/admin/products/category">
        <Button style={{ backgroundColor: "#fa8c16", color: "white" }}>
          Quản lý danh mục
        </Button>
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
          Danh sách sản phẩm
        </h3>
        {checkRong.message == "Không có sản phẩm nào" ? (
          "Danh sách trống quá"
        ) : (
          <Table columns={columns} dataSource={products} rowKey="_id" />
        )}
      </div>
    </section>
  );
};

export default ProductList;
