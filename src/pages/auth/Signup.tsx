import { Form, Input, Button, Checkbox, Upload, message } from "antd";
import { TSignup } from "../../types/auth";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
type TProps = {
  Signup: (user: TSignup) => any;
};
const signup = (props: TProps) => {
  const navigate = useNavigate();
  let fileDetails: any = "";

  // upload hình ảnh lên ...
  const CLOUD_NAME = "minhduc";
  const PRESET_NAME = "freeImage";
  const FOLDER_NAME = "freeImage";
  const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const uploadImgs = async (file: RcFile | null) => {
    if (file) {
      const urls: string[] = [];
      const formData = new FormData();
      formData.append("upload_preset", PRESET_NAME);
      formData.append("folder", FOLDER_NAME);
      formData.append("file", file);
      try {
        const response = await axios.post(API_URL, formData, {
          headers: { "Content-Type": "application/form-data" },
        });
        urls.push(response.data.url);
      } catch (error) {
        console.error("Upload image failed.");
      }
      return urls;
    }
    return [];
  };
  //
  // Validate ảnh khi tải lên chỉ nhận hình ảnh
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }

    const fileList = e && e.fileList;
    if (fileList) {
      return fileList.every((file: any) => {
        return file.type.startsWith("image/");
      })
        ? fileList
        : null;
    }

    return e && e.fileList;
  };
  // ------

  const handleBeforeUpload = async (file: RcFile) => {
    // Gán lại giá trị fileDetail khai báo ban đầu
    fileDetails = file;
    // Return false chặn sự kiện tải file lên mặc định của antd
    return false;
  };

  const onFinish = async (values: any) => {
    const getLinkImg = await uploadImgs(values.image[0].originFileObj);
    delete values.termsOfUse;
    delete values.image;
    values.avatar = getLinkImg[0];
    try {
      const res = await props.Signup(values);
      if (res.data.user) {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/auth");
        await message.success(res.data.message);
        location.reload();
        return;
      }
    } catch (error: any) {
      return message.error(error.response.data.message);
    }
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
              float: "right",
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
          autoComplete="off"
        >
          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="name"
            rules={[{ required: true, message: "Tên không được bỏ trống!" }]}
          >
            <Input
              bordered={false}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
              }}
              placeholder="Họ tên"
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="email"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Email không được bỏ trống!" },
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
            ]}
          >
            <Input
              bordered={false}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
              }}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="password"
            rules={[
              { required: true, message: "Mật khẩu không được bỏ trống!" },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
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
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu xác nhận không khớp!");
                },
              }),
            ]}
          >
            <Input.Password
              bordered={false}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
              }}
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="image"
            // label="Tải lên ảnh sản phẩm"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Chọn một hình ảnh đại diện bản thân"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Upload
              name="logo"
              beforeUpload={handleBeforeUpload}
              listType="picture"
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Tải lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            style={{ marginTop: "-20px", marginBottom: "30px", padding: 0 }}
            name="termsOfUse"
            valuePropName={"checked"}
            wrapperCol={{ offset: 0, span: 24 }}
            rules={[
              { required: true, message: "Điều khoản không được bỏ trống !!!" },
            ]}
          >
            <Checkbox>Chấp nhận tất cả điều khoản bên chúng tôi</Checkbox>
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
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </main>
    </section>
  );
};

export default signup;
