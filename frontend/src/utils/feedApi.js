import { API_URLS } from "../constants";
import { withAuthInstance, withoutAuthInstance } from "./common";
import moment from "moment";

const { API_POST, API_POSTS } = API_URLS;

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
    placeDetail: recruit.detailAddress,
    contact: recruit.contact,
    category: recruit.category,
    headcount: recruit.headCount,
    payment: recruit.payment,
    cache: recruit.payment === "CACHE" ? recruit.pay : null,
    goods: recruit.payment === "GOODS" ? recruit.pay : null,
    paymentDetail: recruit.payMemo,
    condition: recruit.condition,
    conditionDetail: recruit.condition
      ? conditionDetail(recruit.conditionDetail)
      : null,
    doTime: recruit.doTime,
    schoolId: recruit.schoolId,
    businessProfileId: recruit.businessProfile.id,
    startDate: `${moment(recruit.startDate).format("YYYY-MM-DD")}T${moment(
      recruit.startTime
    ).format("HH:mm")}`,
    endDate: `${moment(recruit.endDate).format("YYYY-MM-DD")}T${moment(
      recruit.endTime
    ).format("HH:mm")}`,
    doDateList: recruit.doDateList,
  };

  return await withAuthInstance.post(API_POST + "info", data);
};

export const feedAddfileApi = (postId, files) => {
  const formData = new FormData();
  formData.append("thumbnail", files[0]);
  for (var i = 1; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  return withAuthInstance.post(API_POST + `${postId}/files`, formData);
};

export const feedDetailApi = async (feedId, isLogin) => {
  if (isLogin) {
    return await withAuthInstance.get(API_POST + feedId);
  } else {
    return await withoutAuthInstance.get(API_POST + feedId);
  }
};

export const feedDetailDateApi = async (feedId, yearMonth) => {
  return await withoutAuthInstance.get(
    `/api/post/${feedId}/dates?yearMonth=${yearMonth}`
  );
};
export const feedDetailTimeApi = async (feedId, doDate) => {
  return await withoutAuthInstance.get(
    API_POST + feedId + `/start?doDate=${doDate}`
  );
};

export const feedEditApi = async (postId, data) => {
  return await withAuthInstance.put(API_POST + postId, {
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
      API_POSTS +
        `${schoolId}?page=${page}&size=10&category=${
          category.category
        }&paymentType=${filter.paymentType}&doDate=${doDate}&minPay=${
          filter.paymentType === "CACHE" ? filter.minPay : ""
        }&doTime=${filter.doTime}&startTime=${filter.startTime}&endTime=${
          filter.endTime
        }`
    );
  } else {
    return await withoutAuthInstance.get(
      API_POSTS +
        `${schoolId}?page=${page}&size=10&category=${
          category.category
        }&paymentType=${filter.paymentType}&doDate=${doDate}&minPay=${
          filter.paymentType === "CACHE" ? filter.minPay : ""
        }&doTime=${filter.doTime}&startTime=${filter.startTime}&endTime=${
          filter.endTime
        }`
    );
  }
};

export const applyApi = async (postDoDateId) => {
  return await withAuthInstance.post(API_POST + `date/${postDoDateId}/apply`);
};

export const bookmarkApi = async (postId) => {
  return await withAuthInstance.post(API_POST + `${postId}/like`);
};

export const stateCompleteApi = async (postId, rejectComment) => {
  const data = {
    rejectComment: rejectComment,
  };
  return await withAuthInstance.post(API_POST + postId + "/completed", data);
};

export const feedDeleteApi = async (postId) => {
  return await withAuthInstance.delete(API_POST + postId);
};
