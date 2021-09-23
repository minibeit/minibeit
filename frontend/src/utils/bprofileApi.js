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
  GET_BP_USERGROUP,SEARCH_USER,ASSIGN_CHANGE
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
    BPROFILE_JOIN + businessId + "/change/"+userId,
  );
};