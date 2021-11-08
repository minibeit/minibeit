import { withAuthInstance } from "./common";
import { API_URLS } from "../constants";

const {
  MY_USERINFO,
  EDIT_MY_USERINFO,
  GET_LIKE_LIST,
  GET_JOIN_LIST,
  DO_JOIN,
  DONOT_JOIN,
  GET_CANCEL_LIST,
  DELETE_CANCEL,
  GET_FINISH_LIST,
} = API_URLS;

export const getMyInfo = async () => {
  return await withAuthInstance.get(MY_USERINFO);
};

export const editMyInfo = (userData, schoolId, newNickname) => {
  const formData = new FormData();
  formData.append("name", userData.name);
  if (!newNickname) {
    formData.append("nicknameChanged", false);
    formData.append("nickname", userData.nickname);
  } else if (newNickname === userData.nickname) {
    formData.append("nicknameChanged", false);
    formData.append("nickname", userData.nickname);
  } else {
    formData.append("nicknameChanged", true);
    formData.append("nickname", newNickname);
  }
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
  return withAuthInstance.post(EDIT_MY_USERINFO, formData);
};

export const getLikeListApi = async (page) => {
  return await withAuthInstance.get(GET_LIKE_LIST + "page=" + page + "&size=6");
};
export const getJoinlistApi = async (page, state) => {
  return await withAuthInstance.get(
    GET_JOIN_LIST + "?page=" + page + "&size=10&status=" + state
  );
};

export const getCancellistApi = async (page) => {
  return await withAuthInstance.get(
    GET_CANCEL_LIST + "?page=" + page + "&size=10"
  );
};

export const getFinishlistApi = async (page) => {
  return await withAuthInstance.get(
    GET_FINISH_LIST + "page=" + page + "&size=10"
  );
};

export const deleteCancelApi = async (rejectPostId) => {
  return await withAuthInstance.delete(DELETE_CANCEL + rejectPostId);
};

export const doJoinApi = async (postDoDateId) => {
  return await withAuthInstance.post(DO_JOIN + postDoDateId + "/finish");
};

export const doNotJoinApi = async (postDoDateId) => {
  return await withAuthInstance.post(
    DONOT_JOIN + postDoDateId + "/apply/cancel"
  );
};
