package com.minibeit.user.service.unit;

import com.minibeit.user.domain.Gender;
import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;

import java.time.LocalDate;

public class MockUser {
    public static class MockUser1 {
        public static final Long ID = 1L;
        public static final String NAME = "동그라미";
        public static final String JOB = "개발자";
        public static final LocalDate BIRTH = LocalDate.of(2000, 1, 1);
        public static final Gender GENDER = Gender.MALE;
        public static final String EMAIL = "test@test.com";
        public static final SignupProvider SIGNUP_PROVIDER = SignupProvider.MINIBEIT;
        public static final Role ROLE = Role.USER;
        public static final boolean SIGNUP_CHECK = true;
        public static final String OAUTH_ID = "1";
        public static final String PHONE_NUM = "010-1234-1234";

        public static final User USER = User.builder()
                .id(ID)
                .name(NAME)
                .job(JOB)
                .birth(BIRTH)
                .gender(GENDER)
                .email(EMAIL)
                .provider(SIGNUP_PROVIDER)
                .role(ROLE)
                .signupCheck(SIGNUP_CHECK)
                .oauthId(OAUTH_ID)
                .phoneNum(PHONE_NUM).build();
    }

    public static class MockUser2 {
        public static final Long ID = 2L;
        public static final String NAME = "세모";
        public static final String JOB = "개발자";
        public static final LocalDate BIRTH = LocalDate.of(2001, 1, 1);
        public static final Gender GENDER = Gender.MALE;
        public static final String EMAIL = "test2@test.com";
        public static final SignupProvider SIGNUP_PROVIDER = SignupProvider.MINIBEIT;
        public static final Role ROLE = Role.USER;
        public static final boolean SIGNUP_CHECK = true;
        public static final String OAUTH_ID = "2";
        public static final String PHONE_NUM = "010-1234-5678";

        public static final User USER = User.builder()
                .id(ID)
                .name(NAME)
                .job(JOB)
                .birth(BIRTH)
                .gender(GENDER)
                .email(EMAIL)
                .provider(SIGNUP_PROVIDER)
                .role(ROLE)
                .signupCheck(SIGNUP_CHECK)
                .oauthId(OAUTH_ID)
                .phoneNum(PHONE_NUM).build();
    }
}
