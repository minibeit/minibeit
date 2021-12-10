import { API_URLS } from "../constants";
import axios from "axios";
import { withAuthInstance } from "./common";
const { API_USER, API_MAIL } = API_URLS;

/* guest 상태 */
export const guestCheckPhoneApi = (token, userId, phonenumber) => {
  var data = {
    receiverPhoneNumber: phonenumber,
  };
  return axios({
    method: "POST",
    url: process.env.REACT_APP_API_URL + API_USER + `${userId}/sms`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => err.response);
};
export const guestCheckEmailApi = (token, userId, userEmail) => {
  var data = {
    toEmail: userEmail,
  };
  return axios({
    method: "POST",
    url:
      process.env.REACT_APP_API_URL + API_MAIL + `${userId}/email/verification`,
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
    url: process.env.REACT_APP_API_URL + API_USER + `${userId}/verification`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => err.response);
};

/*로그인 상태*/
export const checkPhoneApi = (userId, phonenumber) => {
  var data = {
    receiverPhoneNumber: phonenumber,
  };
  return withAuthInstance.post(API_USER + `${userId}/sms`, data);
};

export const checkEmailApi = (userId, userEmail) => {
  var data = {
    toEmail: userEmail,
  };
  return withAuthInstance.post(API_MAIL + `${userId}/email/verification`, data);
};
export const checkCodeApi = (code, userId, type) => {
  var data = {
    code: code,
    verificationKinds: type,
  };
  return withAuthInstance.post(API_USER + `${userId}/verification`, data);
};
