import { withAuthInstance } from "./common";
import { API_URLS } from "../constants";
import axios from "axios";

const { MAIL, VERIFICATION, CHECK_CODE } = API_URLS;

export const sendMailApi = (status, userEmail) => {
  var data = {
    postMailCondition: status,
    toEmailList: userEmail,
  };
  return withAuthInstance.post(MAIL, data);
};
export const guestCheckEmailApi = (token, userId, userEmail) => {
  var data = {
    toEmail: userEmail,
  };
  return axios({
    method: "POST",
    url:
      process.env.REACT_APP_API_URL +
      VERIFICATION +
      `${userId}/email/verification`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => err.response);
};
export const guestCheckCodeApi = (token, code, userId, type) => {
  var data = {
    code: code,
    verificationKinds: type,
  };
  return axios({
    method: "POST",
    url: process.env.REACT_APP_API_URL + CHECK_CODE + `${userId}/verification`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => err.response);
};

export const checkEmailApi = (userId, userEmail) => {
  var data = {
    toEmail: userEmail,
  };
  return withAuthInstance.post(
    VERIFICATION + `${userId}/email/verification`,
    data
  );
};
export const checkCodeApi = (code, userId, type) => {
  var data = {
    code: code,
    verificationKinds: type,
  };
  return withAuthInstance.post(CHECK_CODE + `${userId}/verification`, data);
};
