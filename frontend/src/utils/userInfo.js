import { withAuthInstance } from "./common";
import { API_URLS } from "../constants";

const { MY_USERINFO } = API_URLS;

// getuserinfo 완료되면 api주소 입력 후 사용
export const getMyInfo = async () => {
  return await withAuthInstance.get(MY_USERINFO);
};
