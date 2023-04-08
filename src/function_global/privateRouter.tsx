import { useNavigate } from "react-router-dom";
import { checkPermissions } from "../api/auth";
import { getOneUser } from "../api/user";
import { message } from "antd";
import { useEffect } from "react";

export const PrivateRouter = async () => {
  const navigate: any = useNavigate();
  try {
    const token = localStorage.getItem("token");
    const res = await checkPermissions(String(token));
    const { _id } = res.data.user;
    if (_id) {
      try {
        const res = await getOneUser(_id);
        switch (res.data.role) {
          case "admin":
            break;
          case "member":
            navigate("/");
            await message.warning("Hãy đăng nhập bằng tài khoản admin");
            break;
          default:
            navigate("/");
            await message.success("Trang chủ");
            break;
        }
        return;
      } catch (error: any) {
        // await message.error(error.response.data.message);
      }
    }
    return null;
  } catch (error: any) {
    navigate("/");
    // console.log(error.response);
    await message.error("Bạn không đủ quyền");
  }
};
