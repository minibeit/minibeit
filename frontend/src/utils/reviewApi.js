
import { API_URLS } from "../constants";
import { withAuthInstance} from "./common";

const { REVIEW_NEW,REVIEW_LIST_GET } = API_URLS;

export const reviewNewApi = async (postId,postDoDateId,newReviewInfo) => {
  return await withAuthInstance.post(REVIEW_NEW+postId+"/review/"+postDoDateId,newReviewInfo);
};

export const reviewListGetApi = async (businessId, page) => {
  return await withAuthInstance.get(REVIEW_LIST_GET+businessId+"/review/list?page="+page+"&size=5");
};


