package com.minibeit.businessprofile.dto;

import com.minibeit.businessprofile.domain.BusinessProfileReview;
import lombok.*;

public class BusinessProfileReviewResponse {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class ReviewId {
        private Long id;

        public static BusinessProfileReviewResponse.ReviewId build(BusinessProfileReview businessProfileReview) {
            return ReviewId.builder().id(businessProfileReview.getId()).build();
        }
    }
}
