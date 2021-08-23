package com.minibeit.user.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.minibeit.security.token.Token;
import com.minibeit.user.domain.User;
import lombok.*;

public class UserResponse {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class OnlyId {
        private Long id;
    }

    @Getter
    @Builder
    @NoArgsConstructor
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
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetOne {
        private Long id;
        private String name;
        private String nickname;
        private String gender;
        private Integer age;
        private String job;
        private String phoneNum;

        public static UserResponse.GetOne build(User user){
            return GetOne.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .nickname(user.getNickname())
                    .gender(user.getJob())
                    .age(user.getAge())
                    .job(user.getJob())
                    .phoneNum(user.getPhoneNum())
                    .build();
        }
    }
}
