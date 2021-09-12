import axios from "axios";
import { API_URLS } from "../constants";
import { withAuthInstance } from "./common";

const { LOGOUT, SIGNUP } = API_URLS;

export const signupInfoApi = async (inputs2, img, accessToken) => {
  const formData = new FormData();
  Object.keys(inputs2).map((key) => formData.append(key, inputs2[key]));
  if (img !== undefined) {
    formData.append("avatar", img);
  }
  return await axios({
    method: "POST",
    url: process.env.REACT_APP_API_URL + SIGNUP,
    data: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res)
    .catch((err) => err);
};

export const logoutFunc = async () => {
  return await withAuthInstance.post(LOGOUT);
};
