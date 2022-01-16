package com.minibeit.post.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

public class PostApplicantResponse {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ApplicantInfo {
        private Long postDoDateId;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startTime;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endTime;
        private List<PostApplicantDto.UserInfo> userInfoList;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor
    public static class ApplicantCancelMail {
        private String applicantName;
        private String applicantContact;
        private String postTitle;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime doDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endTime;
        private Long businessProfileId;

        public static ApplicantCancelMail build(String applicantName, String applicantContact, LocalDateTime doDate, Integer time, String postTitle, Long businessProfileId) {
            return ApplicantCancelMail.builder()
                    .applicantName(applicantName)
                    .applicantContact(applicantContact)
                    .doDate(doDate)
                    .endTime(doDate.plusMinutes(time))
                    .postTitle(postTitle)
                    .businessProfileId(businessProfileId)
                    .build();
        }
    }
}
