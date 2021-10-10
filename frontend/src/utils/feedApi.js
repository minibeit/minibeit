import { API_URLS } from "../constants";
import { withAuthInstance, withoutAuthInstance } from "./common";
import moment from "moment";

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
    headcount: recruit.headCount,
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
  return await withAuthInstance.post(CREATE_FEED + "/info", data);
};

export const feedAddfileApi = async (postId, files) => {
  const formData = new FormData();
  for (var i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  return await withAuthInstance.post(
    CREATE_FEED + `/${postId}/files`,
    formData
  );
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

export const feedEditApi = async (postId, data) => {
  return await withAuthInstance.put(APPLY_POST + postId, {
    updatedContent: data,
  });
};

export const feedlistApi = async (
  page,
  schoolId,
  date,
  filter,
  category,
  isLogin
) => {
  const doDate = moment(date.date).format("YYYY-MM-DD");
  if (isLogin) {
    return await withAuthInstance.get(
      GET_FEEDLIST +
        `${schoolId}?page=${page}&size=10&category=${category.category}&paymentType=${filter.paymentType}&doDate=${doDate}&minPay=${filter.minPay}&doTime=${filter.doTime}&startTime=${filter.startTime}&endTime=${filter.endTime}`
    );
  } else {
    return await withoutAuthInstance.get(
      GET_FEEDLIST +
        `${schoolId}?page=${page}&size=10&category=${category.category}&paymentType=${filter.paymentType}&doDate=${doDate}&minPay=${filter.minPay}&doTime=${filter.doTime}&startTime=${filter.startTime}&endTime=${filter.endTime}`
    );
  }
};

export const applyApi = async (postDoDateId) => {
  return await withAuthInstance.post(APPLY_POST + `date/${postDoDateId}/apply`);
};

export const bookmarkApi = async (postId) => {
  return await withAuthInstance.post(BOOKMARK_POST + `${postId}/like`);
};

export const stateCompleteApi = async (postId, rejectComment) => {
  const data = {
    rejectComment: rejectComment,
  };
  return await withAuthInstance.post(
    STATE_COMPLETE + postId + "/completed",
    data
  );
};

export const feedDeleteApi = async (postId) => {
  return await withAuthInstance.delete(FEED_DELETE + postId);
};
