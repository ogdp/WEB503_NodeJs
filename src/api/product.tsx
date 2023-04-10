import { ICategory, IProduct, IProductNotId } from "../types/product";
import { instance, instanceCRUD } from "./instance";

export const getAllProduct = async (
  paginite: { limit: number; page: number } | null
) => {
  const { data } = await instance.get("/products/");
  if (paginite !== null) {
    const { limit, page } = paginite;
    const lengthData = Math.floor(Number(data.length / limit) + 1);
    const setPaginite = `?_limit=${limit}&_page=${
      page > lengthData ? lengthData : page
    }`;
    return instance.get("/products/" + setPaginite);
  }
  return instance.get("/products" + (paginite !== null ? paginite : ""));
};
export const getOneProduct = (id: string) => {
  return instance.get("/products/" + id);
};
export const createProduct = (product: IProductNotId) => {
  return instanceCRUD.post("/products", product);
};
export const removeProduct = (id: string) => {
  return instanceCRUD.delete("/products/" + id);
};
export const updateProduct = (product: IProduct): any => {
  return instanceCRUD.patch("/products/" + product._id, product);
};
export const getAllCategory = () => {
  return instance.get("/categories");
};
export const getOneCategory = (id: string) => {
  return instance.get("/categories/" + id);
};
export const removeCategory = (id: string) => {
  return instanceCRUD.delete("/categories/" + id);
};
export const createCategory = (category: ICategory) => {
  return instanceCRUD.post("/categories", category);
};
export const updateCategory = (category: ICategory): any => {
  return instanceCRUD.patch("/categories/" + category._id, category);
};
