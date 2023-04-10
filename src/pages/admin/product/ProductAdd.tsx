import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Row,
  Col,
  List,
  Card,
  Space,
  Spin,
  message,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ICategory, IProductNotId } from "../../../types/product";
import { UploadChangeParam, RcFile } from "antd/lib/upload";
import {
  LoaddingRender,
  formatCurrencyVND,
} from "../../../function_global/products";

const { Option } = Select;

type IProduct = {
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: string;
};

type ProductFormProps = {
  categories: { _id: string; name: string }[];
  onSubmit: (product: IProduct) => any;
};

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

// Khai báo fileDetails khi upload
let fileDetails: any;

// Tạo 1 function chứa form thêm sản phẩm
const ProductForm = ({ categories, onSubmit }: ProductFormProps) => {
  const [form] = useForm<IProduct>();

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

  // Tạo 1 useState gán giá trị mặc định cho Giá sản phẩm là 0
  const [price_v1, setPrice_v1] = useState<number>(0);

  // onChange không hỗ trợ từ antd 4.0.0 trở lên
  // Vì thế nên sử dụng breforeUpload
  const handleBeforeUpload = async (file: RcFile) => {
    // Gán lại giá trị fileDetail khai báo ban đầu
    fileDetails = file;
    // Return false chặn sự kiện tải file lên mặc định của antd
    return false;
  };
  // ___

  const handleSubmit = () => {
    const product = form.getFieldsValue();
    onSubmit(product);
    form.resetFields();
  };
  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="name"
        label="Tên sản phẩm"
        rules={[{ required: true, message: "Trường này là bắt buộc" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Giá"
        rules={[{ required: true, message: "Trường này là bắt buộc" }]}
      >
        <Row>
          <Col md={10}>
            <Input
              type="number"
              defaultValue={0}
              value={price_v1}
              onChange={(event) => setPrice_v1(Number(event.target.value))}
            />
          </Col>
          <Col md={14}>
            <Button
              style={{ margin: "0 2px" }}
              onClick={() => {
                setPrice_v1(200000);
                form.setFieldsValue({ price: 200000 });
              }}
            >
              200.000
            </Button>
            <Button
              style={{ margin: "0 2px" }}
              onClick={() => {
                setPrice_v1(300000);
                form.setFieldsValue({ price: 300000 });
              }}
            >
              300.000
            </Button>
            <Button
              style={{ margin: "0 2px" }}
              onClick={() => {
                setPrice_v1(600000);
                form.setFieldsValue({ price: 600000 });
              }}
            >
              600.000
            </Button>
            <Button
              style={{ margin: "0 2px" }}
              onClick={() => {
                setPrice_v1(1000000);
                form.setFieldsValue({ price: 1000000 });
              }}
            >
              1.000.000
            </Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="image"
        label="Tải lên ảnh sản phẩm"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Chọn một hình ảnh đại diện cho sản phẩm"
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
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: "Trường này là bắt buộc" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="categoryId"
        label="Danh mục"
        rules={[{ required: true, message: "Trường này là bắt buộc" }]}
      >
        <Select>
          {categories.map((category) => (
            <Option key={category._id} value={category._id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
};

// Khai kiểu cho danh mục
// interface Category {
//   id: string;
//   name: string;
// }
interface IProps {
  getAllCategory: () => Promise<{ data: ICategory[] }>;
  createProduct: (product: IProductNotId) => any;
}
export default function ProductUpdate(props: IProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  // Gửi request lên server để lấy data danh mục
  useEffect(() => {
    (async () => {
      try {
        const { data } = await props.getAllCategory();
        setCategories(data);
      } catch (error) {}
    })();
  }, []);
  const handleAddProduct = async (product: IProduct) => {
    LoaddingRender(true);
    try {
      const res = await uploadImgs(fileDetails);
      product.image = await res[0];
      product.price = Number(product.price);
      setProducts([...products, product]);
      const cc = await props.createProduct(product);
      message.success("Thêm sản phẩm thành công", 1.5);
      LoaddingRender(false);
    } catch (error) {
      // message.error(error.message);
      console.log(error);
    }
  };
  return (
    <section style={{ position: "relative" }}>
      <div id="LoaddingRender">
        <Space
          direction="vertical"
          id="space"
          style={{
            transition: "all .35s",
            position: "absolute",
            borderRadius: "2px",
            background: "rgb(0 0 0 / 10%)",
            zIndex: -1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
            backdropFilter: "blur(2px)",
          }}
        >
          <Spin tip="Loading..." />
        </Space>
      </div>
      <div style={{ padding: 24 }}>
        <h1>Quản lý sản phẩm</h1>
        <ProductForm categories={categories} onSubmit={handleAddProduct} />
        <hr />
        <h2>Sản phẩm đã thêm:</h2>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={products}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.name}>
                <div>
                  <img
                    src={`${item.image}`}
                    alt=""
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <h4 style={{ color: "red", margin: "3px 0" }}>
                  {formatCurrencyVND(item.price)}
                </h4>
                <p>
                  {categories.map((item2) =>
                    item2._id == item.categoryId ? item2.name : ""
                  )}
                </p>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </section>
  );
}
