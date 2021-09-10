package com.minibeit.user.dto;

import com.minibeit.user.domain.Gender;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

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
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate birth;
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
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate birth;
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
