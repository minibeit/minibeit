package com.minibeit.post.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.minibeit.post.domain.PostStatus;
import com.minibeit.user.domain.Gender;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class PostApplicantResponse {
    @Getter
    @NoArgsConstructor
    public static class UserInfo {
        private Long id;
        private String name;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate birth;
        private Gender gender;
        private String phoneNum;
        private String job;
        private PostStatus status;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startTime;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endTime;

        @Builder
        @QueryProjection
        public UserInfo(Long id, String name, LocalDate birth, Gender gender, String phoneNum, String job, Integer time, PostStatus status, LocalDateTime startTime) {
            this.id = id;
            this.name = name;
            this.birth = birth;
            this.gender = gender;
            this.phoneNum = phoneNum;
            this.job = job;
            this.status = status;
            this.startTime = startTime;
            this.endTime = startTime.plusMinutes(time);
        }
    }
}
