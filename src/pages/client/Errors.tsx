import React from "react";
import { Button, Result } from "antd";
const Errors = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi !!! Trang bạn yêu cầu hiện không khả dụng."
        extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
};

export default Errors;
