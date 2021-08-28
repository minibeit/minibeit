import { API_URLS } from "../constants";
import {withAuthInstance } from "./common";

const { LOGOUT, SIGNUP } = API_URLS;

export const signupInfoApi = async (inputs) => {
  const data = {
    name: inputs.name,
    nickname: inputs.nickname,
    gender: inputs.gender,
    phoneNum: inputs.phoneNum,
    job: inputs.job,
    age: parseInt(inputs.age),
    schoolId: parseInt(inputs.schoolId),
  };
  return await withAuthInstance.post(SIGNUP, data);
};

export const logoutFunc = async () => {
  return await withAuthInstance.post(LOGOUT);
};
