import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../../types/product";
import { formatCurrencyVND } from "../../../function_global/products";
import "../../../css/client/Product.css";
interface IProps {
  product: IProduct;
  key: string;
}
const Card = (props: IProps) => {
  return (
    <div style={{ width: "49%" }}>
      <Link
        to={`/products/${props.product._id}/details`}
        style={{ color: "black" }}
      >
        <div
          style={{
            minHeight: "calc((((((100vw) * 70) / 100) / 2) - 0px)/.715)",
          }}
        >
          <div style={{ width: "100%", minHeight: "100%" }}>
            <div
              style={{
                height: "auto",
                width: "100%",
              }}
            >
              <div className="ctnCardHov">
                <img width={"100%"} src={props.product.image} />
              </div>
              <div
                style={{
                  padding: "17px 7px",
                  paddingBottom: "50px",
                  color: "rgb(101 101 101)",
                }}
              >
                <p style={{ margin: "0 0", padding: "1px 0" }}>
                  {props.product.name}
                </p>
                <p style={{ margin: "0 0", padding: "1px 0" }}>
                  {formatCurrencyVND(props.product.price)}
                </p>
                <p style={{ margin: "0 0", padding: "1px 0" }}>Màu sắc</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
