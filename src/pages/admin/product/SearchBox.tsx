import React from "react";
import { Button, Form, Input } from "antd";

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [form] = Form.useForm();

  const handleSearch = (values: any) => {
    onSearch(values.searchText);
  };

  return (
    <Form form={form} onFinish={handleSearch}>
      <Form.Item name="searchText">
        <Input.Search placeholder="Search" enterButton />
      </Form.Item>
    </Form>
  );
};

export default SearchBox;
