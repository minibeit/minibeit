package com.minibeit.user.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.minibeit.avatar.domain.Avatar;
import com.minibeit.security.token.Token;
import com.minibeit.user.domain.User;
import lombok.*;

import java.time.LocalDate;

public class UserResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateOrUpdate {
        private Long id;
        private String nickname;
        private Long schoolId;
        private String avatar;

        public static CreateOrUpdate build(User user, Long schoolId, Avatar avatar) {
            CreateOrUpdateBuilder createOrUpdateBuilder = CreateOrUpdate.builder()
                    .id(user.getId())
                    .nickname(user.getNickname())
                    .schoolId(schoolId);
            if (avatar != null) {
                createOrUpdateBuilder.avatar(avatar.getUrl());
            }
            return createOrUpdateBuilder.build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class IdAndNickname {
        private Long id;
        private String nickname;

        public static IdAndNickname build(User user) {
            return IdAndNickname.builder()
                    .id(user.getId())
                    .nickname(user.getNickname())
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Login {
        private Long id;
        private String name;
        private String accessToken;
        @JsonIgnore
        private String refreshToken;

        public static Login build(Long id, String name, Token accessToken, Token refreshToken) {
            return Login.builder()
                    .id(id)
                    .name(name)
                    .accessToken(accessToken.getToken())
                    .refreshToken(refreshToken.getToken())
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetOne {
        private Long id;
        private String name;
        private String nickname;
        private String gender;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate birth;
        private String job;
        private String phoneNum;
        private String schoolName;
        private String avatar;

        public static UserResponse.GetOne build(User user) {
            GetOneBuilder getOneBuilder = GetOne.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .nickname(user.getNickname())
                    .gender(user.getGender().name())
                    .birth(user.getBirth())
                    .job(user.getJob())
                    .phoneNum(user.getPhoneNum())
                    .schoolName(user.getSchool().getName());
            if (user.getAvatar() != null) {
                return getOneBuilder.avatar(user.getAvatar().getUrl()).build();
            }
            return getOneBuilder.build();
        }
    }
}
