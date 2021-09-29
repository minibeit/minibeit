package com.minibeit.post.dto;

import lombok.*;

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
}
