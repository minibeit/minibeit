package com.minibeit.post.service.unit;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.service.unit.MockBusinessProfile;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostStatus;
import com.minibeit.school.domain.School;
import com.minibeit.school.service.unit.MockSchool;

import java.time.LocalDateTime;

public class MockPost {
    public static class MockPost1 {
        public static final Long ID = 1L;
        public static final String TITLE = "모집글 제목";
        public static final String CONTENT = "모집글 내용";
        public static final String PLACE = "고려대학교";
        public static final String PLACE_DETAIL = "신공학관 123호";
        public static final String CONTACT = "010-1234-1234";
        public static final String CATEGORY = "미디어";
        public static final Integer RECRUIT_PEOPLE = 5;
        public static final Payment PAYMENT = Payment.CACHE;
        public static final Integer PAYMENT_CACHE = 10000;
        public static final String PAYMENT_DETAIL = "즉시 지급합니다.";
        public static final boolean RECRUITMENT_CONDITION = true;
        public static final String RECRUITMENT_CONDITION_DETAIL = "개발자만";
        public static final Integer DO_TIME = 60;
        public static final LocalDateTime START_DATE = LocalDateTime.of(2022, 2, 13, 0, 0);
        public static final LocalDateTime END_DATE = LocalDateTime.of(2022, 2, 15, 0, 0);
        public static final PostStatus POST_STATUS = PostStatus.RECRUIT;
        public static final String THUMBNAIL = "썸네일 url";
        public static final School SCHOOL = MockSchool.School1.SCHOOL;
        public static final BusinessProfile BUSINESS_PROFILE = MockBusinessProfile.BusinessProfile1.BUSINESS_PROFILE;
        public static final boolean DEL = false;


        public static final Post POST = Post.builder()
                .id(ID)
                .title(TITLE)
                .content(CONTENT)
                .place(PLACE)
                .placeDetail(PLACE_DETAIL)
                .contact(CONTACT)
                .category(CATEGORY)
                .recruitPeople(RECRUIT_PEOPLE)
                .payment(PAYMENT)
                .paymentCache(PAYMENT_CACHE)
                .paymentDetail(PAYMENT_DETAIL)
                .recruitCondition(RECRUITMENT_CONDITION)
                .recruitConditionDetail(RECRUITMENT_CONDITION_DETAIL)
                .doTime(DO_TIME)
                .startDate(START_DATE)
                .endDate(END_DATE)
                .postStatus(POST_STATUS)
                .thumbnail(THUMBNAIL)
                .businessProfile(BUSINESS_PROFILE)
                .school(SCHOOL)
                .del(DEL)
                .build();
    }
}
