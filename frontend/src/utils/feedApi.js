
import { API_URLS } from "../constants";
import { withAuthInstance } from "./common";

const { FEED_NEW } = API_URLS;

export const feedCreateApi = async (
  title,
  dueDate,
  doDate,
  payment,
  time,
  place,
  content,
  contact,
  files,
  school,
  cache,
  goods,
  condition,
  conditionDetail,
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("place", place);
  formData.append("payment", payment);
  if (payment ==="CACHE") {
    formData.append("cache", cache);
  }else{
    formData.append("goods", goods);
  }
  formData.append("condition", condition);
  if (condition === "true") {
    formData.append("conditionDetail", conditionDetail);
  }
  formData.append("time", time);
  if (files) {
    formData.append("files", files);
  }
  formData.append("contact", contact);
  formData.append("dueDate", dueDate);
  formData.append("doDate", doDate);
  formData.append("schoolId", school);
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

export const feedlistApi = async (school, date, page, size) => {
  const result = await withAuthInstance().get(
    `http://3.36.95.15:8080/api/board/school/${school}/list?date=${date}&page=${page}&size=${size}`
  );
  const data = {
    post: result.data.content,
    endpage: result.data.totalPages,
    totalElement: result.data.totalElements,
  };

  return data;
};
