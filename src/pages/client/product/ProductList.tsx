import { FilterOutlined } from "@ant-design/icons";
import { Col, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import CardProduct from "./Card";
import { IProduct } from "../../../types/product";
import ProductFilter from "./ProductFilter";
interface IProps {
  getAllProduct: () => any;
}
const ProductList = (props: IProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<IProduct[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await props.getAllProduct();
      setProducts(data);
      setFilter(data);
    })();
  }, []);

  function onChange(id: string) {
    (async () => {
      try {
        const { data } = await props.getAllProduct();
        setFilter(data);
        if (id == "0") {
          setProducts(data);
          message.success("Tất cả sản phẩm");
          return;
        }
        if (filter.filter((item) => item.categoryId == id).length === 0) {
          message.error("Danh mục sản phẩm rỗng");
          return;
        }
        message.success("Lọc sản phẩm thành công");
        setProducts(filter.filter((item) => item.categoryId == id));
      } catch (error) {
        console.log(error);
      }
    })();
  }
  if (products.length == 0) {
    return <div>Loadding</div>;
  }
  return (
    <section>
      <div
        style={{
          position: "sticky",
          top: "50px",
          left: "0",
          zIndex: "100",
        }}
      >
        <span
          style={{
            cursor: "pointer",
            fontSize: "14px",
            color: "#545454",
            margin: "3px 50px",
          }}
        >
          <ProductFilter onChange={onChange} />
        </span>
      </div>
      <div style={{ width: "100%", minHeight: "100vh" }}>
        <Row
          style={{
            width: "70%",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "2px",
          }}
        >
          {products.length > 0
            ? products?.map((item) => (
                <CardProduct key={item._id} product={item} />
              ))
            : "Không có sản phẩm nào"}
        </Row>
      </div>
    </section>
  );
};

export default ProductList;
