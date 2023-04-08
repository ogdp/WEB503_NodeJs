import React, { useEffect, useState } from "react";
import HeaderPage from "../../components/header/Header";
import CustomFooter from "../../components/footer/Footer";
import SigninPage from "./Signin";
import SignupPage from "./Signup";
import { TSignin, TSignup } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getOneUser } from "../../api/user";
import { checkPermissions } from "../../api/auth";
import { IUser } from "../../types/users";

type TProps = {
  Signin: (user: TSignin) => any;
  Signup: (user: TSignup) => any;
};

const Auth = (props: TProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await checkPermissions(String(token));
        if (!data.user) return;
        const { user } = data;
        const _id = user._id;
        if (_id) {
          try {
            const res = await getOneUser(String(_id));
            // console.log("user ", res.data);
            setUser(res.data);
            if (user !== undefined) {
              await message.warning("Bạn đã đăng nhập", 0.1);
              history.back();
              return <div>Loadding</div>;
            }
            return;
          } catch (error: any) {
            // await message.error(error.response.data.message);
          }
        }
        return null;
      } catch (error: any) {
        // navigate("/");
        // // console.log(error.response);
        // await message.error("Bạn không đủ quyền");
      }
    })();
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("user") && localStorage.getItem("token")) {
  //     history.back();
  //     message.warning("Bạn đã đăng nhập rồi");
  //   } else {
  //     return navigate("/auth");
  //   }
  // }, []);
  const [switchForm, setSwitchForm] = useState<Boolean>(true);
  const onChange = (key: boolean) => {
    setSwitchForm(key);
  };
  return (
    <section>
      <HeaderPage />
      <section style={{ paddingTop: "100px" }}>
        <div>
          <div
            style={{
              minWidth: "100%",
              height: "1px",
              backgroundColor: "rgb(102 102 102 / 16%)",
            }}
          >
            <div
              style={{
                margin: "0 auto",
                maxWidth: "400px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  top: "-40px",
                  zIndex: 1000,
                }}
              >
                <button
                  style={{
                    width: "50%",
                    backgroundColor: "#fff0",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px 0",
                  }}
                  onClick={() => onChange(!switchForm)}
                >
                  Đăng nhập
                </button>
                <button
                  style={{
                    width: "50%",
                    backgroundColor: "#fff0",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px 0",
                  }}
                  onClick={() => onChange(!switchForm)}
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {switchForm ? (
        <SigninPage Signin={props.Signin} />
      ) : (
        <SignupPage Signup={props.Signup} />
      )}
      <CustomFooter />
    </section>
  );
};

export default Auth;
