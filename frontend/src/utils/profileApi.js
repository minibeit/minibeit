import { withAuthInstance } from "./common";
import { API_URLS } from "../constants";

const { MY_USERINFO, EDIT_MY_USERINFO } = API_URLS;

export const getMyInfo = async () => {
  return await withAuthInstance.get(MY_USERINFO);
};

export const editMyInfo = async (inputs, newImg) => {
  const formData = new FormData();
  formData.append("name", inputs.name);
  formData.append("gender", inputs.gender);
  formData.append("job", inputs.job);
  formData.append("age", inputs.age);
  formData.append("phoneNum", inputs.phoneNum);
  formData.append("schoolId", inputs.schoolId);
  formData.append("nickname", inputs.new_nickname);
  formData.append(
    "nicknameChanged",
    inputs.new_nickname !== inputs.pre_nickname
  );
  if (newImg === undefined) {
    formData.append("avatarChanged", false);
  } else {
    formData.append("avatarChanged", true);
    formData.append("avatar", newImg);
  }
  return await withAuthInstance.post(EDIT_MY_USERINFO, formData);
};
