package com.minibeit.businessprofile.dto;

import com.minibeit.businessprofile.domain.BusinessReviewDetail;
import com.querydsl.core.annotations.QueryProjection;
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

    @Getter
    @Builder
    @NoArgsConstructor
    public static class CountsByReviews {
        private Long id;
        private String content;
        private Long count;

        @Builder
        @QueryProjection
        public CountsByReviews(Long id, String content, Long count) {
            this.id = id;
            this.content = content;
            this.count = count;
        }
    }
}
