import { API_URLS } from "../constants";
import { withAuthInstance } from "./common";

const { LOGOUT, SIGNUP } = API_URLS;

export const signupInfoApi = async (inputs, img) => {
  const formData = new FormData();
  Object.keys(inputs).map((key) => formData.append(key, inputs[key]));
  if (img !== undefined) {
    formData.append("avatar", img);
  }
  return await withAuthInstance.post(SIGNUP, formData);
};

export const logoutFunc = async () => {
  return await withAuthInstance.post(LOGOUT);
};
