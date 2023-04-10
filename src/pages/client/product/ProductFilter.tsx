import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ICategory } from "../../../types/product";
import { getAllCategory, getAllProduct } from "../../../api/product";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import "../../../css/client/Product.css";
import { Button, Col, Row } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
interface IProps {
  onChange: (id: string) => any;
  onChangePage: (id: number) => any;
}

function ProductFilter(props: IProps) {
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [tabFilter, setTabFilter] = useState(false);
  const [pageCount, setPageCount] = useState<any>();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllCategory();
        setCategories(data);
        const res = await getAllProduct(null);
        setPageCount(res.data);
        setCategories(data);
      } catch (error) {}
    })();
  }, [id]);
  if (!categories) {
    return null;
  }
  let totalPage: Number = 0;
  let presentPage: Number = id ? id : 1;
  if (pageCount !== undefined) {
    totalPage = Number(Math.floor(pageCount.totalDocs / 10) + 1);
  }
  // console.log("Mừng quá có dữ liệu rồi");
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ padding: "0 35px" }}
          onClick={() => setTabFilter(!tabFilter)}
        >
          <FilterOutlined /> Lọc sản phẩm
        </div>
        <div style={{ padding: "0 35px" }}>
          <span
            style={{ padding: "2px 5px", color: "#666" }}
            onClick={() => {
              if (!id) {
                navigate("/products/men/1");
              } else {
                presentPage = id - 1;
                presentPage =
                  presentPage == 0 ? Number(presentPage) + 1 : presentPage;
                props.onChangePage(Number(presentPage));
                navigate("/products/men/" + presentPage);
              }
            }}
          >
            <CaretLeftOutlined />
          </span>
          {id ? id : 1} / {Number(totalPage)}
          {id ? (
            <span
              style={{ padding: "2px 5px", color: "#666" }}
              onClick={() => {
                presentPage = id + 1;
                presentPage =
                  presentPage > totalPage
                    ? Number(presentPage) - 1
                    : presentPage;
                props.onChangePage(Number(presentPage));
                navigate("/products/men/" + presentPage);
                props.onChangePage(Number(presentPage));
              }}
            >
              <CaretRightOutlined />
            </span>
          ) : (
            <span
              style={{ padding: "2px 5px", color: "#666" }}
              onClick={() => {
                navigate("/products/men/2");
                props.onChangePage(Number(2));
              }}
            >
              <CaretRightOutlined />
            </span>
          )}
        </div>
      </div>
      <div
        className={`tabFilter${tabFilter ? " active" : ""}`}
        style={{ boxShadow: "0px 0.25em 0.25em rgba(67, 71, 85, 0.27)" }}
      >
        <Row style={{ padding: "0 35px" }}>
          <Col md={6}>
            {" "}
            <h3 style={{ textTransform: "uppercase" }}>Danh sách danh mục</h3>
            <p
              className="sectionHover"
              style={{
                margin: "0",
                fontSize: "12px",
                borderBottom: "1px solid #0000003b",
                textTransform: "uppercase",
                fontWeight: "400",
                padding: "4px 0",
              }}
              onClick={() => props.onChange(String(0))}
            >
              Tất cả sản phẩm
            </p>
            {categories.map((item) => (
              <p
                className="sectionHover"
                style={{
                  margin: "0",
                  fontSize: "12px",
                  borderBottom: "1px solid #0000003b",
                  textTransform: "uppercase",
                  fontWeight: "400",
                  padding: "4px 0",
                }}
                key={item._id}
                data-id={item._id}
                onClick={() => props.onChange(item._id)}
              >
                {item.name}
              </p>
            ))}
          </Col>
          <Col md={6}></Col>
          <Col md={6}></Col>
          <Button
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              margin: "30px 30px",
            }}
            onClick={() => setTabFilter(!tabFilter)}
            danger
          >
            Đóng
          </Button>
        </Row>
      </div>
    </div>
  );
}

export default ProductFilter;
