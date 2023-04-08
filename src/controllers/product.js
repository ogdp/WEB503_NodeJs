import dotenv from "dotenv";
import joi from "joi";
import Product from "../models/product";

dotenv.config();

const productSchema = joi.object({
  name: joi.string().messages({
    "string.empty": "Tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  price: joi.number().messages({
    "number.base": "Giá phải là một số",
    "number.empty": "Giá không được bỏ trống",
  }),
  image: joi.string().messages({
    "string.empty": "Hình ảnh không được bỏ trống",
    "any.required": "Trường này là bắt buộc",
  }),
  description: joi.string().messages({
    "string.empty": "Mô tả không được bỏ trống",
    "any.required": "Trường này là bắt buộc",
  }),
  categoryId: joi.string().messages({
    "string.empty": "Danh mục không được bỏ trống",
    "any.required": "Trường này là bắt buộc",
  }),
});

export const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(products);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const get = async function (req, res) {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId"
    );
    if (!product) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const create = async function (req, res) {
  try {
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    const product = await Product.create(req.body);
    if (!product) {
      return res.json({
        message: "Không thêm sản phẩm",
      });
    }
    return res.json({
      message: "Thêm sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const update = async function (req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    return res.json({
      message: "Cập nhật sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const remove = async function (req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
