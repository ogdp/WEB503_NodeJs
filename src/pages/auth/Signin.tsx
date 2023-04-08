import { Button, Form, Input, Checkbox, message } from "antd";
import React from "react";
import { TSignin } from "../../types/auth";
import { useNavigate } from "react-router-dom";
type TProps = {
  Signin: (user: TSignin) => any;
};
const signin = (props: TProps) => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    (async () => {
      try {
        const user: TSignin = {
          email: values.email,
          password: values.password,
        };
        const res: any = await props.Signin(user);
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        await message.success(res.data.message, 0.5);
        if (res.data.user.role === "admin") {
          navigate("/admin");
          location.reload();
        } else {
          navigate("/");
          message.success("Xin chào ! " + res.data.user.name);
        }
      } catch (error: any) {
        // message.error(error.response.data.message);
      }
    })();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <section>
      <div style={{ minWidth: "100%", height: "3px", position: "relative" }}>
        <div
          style={{
            width: "100%",
            height: "2px",
            position: "absolute",
            top: "calc(50% - 4px)",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "400px",
            zIndex: "20000",
          }}
        >
          <div
            style={{
              float: "left",
              width: "50%",
              height: "3px",
              backgroundColor: "black",
            }}
          ></div>
        </div>
      </div>
      <main
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          padding: "50px 0 60px 0",
          height: "73vh",
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="email"
            rules={[
              { required: true, message: "Email không được bỏ trống!" },
              {
                type: "email",
                message: "Email không hợp lệ !",
              },
            ]}
          >
            <Input
              bordered={false}
              placeholder="Email"
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
              }}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="password"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Mật khẩu không được bỏ trống!" },
              {
                validator: (_, value) => {
                  if (value && value.includes(" ")) {
                    return Promise.reject(
                      "Mật khẩu không được chứa khoảng trắng!"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password
              bordered={false}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
              }}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 0, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button
              type="primary"
              style={{
                borderRadius: 0,
                width: "100%",
                backgroundColor: "black",
                height: "45px",
                fontSize: "14px",
                fontWeight: "600",
              }}
              htmlType="submit"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </main>
    </section>
  );
};

export default signin;
