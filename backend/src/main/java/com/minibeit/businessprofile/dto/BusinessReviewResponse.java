package com.minibeit.businessprofile.dto;

import com.minibeit.businessprofile.domain.BusinessReviewDetail;
import lombok.*;

public class BusinessReviewResponse {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class IdAndName {
        private Long id;
        private String content;

        public static BusinessReviewResponse.IdAndName build(BusinessReviewDetail businessReviewDetail) {
            return BusinessReviewResponse.IdAndName.builder().id(businessReviewDetail.getId()).content(businessReviewDetail.getContent()).build();
        }
    }
}
