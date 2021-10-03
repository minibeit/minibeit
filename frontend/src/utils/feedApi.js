import { API_URLS } from "../constants";
import { withAuthInstance, withoutAuthInstance } from "./common";

const {
  CREATE_FEED,
  FEED_DELETE,
  GET_FEEDLIST,
  GET_FEEDDETAIL,
  APPLY_POST,
  BOOKMARK_POST,
  STATE_COMPLETE,
} = API_URLS;

export const feedCreateApi = async (recruit) => {
  function conditionDetail(arr) {
    var string = "";
    for (var i = 0; i < arr.length; i++) {
      string += `${arr[i]}|`;
    }
    return string;
  }
  const data = {
    title: recruit.title,
    content: recruit.content,
    place: recruit.address,
    contact: recruit.contact,
    category: recruit.category,
    headCount: recruit.headCount,
    payment: recruit.payment,
    cache: recruit.payment === "CACHE" ? recruit.pay : null,
    goods: recruit.payment === "GOODS" ? recruit.pay : null,
    paymentDetail: recruit.payMemo,
    condition: recruit.condition,
    conditionDetail: conditionDetail(recruit.conditionDetail),
    doTime: recruit.doTime,
    schoolId: recruit.school.id,
    businessProfileId: recruit.businessProfile.id,
    startDate: `${recruit.startDate.format("YYYY-MM-DD")}T${recruit.startTime}`,
    endDate: `${recruit.endDate.format("YYYY-MM-DD")}T${recruit.endTime}`,
    doDateList: recruit.doDateList,
  };
  console.log(data);
};

export const feedDetailApi = async (feedId, isLogin) => {
  if (isLogin) {
    return await withAuthInstance.get(GET_FEEDDETAIL + feedId);
  } else {
    return await withoutAuthInstance.get(GET_FEEDDETAIL + feedId);
  }
};

export const feedDetailTimeApi = async (feedId, doDate) => {
  return await withoutAuthInstance.get(
    GET_FEEDDETAIL + feedId + `/start?doDate=${doDate}`
  );
};

export const feedEditApi = async (inputs, files, postId) => {
  const formData = new FormData();
  formData.append("title", inputs.title);
  formData.append("content", inputs.content);
  formData.append("place", inputs.place);
  formData.append("pay", inputs.pay);
  formData.append("time", inputs.time);
  formData.append("files", files);
  formData.append("phoneNum", inputs.phoneNum);
  formData.append("dueDate", inputs.dueDate);
  formData.append("doDate", inputs.doDate);
  return await withAuthInstance.post(
    `http://3.36.95.15:8080/api/board/${postId}`,
    formData
  );
};

export const feedlistApi = async (page, schoolId, date, payment, isLogin) => {
  const doDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  if (isLogin) {
    return await withAuthInstance.get(
      GET_FEEDLIST +
        `${schoolId}?page=${page}&size=10&paymentType=${payment}&doDate=${doDate}`
    );
  } else {
    return await withoutAuthInstance.get(
      GET_FEEDLIST +
        `${schoolId}?page=${page}&size=10&paymentType=${payment}&doDate=${doDate}`
    );
  }
};

export const applyApi = async (postId, postDoDateId) => {
  return await withAuthInstance.post(
    APPLY_POST + `${postId}/date/${postDoDateId}/apply`
  );
};

export const bookmarkApi = async (postId) => {
  return await withAuthInstance.post(BOOKMARK_POST + `${postId}/like`);
};

export const stateCompleteApi = async (postId) => {
  return await withAuthInstance.post(STATE_COMPLETE + postId + "/completed");
};

export const feedDeleteApi = async (postId) => {
  return await withAuthInstance.delete(FEED_DELETE + postId);
};
