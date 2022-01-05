import { withAuthInstance } from "./common";
import { API_URLS } from "../constants";

const { API_USER, API_POST, API_POSTS } = API_URLS;

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

export const getMyFeedList = (page, status) => {
  return withAuthInstance.get(
    API_POSTS + `apply?page=${page}&size=5&status=${status}`
  );
};

export const getMyRejectListApi = (page) => {
  return withAuthInstance.get(`/api/rejected-posts?page=${page}&size=5`);
};

export const getMyLikeListApi = async (page) => {
  return await withAuthInstance.get(API_POSTS + `like?page=${page}&size=6`);
};

export const deleteRejectedApi = (postId) => {
  return withAuthInstance.delete(`/api/rejected-post/${postId}`);
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

export const getPreviewProfileApi = () => {
  return withAuthInstance.get(`/api/post/user/status`);
};
export const getPreviewBProfileApi = (businessId) => {
  return withAuthInstance.get(
    `/api/post/business/profile/${businessId}/status`
  );
};
