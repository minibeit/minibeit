
import { API_URLS } from "../constants";
import { withAuthInstance, withoutAuthInstance } from "./common";

const { REVIEW_NEW } = API_URLS;

export const reviewNewApi = async (postId,postDoDateId,newReviewInfo) => {
  return await withAuthInstance.post(REVIEW_NEW+postId+"/review/"+postDoDateId,newReviewInfo);
};

