import { FilterOutlined } from "@ant-design/icons";
import { Col, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import CardProduct from "./Card";
import { IProduct } from "../../../types/product";
import ProductFilter from "./ProductFilter";
import { useParams } from "react-router-dom";
interface IProps {
  getAllProduct: (paginite: { limit: number; page: number } | null) => any;
}
const ProductList = (props: IProps) => {
  const { id } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<IProduct[]>([]);
  useEffect(() => {
    (async () => {
      const check =
        id !== undefined
          ? { limit: Number(10), page: Number(id) }
          : { limit: Number(10), page: Number(1) };
      const { data } = await props.getAllProduct(check);
      const defaultDataPro = await props.getAllProduct(null);
      setProducts(data.docs);
      setFilter(defaultDataPro.data.docs);
    })();
  }, []);

  function onChange(id: string) {
    (async () => {
      try {
        const { data } = await props.getAllProduct(null);
        setFilter(data.docs);
        if (id == "0") {
          const { data } = await props.getAllProduct({
            limit: Number(10),
            page: Number(1),
          });
          setProducts(data.docs);
          message.success("Tất cả sản phẩm", 1.5);
          return;
        }
        if (filter.filter((item) => item.categoryId == id).length === 0) {
          message.error("Danh mục sản phẩm rỗng", 1.5);
          return;
        }
        message.success("Lọc sản phẩm thành công", 1.5);
        setProducts(filter.filter((item) => item.categoryId == id));
      } catch (error) {
        console.log(error);
      }
    })();
  }

  function onChangePage(id: number) {
    (async () => {
      try {
        const { data } = await props.getAllProduct({
          limit: Number(10),
          page: Number(id),
        });
        if (data.docs.length <= 0) {
          message.warning("Không tìm thấy trang", 1.5);
          return;
        }
        setProducts(data.docs);
        return;
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
          <ProductFilter onChange={onChange} onChangePage={onChangePage} />
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
