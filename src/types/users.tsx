export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export interface IUserNotId {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
