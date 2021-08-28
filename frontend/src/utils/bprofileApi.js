import { withAuthInstance } from "./common";
import { API_URLS } from "../constants";

const { BPROFILE_NEW,BPROFILELIST } = API_URLS;

// getuserinfo 완료되면 api주소 입력 후 사용
export const bprofileNew= async (inputs) => {
    const data = {
        name: inputs.name,
        category: inputs.category,
        place: inputs.place,
        introduce: inputs.introduce,
        contact: inputs.contact,
      };
  return await withAuthInstance.post(BPROFILE_NEW, data);
};
export const bprofileListGet= async (UserId) => {
return await withAuthInstance.get(BPROFILELIST+UserId);
};
