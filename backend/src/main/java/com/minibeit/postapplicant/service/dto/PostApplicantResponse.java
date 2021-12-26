package com.minibeit.postapplicant.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class PostApplicantResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class ApplicantInfo {
        private Long postDoDateId;
        private List<PostApplicantDto.UserInfo> userInfoList;

        public static List<PostApplicantResponse.ApplicantInfo> dtoToResponse(List<PostApplicantDto.UserInfo> applicantInfoList) {
            Map<Long, List<PostApplicantDto.UserInfo>> collect = applicantInfoList.stream().collect(Collectors.groupingBy(PostApplicantDto.UserInfo::getPostDoDateId));
            List<PostApplicantResponse.ApplicantInfo> result = new ArrayList<>();
            for (Long postDoDateId : collect.keySet()) {
                List<PostApplicantDto.UserInfo> applicantInfos = collect.get(postDoDateId);
                PostApplicantResponse.ApplicantInfo userInfo = PostApplicantResponse.ApplicantInfo.builder().postDoDateId(postDoDateId).userInfoList(applicantInfos).build();
                result.add(userInfo);
            }
            return result;
        }
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
