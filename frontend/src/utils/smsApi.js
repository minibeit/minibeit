import { API_URLS } from "../constants";
import axios from "axios";
import { withAuthInstance } from "./common";

const { VERIFICATION_SMS } = API_URLS;

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
export const checkPhoneApi = (userId, phonenumber) => {
  var data = {
    receiverPhoneNumber: phonenumber,
  };
  return withAuthInstance.post(VERIFICATION_SMS + `${userId}/sms`, data);
};
