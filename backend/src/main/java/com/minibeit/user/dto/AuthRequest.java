package com.minibeit.user.dto;

import com.minibeit.user.domain.Gender;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public class AuthRequest {
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
}
