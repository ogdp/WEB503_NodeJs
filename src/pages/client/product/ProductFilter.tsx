import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ICategory } from "../../../types/product";
import { getAllCategory } from "../../../api/product";
import { FilterOutlined } from "@ant-design/icons";
import "../../../css/client/Product.css";
import { Button, Col, Row } from "antd";
interface IProps {
  onChange: (id: string) => any;
}

function ProductFilter(props: IProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [tabFilter, setTabFilter] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllCategory();
        setCategories(data);
      } catch (error) {}
    })();
  }, []);
  if (!categories) {
    return null;
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
        <div style={{ padding: "0 35px" }}>2 | 4</div>
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
