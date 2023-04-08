import { instanceCRUD, instance } from "./instance";

export const getOneUser = (id: string) => {
  return instance.post("/users", { _id: id });
};
export const getAllUser = () => {
  return instanceCRUD.get("/users");
};
export const removeUser = (id: string) => {
  return instanceCRUD.delete("/users/" + id);
};
