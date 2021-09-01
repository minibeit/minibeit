import { withAuthInstance } from "./common";
import { API_URLS } from "../constants";

const {
  BPROFILE_NEW,
  BPROFILELIST,
  BPROFILE_GET,
  BPROFILE_DELETE,
  BPROFILE_EDIT,
  BPROFILE_JOIN,
} = API_URLS;

// getuserinfo 완료되면 api주소 입력 후 사용
export const bprofileNew = async (inputs, img) => {
  const formData = new FormData();
  Object.keys(inputs).map((key) => formData.append(key, inputs[key]));
  if (img !== undefined) {
    formData.append("avatar", img);
  }
  return await withAuthInstance.post(BPROFILE_NEW, formData);
};
export const bprofileListGet = async (UserId) => {
  return await withAuthInstance.get(BPROFILELIST + UserId);
};

export const getBprofileInfo = async (businessId) => {
  return await withAuthInstance.get(BPROFILE_GET + businessId);
};
export const deleteBprofile = async (businessId) => {
  return await withAuthInstance.delete(BPROFILE_DELETE + businessId);
};

export const editBprofile = async (businessId, inputs, newImg) => {
  const formData = new FormData();
  Object.keys(inputs).map((key) => formData.append(key, inputs[key]));
  if (newImg === undefined) {
    formData.append("avatarChanged", false);
  } else {
    formData.append("avatarChanged", true);
    formData.append("avatar", newImg);
  }
  return await withAuthInstance.post(BPROFILE_EDIT + businessId, formData);
};

export const bprofileJoin = async (businessId, nickname) => {
  const data = {
    nickname: nickname,
  };
  return await withAuthInstance.post(
    BPROFILE_JOIN + businessId + "/share",
    data
  );
};
