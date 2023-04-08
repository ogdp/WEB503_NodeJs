import { TSignin, TSignup } from "../types/auth";
import { instance } from "./instance";

export const signin = (user: TSignin) => {
  return instance.post("/signin", user);
};
export const signup = (user: TSignup) => {
  return instance.post("/signup", user);
};
// Check quyền
export const checkPermissions = (token: string) => {
  return instance.post("/checkPermissions", {
    token: String(token),
  });
};
