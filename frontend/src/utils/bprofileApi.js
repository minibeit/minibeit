import { withAuthInstance } from "./common";
import { API_URLS } from "../constants";

const {
  BPROFILE_NEW,
  BPROFILELIST,
  BPROFILE_GET,
  BPROFILE_DELETE,
  BPROFILE_EDIT,
  BPROFILE_JOIN,
  BPROFILE_JOIN_DEL,
  GET_BP_USERGROUP,
  SEARCH_USER,
  BPROFILE_MAKE_LIST,
  ASSIGN_CHANGE,
  GET_WAIT_LIST,
  GET_APPROVE_LIST,
  CANCEL_ONE,
  APPROVE_ONE,
  SET_ATTEND,
  REJECT_ONE,
} = API_URLS;

export const bprofileNew = async (infoData) => {
  const formData = new FormData();
  formData.append("name", infoData.name);
  formData.append("place", infoData.place + " " + infoData.detailPlace);
  formData.append("contact", infoData.contact);
  if (infoData.avatar) {
    formData.append("avatar", infoData.avatar);
  }
  return await withAuthInstance.post(BPROFILE_NEW, formData);
};
export const bprofileListGet = async () => {
  return await withAuthInstance.get(BPROFILELIST);
};

export const getBprofileInfo = async (businessId) => {
  return await withAuthInstance.get(BPROFILE_GET + businessId);
};
export const deleteBprofile = async (businessId) => {
  return await withAuthInstance.delete(BPROFILE_DELETE + businessId);
};

export const editBprofile = (BProfileData) => {
  const formData = new FormData();
  formData.append("name", BProfileData.name);
  if (BProfileData.detailPlace) {
    formData.append(
      "place",
      BProfileData.place + " " + BProfileData.detailPlace
    );
  } else {
    formData.append("place", BProfileData.place);
  }
  formData.append("contact", BProfileData.contact);
  if (typeof BProfileData.avatar !== "string") {
    formData.append("avatarChanged", true);
    if (BProfileData.avatar) formData.append("avatar", BProfileData.avatar);
  } else {
    formData.append("avatarChanged", false);
  }

  return withAuthInstance.post(BPROFILE_EDIT + BProfileData.id, formData);
};

export const bprofileJoin = async (businessId, userId) => {
  return await withAuthInstance.post(
    BPROFILE_JOIN + businessId + "/share/" + userId
  );
};
export const bprofileJoinDel = async (businessId, userId) => {
  return await withAuthInstance.delete(
    BPROFILE_JOIN_DEL + businessId + "/expel/" + userId
  );
};
export const getBPusergroup = async (businessId) => {
  return await withAuthInstance.get(GET_BP_USERGROUP + businessId);
};
export const getSearchUser = async (input) => {
  return await withAuthInstance.get(SEARCH_USER + "?nickname=" + input);
};

export const assignChange = async (businessId, userId) => {
  return await withAuthInstance.post(
    ASSIGN_CHANGE + businessId + "/change/" + userId
  );
};

export const getMakelistApi = async (businessId, page, status) => {
  return await withAuthInstance.get(
    BPROFILE_MAKE_LIST +
      businessId +
      "/list?page=" +
      page +
      "&size=10&status=" +
      status
  );
};
export const getWaitListApi = async (postId, doDate) => {
  return await withAuthInstance.get(
    GET_WAIT_LIST + postId + "/applicant/list?doDate=" + doDate + "&status=WAIT"
  );
};

export const getApproveListApi = async (postId, doDate) => {
  return await withAuthInstance.get(
    GET_APPROVE_LIST +
      postId +
      "/applicant/list?doDate=" +
      doDate +
      "&status=APPROVE"
  );
};

export const approveOneApi = async (postdoDateId, userId) => {
  return await withAuthInstance.post(
    APPROVE_ONE + "date/" + postdoDateId + "/apply/approve/" + userId
  );
};
export const cancelOneApi = async (postdoDateId, userId) => {
  return await withAuthInstance.post(
    CANCEL_ONE + "date/" + postdoDateId + "/apply/approve/cancel/" + userId
  );
};
export const rejectOneApi = async (postdoDateId, userId, rejectValue) => {
  const data = {
    comment: rejectValue,
  };
  return await withAuthInstance.post(
    REJECT_ONE + "date/" + postdoDateId + "/apply/reject/" + userId,
    data
  );
};
export const setAttendApi = async (postdoDateId, userId, attend) => {
  const data = {
    isAttend: attend,
  };
  return await withAuthInstance.post(
    SET_ATTEND + "date/" + postdoDateId + "/attend/change/" + userId,
    data
  );
};
