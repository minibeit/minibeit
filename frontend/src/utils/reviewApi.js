import { API_URLS } from "../constants";
import { withAuthInstance } from "./common";

const { REVIEW_NEW, REVIEW_LIST_GET, REVIEW_ONE_READ, EDIT_REVIEW } = API_URLS;

export const reviewNewApi = async (postDoDateId, newReviewInfo) => {
  return await withAuthInstance.post(
    REVIEW_NEW + `date/${postDoDateId}/review`,
    newReviewInfo
  );
};

export const reviewListGetApi = async (businessId, page) => {
  return await withAuthInstance.get(
    REVIEW_LIST_GET + businessId + "/review/list?page=" + page + "&size=10"
  );
};
export const reviewOneReadApi = async (businessProfileReviewId) => {
  return await withAuthInstance.get(REVIEW_ONE_READ + businessProfileReviewId);
};

export const editReviewApi = async (businessProfileReviewId, content) => {
  const data = {
    content: content,
  };
  return await withAuthInstance.put(
    EDIT_REVIEW + businessProfileReviewId,
    data
  );
};
