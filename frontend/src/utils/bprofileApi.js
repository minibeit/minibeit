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
  GET_BP_USERGROUP,SEARCH_USER,BPROFILE_MAKE_LIST, ASSIGN_CHANGE,GET_WAIT_LIST,GET_APPROVE_LIST,CANCEL_ONE, APPROVE_ONE,SET_ATTEND,REJECT_ONE
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
export const bprofileListGet = async () => {
  return await withAuthInstance.get(BPROFILELIST);
};

export const getBprofileInfo = async (businessId) => {
  return await withAuthInstance.get(BPROFILE_GET + businessId);
};
export const deleteBprofile = async (businessId) => {
  return await withAuthInstance.delete(BPROFILE_DELETE + businessId);
};

export const editBprofile = async (businessId, inputs, newImg,basicImg) => {
  const formData = new FormData();
  Object.keys(inputs).map((key) => formData.append(key, inputs[key]));
  if (newImg === undefined) {
    if(basicImg){
      formData.append("avatarChanged", true);
    }else{
      formData.append("avatarChanged", false);
    }
    
  }else {
    formData.append("avatarChanged", true);
    formData.append("avatar", newImg);
  }

  return await withAuthInstance.post(BPROFILE_EDIT + businessId, formData);
};

export const bprofileJoin = async (businessId, userId) => {
  return await withAuthInstance.post(
    BPROFILE_JOIN + businessId + "/share/"+userId,
  );
};
export const bprofileJoinDel = async (businessId ,userId) => {
  return await withAuthInstance.delete(
    BPROFILE_JOIN_DEL + businessId + "/expel/"+userId
  );
};
export const getBPusergroup = async (businessId) => {
  return await withAuthInstance.get(GET_BP_USERGROUP+ businessId);
};
export const getSearchUser = async (input) => {
  console.log(input)
  return await withAuthInstance.get(SEARCH_USER+ "?nickname="+input);
};

export const assignChange = async (businessId,userId) => {
  return await withAuthInstance.post(
    ASSIGN_CHANGE + businessId + "/change/"+userId,
  );
};

export const getMakelistApi = async (businessId, page,status) => {
  return await withAuthInstance.get(BPROFILE_MAKE_LIST+businessId+ "/list?page="+page+"&size=3&status="+status);
};
export const getWaitListApi = async (postId, doDate) => {
  return await withAuthInstance.get(GET_WAIT_LIST+postId+ "/applicant/list?doDate="+doDate);
};

export const getApproveListApi = async (postId, doDate) => {
  return await withAuthInstance.get(GET_APPROVE_LIST+postId+ "/applicant/confirm/list?doDate="+doDate);
};

export const approveOneApi = async (postId, postdoDateId, userId) => {
  return await withAuthInstance.post(APPROVE_ONE+postId+ "/date/"+postdoDateId+"/apply/approve/"+userId,);
};
export const cancelOneApi = async (postId,postdoDateId, userId) => {
  return await withAuthInstance.post(CANCEL_ONE+ postId+"/date/"+postdoDateId+"/apply/approve/cancel/" +userId);
};
export const rejectOneApi = async (postId, postdoDateId, userId, rejectValue) => {
  const data ={
    comment : rejectValue
  }
  return await withAuthInstance.post(REJECT_ONE+postId+ "/date/"+postdoDateId+"/apply/reject/"+userId,data);
};
export const setAttendApi = async (postId,postdoDateId, userId, attend) => {
  const data ={
    isAttend: attend,
  }
  return await withAuthInstance.post(SET_ATTEND+postId+"/date/"+postdoDateId+"/attend/change/"+userId, data);
};