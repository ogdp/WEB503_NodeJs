import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getOne = async function (req, res) {
  try {
    const user = await User.findById(req.body._id);
    if (!user) {
      return res.json({
        message: "Không tìm thấy tài khoản",
      });
    }
    return res.json(user);
  } catch (error) {
    return res.status(400).json({
      message: "Không tìm thấy tài khoản",
      error: error,
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.json({
        message: "Không có tài khoản nào",
      });
    }
    return res.json(users);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const remove = async function (req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa tài khoản thành công",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
