import { withAuthInstance } from "./common";
import { API_URLS } from "../constants";

const { MY_USERINFO, EDIT_MY_USERINFO,GET_LIKE_LIST,GET_JOIN_LIST,DO_JOIN,DONOT_JOIN,GET_CANCEL_LIST,DELETE_CANCEL,GET_FINISH_LIST } = API_URLS;

export const getMyInfo = async () => {
  return await withAuthInstance.get(MY_USERINFO);
};

export const editMyInfo = async (inputs,school, newImg,basicImg) => {
  const formData = new FormData();
  formData.append("name", inputs.name);
  formData.append("gender", inputs.gender);
  formData.append("job", inputs.job);
  formData.append("age", inputs.age);
  formData.append("phoneNum", inputs.phoneNum);
  formData.append("schoolId", school);
  formData.append("birth", inputs.birth);
  formData.append("nickname", inputs.new_nickname);
  formData.append(
    "nicknameChanged",
    inputs.new_nickname !== inputs.pre_nickname
  );
  
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

  return await withAuthInstance.post(EDIT_MY_USERINFO, formData);
};

export const getLikeListApi = async (page) => {
  console.log(page)
  return await withAuthInstance.get(GET_LIKE_LIST+"page="+page+"&size=6");
};
export const getJoinlistApi = async (page, state) => {
  return await withAuthInstance.get(GET_JOIN_LIST+"?page="+page+"&size=3&status="+state);
};

export const getCancellistApi = async (page) => {
  return await withAuthInstance.get(GET_CANCEL_LIST+"?page="+page+"&size=3");
};

export const getFinishlistApi = async (page) => {
  return await withAuthInstance.get(GET_FINISH_LIST+"page="+page+"&size=3");
};

export const deleteCancelApi = async (rejectPostId) => {
  return await withAuthInstance.delete(DELETE_CANCEL+rejectPostId);
};

export const doJoinApi = async (postDoDateId) => {
  return await withAuthInstance.post(DO_JOIN+postDoDateId+"/finish");
};
export const doNotJoinApi = async (postDoDateId) => {
  return await withAuthInstance.post(DONOT_JOIN+postDoDateId+"/apply/cancel");
};