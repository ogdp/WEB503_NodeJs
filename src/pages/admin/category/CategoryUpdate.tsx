import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { ICategory } from "../../../types/product";
import { Link, useOutletContext, useParams } from "react-router-dom";

interface IProps {
  getAllCategory: () => any;
  getOneCategory: (id: any) => any;
  updateCategory: (cate: ICategory) => any;
}
const CategoryUpdate = (props: IProps) => {
  const [categories, setCategories] =
    useOutletContext<[ICategory[], (obj: Object) => any]>();
  const { id } = useParams();
  const [categoryUpdate, setCategoryUpdate] = useState({
    check: true,
    name: "demo",
  });
  useEffect(() => {
    (async () => {
      try {
        // console.log("trong useEfact", id);
        const { data } = await props.getOneCategory(id);
        setCategoryUpdate(data);
      } catch (error) {}
    })();
  }, [id]);
  const onFinish = (values: any) => {
    let count: number = 0;
    values._id = id;
    (async () => {
      try {
        const { data } = await props.getAllCategory();
        for (const category of data) {
          if (category.name == values.name) {
            count++;
            console.log(count);
          }
        }
        if (count == 0) {
          try {
            console.log(values);
            const res = await props.updateCategory(values);
            await message.success("Cập nhật danh mục thành công");
            const { data }: { data: ICategory[] } =
              await props.getAllCategory();
            setCategories(data);
          } catch (error) {}
        } else {
          message.error("Tên danh mục đã tồn tại");
        }
      } catch (error) {}
    })();
  };
  if (categoryUpdate.check) {
    return <div></div>;
  }
  return (
    <div>
      <h1 style={{ fontSize: "22px" }}>Cập nhật danh mục</h1>
      <Form style={{ margin: "20px 0" }} onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên danh mục"
          initialValue={categoryUpdate.name}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên danh mục",
            },
            {
              validator: (_: any, value: string) =>
                value && value.trim() == ""
                  ? Promise.reject(
                      new Error("Tên danh mục không được chứa khoảng trắng")
                    )
                  : Promise.resolve(),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật danh mục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryUpdate;
