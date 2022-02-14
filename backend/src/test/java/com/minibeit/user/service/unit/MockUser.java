package com.minibeit.user.service.unit;

import com.minibeit.school.service.unit.MockSchool;
import com.minibeit.user.domain.*;
import com.minibeit.user.service.dto.UserRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class MockUser {
    public static class MockUser1 {
        public static final Long ID = 1L;
        public static final String NAME = "테스터";
        public static final String NICKNAME = "동그라미";
        public static final String JOB = "개발자";
        public static final LocalDate BIRTH = LocalDate.of(2000, 1, 1);
        public static final Gender GENDER = Gender.MALE;
        public static final String EMAIL = "test@test.com";
        public static final SignupProvider SIGNUP_PROVIDER = SignupProvider.MINIBEIT;
        public static final Role ROLE = Role.USER;
        public static final boolean SIGNUP_CHECK = true;
        public static final String OAUTH_ID = "1";
        public static final String PHONE_NUM = "010-1234-1234";
        public static final Long SCHOOL_ID = 1L;
        public static final MultipartFile MOCK_FILE = new MockMultipartFile("filename", "test".getBytes());

        public static final String UPDATED_NICKNAME = "수정된 동그라미";

        public static final String VERIFICATION_CODE = "test";
        public static final VerificationKinds VERIFICATION_KINDS = VerificationKinds.EMAIL;
        public static final LocalDateTime VERIFICATION_EXPIRY_DATE = LocalDateTime.of(2022, 2, 10, 0, 0);

        public static final User USER = User.builder()
                .id(ID)
                .name(NAME)
                .nickname(NICKNAME)
                .job(JOB)
                .birth(BIRTH)
                .gender(GENDER)
                .email(EMAIL)
                .provider(SIGNUP_PROVIDER)
                .role(ROLE)
                .signupCheck(SIGNUP_CHECK)
                .oauthId(OAUTH_ID)
                .school(MockSchool.School1.SCHOOL)
                .phoneNum(PHONE_NUM).build();

        public static final UserVerificationCode USER_VERIFICATION_CODE = UserVerificationCode.builder()
                .code(VERIFICATION_CODE)
                .verificationKinds(VERIFICATION_KINDS)
                .user(USER)
                .expirationDate(VERIFICATION_EXPIRY_DATE)
                .build();

        public static final UserRequest.Signup SIGNUP_REQUEST = UserRequest.Signup.builder()
                .name(NAME)
                .nickname(NICKNAME)
                .job(JOB)
                .birth(BIRTH)
                .gender(GENDER)
                .email(EMAIL)
                .phoneNum(PHONE_NUM)
                .schoolId(SCHOOL_ID)
                .avatar(MOCK_FILE)
                .build();

        public static final UserRequest.Update UPDATE_REQUEST = UserRequest.Update.builder()
                .name(NAME)
                .nicknameChanged(true)
                .nickname(UPDATED_NICKNAME)
                .job(JOB)
                .birth(BIRTH)
                .gender(GENDER)
                .email(EMAIL)
                .phoneNum(PHONE_NUM)
                .schoolId(SCHOOL_ID)
                .avatar(MOCK_FILE)
                .avatarChanged(true)
                .build();

        public static final UserRequest.Nickname NICKNAME_REQUEST = UserRequest.Nickname.builder().nickname(NICKNAME).build();

        public static final UserRequest.Verification VERIFICATION_REQUEST = UserRequest.Verification.builder()
                .code(VERIFICATION_CODE)
                .verificationKinds(VERIFICATION_KINDS)
                .build();
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
                .school(MockSchool.School1.SCHOOL)
                .phoneNum(PHONE_NUM).build();
    }

    public static class MockUser3 {
        public static final Long ID = 3L;
        public static final String NAME = "네모";
        public static final String JOB = "개발자";
        public static final LocalDate BIRTH = LocalDate.of(2001, 1, 1);
        public static final Gender GENDER = Gender.MALE;
        public static final String EMAIL = "test3@test.com";
        public static final SignupProvider SIGNUP_PROVIDER = SignupProvider.MINIBEIT;
        public static final Role ROLE = Role.USER;
        public static final boolean SIGNUP_CHECK = true;
        public static final String OAUTH_ID = "3";
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
                .school(MockSchool.School1.SCHOOL)
                .phoneNum(PHONE_NUM).build();
    }
}
