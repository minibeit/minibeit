package com.minibeit.post.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.minibeit.post.domain.RejectPost;
import lombok.*;

import java.time.LocalDateTime;

public class RejectPostResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetList {
        private Long id;
        private String title;
        private String rejectComment;
        private String contact;
        private boolean recruitCondition;
        private String category;
        private String address;
        private String addressDetail;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime doDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startTime;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endTime;
        private String businessName;


        public static RejectPostResponse.GetList build(RejectPost rejectPost) {
            return GetList.builder()
                    .id(rejectPost.getId())
                    .title(rejectPost.getTitle())
                    .rejectComment(rejectPost.getRejectComment())
                    .contact(rejectPost.getContact())
                    .recruitCondition(rejectPost.getRecruitCondition())
                    .category(rejectPost.getCategory())
                    .address(rejectPost.getPlace())
                    .addressDetail(rejectPost.getPlaceDetail())
                    .doDate(rejectPost.getDoDate())
                    .startTime(rejectPost.getDoDate())
                    .endTime(rejectPost.getDoDate().plusMinutes(rejectPost.getDoTime()))
                    .businessName(rejectPost.getBusinessProfileName())
                    .build();
        }
    }
}
