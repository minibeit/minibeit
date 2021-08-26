import { API_URLS } from "../constants";
import { withoutAuthInstance, withAuthInstance } from "./common";

const { LOGIN, LOGOUT, SIGNUP } = API_URLS;

export const obtainToken = async (id) => {
  const data = {
   id: id,
  };
  return await withoutAuthInstance.post(LOGIN, data);
};

export const signupInfoApi = async (inputs) => {
  const data = {
    name: inputs.name,
    nickname: inputs.nickname,
    gender: inputs.gender,
    phoneNum : inputs.phoneNum,
    job : inputs.job,
    age: inputs.age,
    schoolId : [ inputs.schoolId ],
  };
  return await withoutAuthInstance.post(SIGNUP, data);
};

export const logoutFunc = async () => {
  return await withAuthInstance.post(LOGOUT);
};
