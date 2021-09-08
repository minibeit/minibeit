package com.minibeit.user.dto;

import com.minibeit.user.domain.Gender;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

public class UserRequest {
    @Setter
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
        private MultipartFile avatar;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Login {
        private String id;
    }

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Update {
        private String name;
        private String nickname;
        private boolean nicknameChanged;
        private Gender gender;
        private String phoneNum;
        private String job;
        private Integer age;
        private Long schoolId;
        private MultipartFile avatar;
        private boolean avatarChanged;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class RefreshToken {
        private String refreshToken;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Nickname {
        private String nickname;
    }
}
