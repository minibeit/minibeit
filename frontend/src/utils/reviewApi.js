import { withAuthInstance, withoutAuthInstance } from "./common";

export const createBusinessReviewApi = (
  businessId,
  postDoDateId,
  reviewData
) => {
  return withAuthInstance.post(
    `/api/business/${businessId}/date/${postDoDateId}/review/${reviewData}`
  );
};

export const viewBusinessReviewApi = (businessId) => {
  return withoutAuthInstance.get(`/api/business/${businessId}/good-reviews`);
};
