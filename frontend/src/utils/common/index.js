import axios from "axios";
import { setInterceptors } from "./interceptors";

function withoutAuth() {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
}

function withAuth() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  return setInterceptors(instance);
}

export const withoutAuthInstance = withoutAuth();
export const withAuthInstance = withAuth();
