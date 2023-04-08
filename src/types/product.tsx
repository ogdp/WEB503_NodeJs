export interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}
export interface ICProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: ICategory;
}
export interface IProductNotId {
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: string;
}
export interface ICategory {
  _id: string;
  name: string;
}
export interface ICategoryNotId {
  name: string;
}
