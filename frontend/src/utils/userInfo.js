import { withoutAuthInstance } from "./common";

// getuserinfo 완료되면 api주소 입력 후 사용
export const getUserInfo = async () => {
  return await withoutAuthInstance().get("");
};
