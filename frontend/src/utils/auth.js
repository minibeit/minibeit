import axios from "axios";
import { API_URLS } from "../constants";
import { withAuthInstance, withoutAuthInstance } from "./common";

const { API_USER } = API_URLS;

export const signupInfoApi = (inputData, accessToken) => {
  const formData = new FormData();
  formData.append("name", inputData.name);
  formData.append("nickname", inputData.nickname);
  formData.append("gender", inputData.gender);
  formData.append("job", inputData.job);
  formData.append("schoolId", inputData.schoolId);
  formData.append("email", inputData.email);
  formData.append("phoneNum", inputData.phoneNum);
  formData.append(
    "birth",
    `${inputData.year}-${inputData.month}-${inputData.date}`
  );
  if (inputData.avatar) {
    formData.append("avatar", inputData.avatar);
  }
  return axios({
    method: "POST",
    url: process.env.REACT_APP_API_URL + API_USER + "signup",
    data: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res)
    .catch((err) => err);
};

export const logoutFunc = async () => {
  return await withAuthInstance.post(API_USER + "logout");
};

export const nickCheckApi = async (nickname) => {
  const data = {
    nickname: nickname,
  };
  return await withoutAuthInstance.post(API_USER + "nickname/check", data);
};
