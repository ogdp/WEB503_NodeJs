import { Button, Form, Input, message } from "antd";
import { ICategory } from "../../../types/product";
import { useOutletContext } from "react-router-dom";
interface IProps {
  createCategory: (cate: ICategory) => any;
  getAllCategory: () => any;
}
const CategoryAdd = (props: IProps) => {
  const [categories, setCategories] =
    useOutletContext<[ICategory[], (categories: ICategory[]) => void]>();
  const onFinish = (values: any) => {
    let count: number = 0;
    (async () => {
      try {
        const { data } = await props.getAllCategory();
        for (const category of data) {
          if (category.name == values.name) {
            count++;
          }
        }
        if (count == 0) {
          try {
            const res = await props.createCategory(values);
            await message.success("Thêm danh mục thành công");
            const { data } = await props.getAllCategory();
            setCategories(data);
            // setCategories([...categories, values]);
          } catch (error) {}
        } else {
          message.error("Danh mục đã tồn tại");
        }
      } catch (error) {}
    })();
  };
  return (
    <div>
      <h1 style={{ fontSize: "22px" }}>Thêm danh mục mới</h1>
      <Form style={{ margin: "20px 0" }} onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên danh mục"
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
            Thêm danh mục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryAdd;
