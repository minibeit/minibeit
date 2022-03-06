package com.minibeit.review.service.mock;

import com.minibeit.review.domain.BusinessUserReviewDetail;
import com.minibeit.review.domain.BusinessUserReviewEvalType;
import com.minibeit.review.domain.BusinessUserReviewType;

public class MockBusinessUserReviewDetail {
    public static class MockBusinessUserReviewDetail1 {
        public static final Long ID = 1L;
        public static final BusinessUserReviewEvalType EVAL_TYPE = BusinessUserReviewEvalType.GOOD;
        public static final BusinessUserReviewType REVIEW_TYPE = BusinessUserReviewType.B;
        public static final String CONTENT = "시간약속을 잘지켜요.";

        public static final BusinessUserReviewDetail BUSINESS_USER_REVIEW_DETAIL = BusinessUserReviewDetail.builder()
                .id(ID)
                .evalType(EVAL_TYPE)
                .type(REVIEW_TYPE)
                .content(CONTENT)
                .build();
    }
}
