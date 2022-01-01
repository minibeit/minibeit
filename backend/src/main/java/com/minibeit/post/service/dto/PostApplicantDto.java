package com.minibeit.post.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.user.domain.Gender;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class PostApplicantDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class UserInfo {
        private Long id;
        private String name;
        private String email;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate birth;
        private Gender gender;
        private String phoneNum;
        private String job;
        private ApplyStatus status;
        private Boolean isAttend;
        private Long postDoDateId;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startTime;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endTime;
        private Boolean isEvaluable;

        @Builder
        @QueryProjection
        public UserInfo(Long id, String name, String email, LocalDate birth, Gender gender, String phoneNum, String job, Integer time, ApplyStatus status, Boolean isAttend, Long postDoDateId, LocalDateTime startTime, Boolean evaluatedBusiness) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.birth = birth;
            this.gender = gender;
            this.phoneNum = phoneNum;
            this.job = job;
            this.status = status;
            this.isAttend = isAttend;
            this.postDoDateId = postDoDateId;
            this.startTime = startTime;
            this.endTime = startTime.plusMinutes(time);
            this.isEvaluable = LocalDateTime.now().isAfter(endTime) && !evaluatedBusiness;
        }
    }
}
