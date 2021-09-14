package com.minibeit.businessprofile.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.minibeit.businessprofile.domain.BusinessProfileReview;
import lombok.*;

import java.time.LocalDateTime;

public class BusinessProfileReviewResponse {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class ReviewId {
        private Long id;

        public static BusinessProfileReviewResponse.ReviewId build(BusinessProfileReview businessProfileReview) {
            return ReviewId.builder().id(businessProfileReview.getId()).build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetOne {
        private Long id;
        private String postTitle;
        private String content;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime doDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startTime;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endTime;

        public static BusinessProfileReviewResponse.GetOne build(BusinessProfileReview businessProfileReview) {
            return GetOne.builder()
                    .id(businessProfileReview.getId())
                    .postTitle(businessProfileReview.getPostTitle())
                    .content(businessProfileReview.getContent())
                    .doDate(businessProfileReview.getDoDate())
                    .startTime(businessProfileReview.getDoDate())
                    .endTime(businessProfileReview.getDoDate().plusMinutes(businessProfileReview.getTime()))
                    .build();
        }
    }
}
