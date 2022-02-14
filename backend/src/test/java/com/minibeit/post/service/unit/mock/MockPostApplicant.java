package com.minibeit.post.service.unit.mock;

import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.service.dto.PostApplicantRequest;
import com.minibeit.user.domain.User;
import com.minibeit.user.service.unit.MockUser;

public class MockPostApplicant {
    public static class MockPostApplicant1 {
        public static final Long ID = 1L;
        public static final PostDoDate POST_DO_DATE = MockPostDoDate.MockPostDoDate1.POST_DO_DATE;
        public static final User USER = MockUser.MockUser1.USER;
        public static final ApplyStatus APPLY_STATUS = ApplyStatus.APPROVE;
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

    public static class MockPostApplicant2 {
        public static final Long ID = 2L;
        public static final PostDoDate POST_DO_DATE = MockPostDoDate.MockPostDoDate1.POST_DO_DATE;
        public static final User USER = MockUser.MockUser2.USER;
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

    public static class MockPostApplicant3 {
        public static final Long ID = 3L;
        public static final PostDoDate POST_DO_DATE = MockPostDoDate.MockPostDoDate1.POST_DO_DATE;
        public static final User USER = MockUser.MockUser3.USER;
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

        public static final PostApplicantRequest.ApplyReject APPLY_REJECT_REQUEST = PostApplicantRequest.ApplyReject.builder()
                .comment("조건이 맞지 않습니다.")
                .build();

        public static final PostApplicantRequest.AttendChange ATTEND_CHANGE_REQUEST=PostApplicantRequest.AttendChange.builder()
                .isAttend(false)
                .build();
    }
}
