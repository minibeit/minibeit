package com.minibeit.post.service.unit.mock;

import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.user.domain.User;
import com.minibeit.user.service.unit.MockUser;

public class MockPostApplicant {
    public static class MockPostApplicant1 {
        public static final Long ID = 1L;
        public static final PostDoDate POST_DO_DATE = MockPostDoDate.MockPostDoDate1.POST_DO_DATE;
        public static final User USER = MockUser.MockUser1.USER;
        public static final ApplyStatus APPLY_STATUS = ApplyStatus.WAIT;
        public static final boolean BUSINESS_FINISH = true;
        public static final boolean EVALUATED_BUSINESS = false;
        public static final boolean WRITE_REVIEW = false;
        public static final boolean DEL = false;

        public static final PostApplicant POST_APPLICANT = PostApplicant.builder()
                .id(ID)
                .postDoDate(POST_DO_DATE)
                .user(USER)
                .applyStatus(APPLY_STATUS)
                .businessFinish(BUSINESS_FINISH)
                .writeReview(WRITE_REVIEW)
                .evaluatedBusiness(EVALUATED_BUSINESS)
                .del(DEL)
                .build();
    }
}
