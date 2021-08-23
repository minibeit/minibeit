import axios from "axios";
import { setInterceptors } from "./interceptors";

function withoutAuth() {
  return axios.create({});
}

function withAuth() {
  const instance = axios.create({});
  return setInterceptors(instance);
}

export const withoutAuthInstance = withoutAuth();
export const withAuthInstance = withAuth();
