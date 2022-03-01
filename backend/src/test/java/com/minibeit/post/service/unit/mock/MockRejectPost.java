package com.minibeit.post.service.unit.mock;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.service.unit.MockBusinessProfile;
import com.minibeit.post.domain.RejectPost;
import com.minibeit.user.domain.User;
import com.minibeit.user.service.mock.MockUser;

import java.time.LocalDateTime;

public class MockRejectPost {
    public static class MockRejectPost1 {
        public static final Long ID = 1L;
        public static final String TITLE = "모집글 제목";
        public static final String PLACE = "고려대학교";
        public static final String PLACE_DETAIL = "신공학관 123호";
        public static final String CONTACT = "010-1234-1234";
        public static final String CATEGORY = "미디어";
        public static final boolean RECRUITMENT_CONDITION = true;
        public static final Integer DO_TIME = 60;
        public static final LocalDateTime DO_DATE = LocalDateTime.of(2022, 2, 13, 0, 0);
        public static final BusinessProfile BUSINESS_PROFILE = MockBusinessProfile.BusinessProfile1.BUSINESS_PROFILE;
        public static final String REJECT_COMMENT = "조건에 맞지 않습니다.";
        public static final User USER = MockUser.MockUser1.USER;

        public static final RejectPost REJECT_POST = RejectPost.builder()
                .title(TITLE)
                .place(PLACE)
                .placeDetail(PLACE_DETAIL)
                .category(CATEGORY)
                .contact(CONTACT)
                .recruitCondition(RECRUITMENT_CONDITION)
                .doTime(DO_TIME)
                .doDate(DO_DATE)
                .rejectComment(REJECT_COMMENT)
                .businessProfileName(BUSINESS_PROFILE.getName())
                .user(USER)
                .build();
    }
}
