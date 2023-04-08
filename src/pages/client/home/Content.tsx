import { Button, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../../../css/client/Content.css";
const Content = () => {
  return (
    <div style={{ position: "relative" }}>
      <Row
        style={{
          height: "calc(78vh - 74px)",
          minHeight: "440px",
          paddingBottom: "2px",
        }}
      >
        <Col
          md={24}
          className="wrapper_hover "
          style={{ backgroundColor: "black" }}
        >
          <div
            className="flex_center"
            style={{
              backgroundImage:
                "url(https://staticpages.mngbcn.com/homes/images/ss23/he/marzo/landing_he_lino_0323.jpg?imwidth=1903&imdensity=1)",

              height: "100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 0",
              backgroundSize: "cover",
              cursor: "pointer",
            }}
          >
            <div>
              <h1
                style={{
                  color: "white",
                  fontSize: "4rem",
                  letterSpacing: "3px",
                  fontWeight: "500",
                }}
              >
                LINEN PERFECTION
              </h1>
              <Link
                to={"/products/men"}
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bottom: "0",
                }}
              >
                <Button
                  className="flex_center"
                  style={{
                    backgroundColor: "white",
                    padding: "20px 40px",
                    borderRadius: "0 !important",
                  }}
                >
                  <span style={{ fontSize: "14px", padding: 0, margin: 0 }}>
                    Khám phá
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row
        style={{
          minHeight: "calc(100vh - 148px)",
          backgroundColor: "black",
        }}
      >
        <Col
          className="wrapper_hover"
          md={16}
          style={{
            position: "relative",
            backgroundColor: "black",
          }}
        >
          <Link to={"/products/men"}>
            <div
              style={{
                backgroundColor: "black",
                backgroundImage:
                  "url(https://staticpages.mngbcn.com/homes/images/ss23/he/marzo/he_landing_nn_2703.jpg?imwidth=1268&imdensity=1&impolicy=set_23)",
                position: "absolute",
                top: "0",
                width: "99.8%",
                height: "100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 0",
                backgroundSize: "cover",
                cursor: "pointer",
              }}
            >
              <button
                style={{
                  color: "white",
                  backgroundColor: "#005df300",
                  border: "none",
                  position: "absolute",
                  bottom: "0",
                  margin: "50px 50px",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <h1 style={{ fontSize: "2rem", margin: "10px 0" }}>Mới nhất</h1>
                <h6
                  style={{
                    width: "100px",
                    fontSize: ".8rem",
                    borderBottom: "1px solid white",
                  }}
                >
                  Khám phá thêm
                </h6>
              </button>
            </div>
          </Link>
          <div
            style={{
              position: "absolute",
              width: "0.2%",
              right: "0",
              minHeight: "100%",
              backgroundColor: "white",
            }}
          ></div>
        </Col>

        <Col
          className="wrapper_hover"
          md={8}
          style={{
            position: "relative",
            backgroundColor: "black",
          }}
        >
          <Link to={"/products/men/shirt"}>
            <div
              style={{
                backgroundImage:
                  "url(https://staticpages.mngbcn.com/homes/images/ss23/he/abril/he_landing_camisas_0304.jpg?imwidth=633&imdensity=1&impolicy=set_13)",
                position: "absolute",
                top: "0",
                width: "100%",
                height: "100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 0",
                backgroundSize: "cover",
              }}
            >
              <button
                style={{
                  color: "white",
                  backgroundColor: "#005df300",
                  border: "none",
                  position: "absolute",
                  bottom: "0",
                  margin: "50px 50px",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <h1 style={{ fontSize: "2rem", margin: "10px 0" }}>Áo </h1>
                <h6
                  style={{
                    width: "100px",
                    fontSize: ".8rem",
                    borderBottom: "1px solid white",
                  }}
                >
                  Khám phá thêm
                </h6>
              </button>
            </div>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Content;
