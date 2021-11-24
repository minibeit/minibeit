import { API_URLS } from "../constants";
import axios from "axios";
import { withAuthInstance } from "./common";
const { VERIFICATION_SMS, VERIFICATION, CHECK_CODE } = API_URLS;

/* guest 상태 */
export const guestCheckPhoneApi = (token, userId, phonenumber) => {
  var data = {
    receiverPhoneNumber: phonenumber,
  };
  return axios({
    method: "POST",
    url: process.env.REACT_APP_API_URL + VERIFICATION_SMS + `${userId}/sms`,
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

/*로그인 상태*/
export const checkPhoneApi = (userId, phonenumber) => {
  var data = {
    receiverPhoneNumber: phonenumber,
  };
  return withAuthInstance.post(VERIFICATION_SMS + `${userId}/sms`, data);
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
