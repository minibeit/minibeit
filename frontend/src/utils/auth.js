import { API_URLS } from "../constants";
import { withoutAuthInstance, withAuthInstance } from "./common";

const { LOGIN, LOGOUT, SIGNUP } = API_URLS;

export const obtainToken = async (useremail, password) => {
  const data = {
    email: useremail,
    password: password,
  };
  return await withoutAuthInstance.post(LOGIN, data);
};

export const signUpfunc = async (username, useremail, password) => {
  const data = {
    name: username,
    email: useremail,
    password: password,
  };
  return await withoutAuthInstance.post(SIGNUP, data);
};

export const logoutFunc = async () => {
  return await withAuthInstance.post(LOGOUT);
};
