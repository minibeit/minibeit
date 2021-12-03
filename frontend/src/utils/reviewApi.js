import { API_URLS } from "../constants";
import { withAuthInstance, withoutAuthInstance } from "./common";

const { BPROFILE_REVIEW } = API_URLS;

export const createBusinessReviewApi = (
  businessId,
  postDoDateId,
  reviewData
) => {
  return withAuthInstance.post(
    BPROFILE_REVIEW +
      `${businessId}/date/${postDoDateId}/businessUserReview/${reviewData}`
  );
};

export const viewBusinessReviewApi = (businessId) => {
  return withoutAuthInstance.get(
    BPROFILE_REVIEW + `${businessId}/good-reviews`
  );
};
