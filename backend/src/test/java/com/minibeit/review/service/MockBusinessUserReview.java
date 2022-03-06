package com.minibeit.review.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.service.mock.MockBusinessProfile;
import com.minibeit.review.domain.BusinessUserReview;
import com.minibeit.review.domain.BusinessUserReviewDetail;
import com.minibeit.review.service.mock.MockBusinessUserReviewDetail;
import com.minibeit.user.domain.User;
import com.minibeit.user.service.mock.MockUser;

public class MockBusinessUserReview {
    public static class MockBusinessUserReview1 {
        public static final Long ID = 1L;
        public static final User USER= MockUser.MockUser1.USER;
        public static final BusinessProfile BUSINESS_PROFILE= MockBusinessProfile.BusinessProfile1.BUSINESS_PROFILE;
        public static final BusinessUserReviewDetail BUSINESS_USER_REVIEW_DETAIL= MockBusinessUserReviewDetail.MockBusinessUserReviewDetail1.BUSINESS_USER_REVIEW_DETAIL;

        public static final BusinessUserReview BUSINESS_USER_REVIEW = BusinessUserReview.builder()
                .id(ID)
                .user(USER)
                .businessProfile(BUSINESS_PROFILE)
                .businessUserReviewDetail(BUSINESS_USER_REVIEW_DETAIL)
                .build();
    }
}
