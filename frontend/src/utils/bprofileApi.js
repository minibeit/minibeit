import { withAuthInstance } from "./common";
import { API_URLS } from "../constants";

const { API_BUSINESS, API_USER, API_POST, API_POSTS } = API_URLS;

export const bprofileNew = async (infoData) => {
  const formData = new FormData();
  formData.append("name", infoData.name);
  formData.append("place", infoData.place);
  formData.append("placeDetail", infoData.detailPlace);
  formData.append("contact", infoData.contact);
  if (infoData.avatar) {
    formData.append("avatar", infoData.avatar);
  }
  return await withAuthInstance.post(API_BUSINESS, formData);
};

export const bprofileListGet = async () => {
  return await withAuthInstance.get("/api/business-profiles/mine");
};

export const getBprofileInfo = async (businessId) => {
  return await withAuthInstance.get(API_BUSINESS + businessId);
};
export const deleteBprofile = async (businessId) => {
  return await withAuthInstance.delete(API_BUSINESS + businessId + "/user");
};

export const editBprofile = (BProfileData) => {
  const formData = new FormData();
  formData.append("name", BProfileData.name);
  formData.append("place", BProfileData.place);
  formData.append("placeDetail", BProfileData.placeDetail);
  formData.append("contact", BProfileData.contact);
  if (typeof BProfileData.avatar !== "string") {
    formData.append("avatarChanged", true);
    if (BProfileData.avatar) formData.append("avatar", BProfileData.avatar);
  } else {
    formData.append("avatarChanged", false);
  }

  return withAuthInstance.post(API_BUSINESS + BProfileData.id, formData);
};

export const bprofileJoin = async (businessId, userId) => {
  return await withAuthInstance.post(
    API_BUSINESS + businessId + "/share/" + userId
  );
};
export const bprofileJoinDel = async (businessId, userId) => {
  return await withAuthInstance.delete(
    API_BUSINESS + businessId + "/user/" + userId
  );
};
export const getBPusergroup = async (businessId, userId) => {
  return await withAuthInstance.get(
    API_BUSINESS + businessId + "/change/" + userId
  );
};
export const getSearchUser = async (input) => {
  return await withAuthInstance.get(API_USER + "search?nickname=" + input);
};

export const assignChange = async (businessId, userId) => {
  return await withAuthInstance.post(
    API_BUSINESS + businessId + "/change/" + userId
  );
};

export const getMakelistApi = async (businessId, page, status) => {
  return await withAuthInstance.get(
    API_POSTS +
      `business/profile/${businessId}?page=${page}&size=5&status=${status}`
  );
};
export const getWaitListApi = async (postId, doDate) => {
  return await withAuthInstance.get(
    API_POST + postId + "/applicant/list?doDate=" + doDate + "&status=WAIT"
  );
};

export const getApproveListApi = async (postId, doDate) => {
  return await withAuthInstance.get(
    API_POST + postId + "/applicant/list?doDate=" + doDate + "&status=APPROVE"
  );
};

export const approveOneApi = async (postdoDateId, userId) => {
  return await withAuthInstance.post(
    API_POST + "date/" + postdoDateId + "/apply/approve/" + userId
  );
};
export const cancelOneApi = async (postdoDateId, userId) => {
  return await withAuthInstance.post(
    API_POST + "date/" + postdoDateId + "/apply/approve/cancel/" + userId
  );
};
export const rejectOneApi = async (postdoDateId, userId, comment) => {
  const data = {
    comment: comment === "" ? null : comment,
  };
  return await withAuthInstance.post(
    API_POST + "date/" + postdoDateId + "/apply/reject/" + userId,
    data
  );
};
export const setAttendApi = async (postdoDateId, userId, attend) => {
  const data = {
    isAttend: attend,
  };
  return await withAuthInstance.post(
    API_POST + "date/" + postdoDateId + "/attend/change/" + userId,
    data
  );
};
