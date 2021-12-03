package com.minibeit.review.dto;

import com.minibeit.review.domain.BusinessUserReviewDetail;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

public class BusinessUserReviewResponse {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class IdAndName {
        private Long id;
        private String content;

        public static BusinessUserReviewResponse.IdAndName build(BusinessUserReviewDetail businessUserReviewDetail) {
            return BusinessUserReviewResponse.IdAndName.builder().id(businessUserReviewDetail.getId()).content(businessUserReviewDetail.getContent()).build();
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
