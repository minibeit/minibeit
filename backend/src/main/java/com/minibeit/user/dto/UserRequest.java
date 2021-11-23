package com.minibeit.user.dto;

import com.minibeit.user.domain.Gender;
import com.minibeit.user.domain.VerificationKinds;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public class UserRequest {
    @Setter
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Signup {
        @NotBlank(message = "이름이 공백일 수 없습니다.")
        @Length(max = 50, message = "이름 1자부터 50자까지 입니다.")
        private String name;
        @NotBlank(message = "닉네임이 공백일 수 없습니다.")
        @Length(max = 10, message = "닉네임은 1자부터 10자까지 입니다.")
        private String nickname;
        @Email(message = "이메일 형식이 아닙니다.")
        @NotBlank(message = "이메일이 공백일 수 없습니다.")
        private String email;
        private Gender gender;
        @NotBlank(message = "연락처가 공백일 수 없습니다.")
        private String phoneNum;
        @NotBlank(message = "직업이 공백일 수 없습니다.")
        private String job;
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate birth;
        @NotNull(message = "학교 식별자가 공백일 수 없습니다.")
        private Long schoolId;
        private List<Long> interestsIds;
        private MultipartFile avatar;
    }

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Update {
        @NotBlank(message = "이름이 공백일 수 없습니다.")
        @Length(max = 100, message = "게시물 제목 길이는 1자부터 100자까지 입니다.")
        private String name;
        @NotBlank(message = "닉네임이 공백일 수 없습니다.")
        @Length(max = 10, message = "게시물 제목 길이는 1자부터 10자까지 입니다.")
        private String nickname;
        @Email(message = "이메일 형식이 아닙니다.")
        @NotBlank(message = "이메일이 공백일 수 없습니다.")
        private String email;
        private boolean nicknameChanged;
        private Gender gender;
        @NotBlank(message = "연락처가 공백일 수 없습니다.")
        private String phoneNum;
        @NotBlank(message = "직업이 공백일 수 없습니다.")
        private String job;
        @NotNull(message = "학교 식별자가 공백일 수 없습니다.")
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
    public static class Nickname {
        @NotBlank(message = "닉네임이 공백일 수 없습니다.")
        private String nickname;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Verification {
        @NotBlank(message = "인증코드가 공백일 수 없습니다.")
        private String code;
        private VerificationKinds verificationKinds;
    }
}
