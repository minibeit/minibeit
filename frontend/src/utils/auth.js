import axios from "axios";
import { API_URLS } from "../constants";
import { withAuthInstance } from "./common";

const { LOGOUT, SIGNUP } = API_URLS;

export const signupInfoApi = async (inputs, img, accessToken) => {
  const formData = new FormData();
  Object.keys(inputs).map((key) => formData.append(key, inputs[key]));
  if (img !== undefined) {
    formData.append("avatar", img);
  }
  await axios({
    method: "POST",
    url: process.env.REACT_APP_API_URL + SIGNUP,
    data: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const logoutFunc = async () => {
  return await withAuthInstance.post(LOGOUT);
};
