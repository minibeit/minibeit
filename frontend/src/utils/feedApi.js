import { API_URLS } from "../constants";
import { withAuthInstance, withoutAuthInstance } from "./common";

const { FEED_NEW, GET_FEEDLIST } = API_URLS;

export const feedCreateApi = async (inputs) => {
  const formData = new FormData();
  formData.append("title", inputs.title);
  formData.append("content", inputs.content);
  formData.append("place", inputs.place);
  formData.append("payment", inputs.payment);
  if (inputs.payment === "CACHE") {
    formData.append("cache", inputs.cache);
  } else {
    formData.append("goods", inputs.goods);
  }
  formData.append("condition", inputs.condition);
  if (inputs.condition === "true") {
    formData.append("conditionDetail", inputs.conditionDetail);
  }
  formData.append("time", inputs.time);
  if (inputs.files) {
    formData.append("files", inputs.files);
  }
  formData.append("contact", inputs.contact);
  formData.append("startDate", inputs.startDate);
  formData.append("endDate", inputs.endDate);
  formData.append("doDate", inputs.doDate);
  formData.append("schoolId", inputs.school);
  return await withAuthInstance().post(FEED_NEW, formData);
};

export const feedDeleteApi = async (postId) => {
  return await withAuthInstance().delete(
    `http://3.36.95.15:8080/api/board/${postId}`
  );
};

export const feedDetailApi = async (postId) => {
  return await withAuthInstance().get(
    `http://3.36.95.15:8080/api/board/${postId}`
  );
};

export const feedEditApi = async (
  title,
  dueDate,
  doDate,
  pay,
  time,
  place,
  content,
  phoneNum,
  files,
  postId
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("place", place);
  formData.append("pay", pay);
  formData.append("time", time);
  formData.append("files", files);
  formData.append("phoneNum", phoneNum);
  formData.append("dueDate", dueDate);
  formData.append("doDate", doDate);
  return await withAuthInstance().post(
    `http://3.36.95.15:8080/api/board/${postId}`,
    formData
  );
};

export const feedlistApi = async (schoolId, date) => {
  // 일단 페이지와 사이즈 고정으로 해놓음
  const doDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  return await withAuthInstance.get(
    GET_FEEDLIST + `${schoolId}?page=1&size=10&doDate=${doDate}`
  );
};
