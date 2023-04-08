import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});
export const instanceCRUD = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 1000,
  headers: {
    "X-Custom-Header": "foobar",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    // Authorization: `Bearer ${JSON.stringify(localStorage.getItem("token"))}`,
  },
});
