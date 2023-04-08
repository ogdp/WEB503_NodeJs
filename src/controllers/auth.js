import User from "../models/user";
import { signinSchema, signupSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, avatar, email, password } = req.body;

    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Tài khoản đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, "DucDeepTry", {
      expiresIn: "1h",
    });
    user.password = undefined;
    return res.status(201).json({
      message: "Tạo tài khoản thành công",
      accessToken: token,
      user,
    });
  } catch (error) {}
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = signinSchema.validate(
      { email, password },
      { abortEarly: false }
    );

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Tài khoản không tồn tại",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không chính xác",
      });
    }
    const token = jwt.sign({ _id: user._id }, "DucDeepTry", {
      expiresIn: "1h",
    });
    user.password = undefined;

    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkPermissions = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token)
      return res.status(200).json({
        message: "Không tìm thấy token",
      });
    const decodedToken = jwt.verify(token, "DucDeepTry");
    return res.status(200).json({
      user: decodedToken,
    }); // In ra thông tin giải mã của JWT nếu không có lỗi
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(201)
        .json({ error: "JWT đã hết hạn", token: "tokenExpired" }); // Gửi thông báo lỗi hết hạn JWT về client
    } else {
      return res.status(201).json({
        error: "Lỗi giải mã JWT: " + err.message,
        token: req.body.token,
      }); // Gửi thông báo lỗi khác (không phải hết hạn JWT) về client
    }
  }
};

export const createTokenFromTokenPrev = async (req, res) => {
  try {
    const tokenAgo = await req.body.token;
    const expiresIn = "1800";
    const decoded = await jwt.verify(tokenAgo, "DucDeepTry");
    if (typeof decoded === "object" && decoded._id) {
      const newToken = await jwt.sign({ _id: decoded._id }, "DucDeepTry", {
        expiresIn,
      });
      return res.status(200).json({
        message: "Tạo token Refesh thành công",
        token: newToken,
      });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token đã hết hạn!" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Token không hợp lệ!" });
    } else if (error instanceof jwt.NotBeforeError) {
      res.status(401).json({ message: "Không tìm thấy secret key!" });
    } else {
      res.status(401).json({ message: "Lỗi xác thực token" });
    }
  }
};
