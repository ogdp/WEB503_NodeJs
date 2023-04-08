import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { ICProduct, ICategory, IProduct } from "../../../types/product";
import { useParams } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import "../../../css/client/Product.css";
import { formatCurrencyVND } from "../../../function_global/products";
interface IProps {
  getOneProduct: (id: string) => any;
  getAllCategory: () => any;
}
const ProductDetails = (props: IProps) => {
  const { id } = useParams();
  const [product, setProduct] = useState<ICProduct>();
  const [category, setCategory] = useState<ICategory[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await props.getOneProduct(String(id));
        setProduct(data);
        setCategory((await props.getAllCategory()).data);
      } catch (error) {}
    })();
  }, []);
  if (typeof product !== "object") {
    return <div>Loading ...</div>;
  }
  return (
    <section>
      <Row>
        <Col md={16}>
          <div style={{ minHeight: "calc((35vw - 60px) / 0.715)" }}>
            <Row>
              <Col md={12}>
                <div style={{ padding: "0 2px" }}>
                  <img width="100%" src={product.image} alt="" />
                </div>
              </Col>
              <Col md={12}>
                <div style={{ padding: "0 2px" }}>
                  <img width="100%" src={product.image} alt="" />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={8}>
          <div
            style={{
              padding: "56px",
              minWidth: "456px",
              backgroundColor: "white",
            }}
          >
            <h6
              style={{
                fontSize: "12px",
                color: "#666",
                textTransform: "uppercase",
              }}
            >
              #{" "}
              {category?.map((item) =>
                item._id == product.categoryId?._id ? item.name : ""
              )}
            </h6>
            <div style={{ textAlign: "right", color: "#666" }}>
              Previous / Next
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px 0",
              }}
            >
              <div>
                <h4 style={{ fontSize: "20px", color: "#121314" }}>
                  {product.name}
                </h4>
                <h6
                  style={{
                    fontSize: "11px",
                    color: "#666",
                    textTransform: "uppercase",
                  }}
                >
                  REF : 87139878
                </h6>
              </div>
              <h5 style={{ fontSize: "20.5px", color: "red" }}>
                {formatCurrencyVND(product.price)}
              </h5>
            </div>
            <div style={{ padding: "20px 0" }}>
              <h6 style={{ textTransform: "uppercase", fontSize: "13px" }}>
                Chọn kích cỡ
              </h6>
              <hr />
              <div className="detailsize" style={{ width: "100%" }}>
                <div
                  data-id="S"
                  style={{
                    width: "100%",
                    padding: "10px 10px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  S
                </div>
                <div
                  data-id="M"
                  style={{
                    width: "100%",
                    padding: "10px 10px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  M
                </div>
                <div
                  data-id="L"
                  style={{
                    width: "100%",
                    padding: "10px 10px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  L
                </div>
                <div
                  data-id="XL"
                  style={{
                    width: "100%",
                    padding: "10px 10px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  XL
                </div>
                <div
                  data-id="XXL"
                  style={{
                    width: "100%",
                    padding: "10px 10px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  XXL
                </div>
              </div>
              <hr />
              <div>
                <Button
                  className="ant-btn"
                  style={{ height: "50px", width: "100%" }}
                >
                  <HeartOutlined />
                  <span style={{ fontWeight: 500 }}>Thêm vào giỏ hàng</span>
                </Button>
              </div>
            </div>

            <div>
              <span style={{ fontWeight: "600" }}>Mô tả : </span>
              <p style={{ paddingTop: "5px" }}>
                <span style={{ paddingLeft: "15px" }}></span>
                {product.description}
              </p>
            </div>
            <div>
              <span style={{ fontWeight: "600" }}>Lời cam kết : </span>
              <p style={{ paddingTop: "5px" }}>
                <span style={{ paddingLeft: "15px" }}></span>
                Chúng tôi cam kết cung cấp cho khách hàng những sản phẩm áo quần
                chất lượng tốt nhất với giá cả hợp lý. Chúng tôi luôn đưa ra sự
                lựa chọn đa dạng về kiểu dáng, màu sắc và chất liệu để khách
                hàng có thể dễ dàng tìm thấy sản phẩm phù hợp với nhu cầu của
                mình. Chúng tôi cũng cam kết đảm bảo chất lượng và độ bền của
                sản phẩm, cùng với dịch vụ hỗ trợ khách hàng chuyên nghiệp và
                nhiệt tình. Với sự cam kết này, chúng tôi hy vọng được đồng hành
                và phục vụ quý khách hàng trong thời gian tới.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default ProductDetails;
