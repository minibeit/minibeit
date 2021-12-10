import { withAuthInstance } from "./common";
import { API_URLS } from "../constants";

const { API_USER, API_POST, API_REJECTPOST } = API_URLS;

export const getMyInfo = async () => {
  return await withAuthInstance.get(API_USER + "me");
};

export const editMyInfo = (userData, schoolId, originalNickname) => {
  const formData = new FormData();
  formData.append("name", userData.name);
  if (originalNickname !== userData.nickname) {
    formData.append("nicknameChanged", true);
    formData.append("nickname", userData.nickname);
  } else {
    formData.append("nicknameChanged", false);
    formData.append("nickname", userData.nickname);
  }
  formData.append("email", userData.email);
  formData.append("gender", userData.gender);
  formData.append("phoneNum", userData.phoneNum);
  formData.append("job", userData.job);
  formData.append("birth", userData.birth);
  formData.append("schoolId", schoolId);
  if (typeof userData.avatar !== "string") {
    formData.append("avatarChanged", true);
    if (userData.avatar) formData.append("avatar", userData.avatar);
  } else {
    formData.append("avatarChanged", false);
  }
  return withAuthInstance.post(API_USER + "update", formData);
};

export const getLikeListApi = async (page) => {
  return await withAuthInstance.get(
    API_POST + "like/list?page=" + page + `&size=6`
  );
};
export const getJoinlistApi = async (page, state) => {
  return await withAuthInstance.get(
    API_POST + "apply/list?page=" + page + "&size=10&status=" + state
  );
};

export const getCancellistApi = async (page) => {
  return await withAuthInstance.get(
    API_REJECTPOST + "list?page=" + page + "&size=10"
  );
};

export const getFinishlistApi = async (page) => {
  return await withAuthInstance.get(
    API_POST + "myComplete/list?page=" + page + "&size=10"
  );
};

export const deleteCancelApi = async (rejectPostId) => {
  return await withAuthInstance.delete(API_REJECTPOST + rejectPostId);
};

export const doJoinApi = async (postDoDateId) => {
  return await withAuthInstance.post(
    API_POST + "date/" + postDoDateId + "/finish"
  );
};

export const doNotJoinApi = async (postDoDateId) => {
  return await withAuthInstance.post(
    API_POST + "date/" + postDoDateId + "/apply/cancel"
  );
};
