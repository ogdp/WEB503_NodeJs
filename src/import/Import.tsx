// Admin
import DashBoard from "../pages/admin/Dashboard";
import AdminProductListPage from "../pages/admin/product/ProductList";
import F1 from "../pages/admin/F1";
import AdminUserListPage from "../pages/admin/users/UserList";
import {
  getAllProduct,
  getOneProduct,
  updateProduct,
  removeProduct,
  createProduct,
  getAllCategory,
  removeCategory,
  getOneCategory,
  createCategory,
  updateCategory,
} from "../api/product";
import { signin, signup } from "../api/auth";
import { getAllUser, getOneUser, removeUser } from "../api/user";
import ProductAdd from "../pages/admin/product/ProductAdd";
import { IProductNotId, ICategory, IProduct } from "../types/product";
import ProductUpdate from "../pages/admin/product/ProductUpdate";
import CategoryList from "../pages/admin/category/CategoryList";
import CategoryUpdate from "../pages/admin/category/CategoryUpdate";
import CategoryAdd from "../pages/admin/category/CategoryAdd";
import AuthPage from "../pages/auth/Auth";
