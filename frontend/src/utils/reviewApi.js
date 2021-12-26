import { API_URLS } from "../constants";
import { withAuthInstance, withoutAuthInstance } from "./common";

const { API_BUSINESS } = API_URLS;

export const createBusinessReviewApi = (
  businessId,
  postDoDateId,
  reviewData
) => {
  return withAuthInstance.post(
    API_BUSINESS + `${businessId}/date/${postDoDateId}/review/${reviewData}`
  );
};

export const viewBusinessReviewApi = (businessId) => {
  return withoutAuthInstance.get(`/api/business/${businessId}/good-reviews`);
};
