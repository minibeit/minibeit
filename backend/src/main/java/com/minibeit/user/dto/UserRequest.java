package com.minibeit.user.dto;

import com.minibeit.user.domain.Gender;
import lombok.*;

public class UserRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Signup {
        private String name;
        private String nickname;
        private Gender gender;
        private String phoneNum;
        private String job;
        private Integer age;
        private Long schoolId;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Login {
        private String id;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class RefreshToken {
        private String refreshToken;
    }
}
