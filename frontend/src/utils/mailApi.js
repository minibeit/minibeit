import { withAuthInstance } from "./common";
import { API_URLS } from "../constants";

const { MAIL } = API_URLS;

export const sendMailApi = (status, userEmail) => {
  var data = {
    postMailCondition: status,
    toEmail: userEmail,
  };
  return withAuthInstance.post(MAIL, data);
};