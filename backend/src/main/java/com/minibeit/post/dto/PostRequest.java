package com.minibeit.post.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.minibeit.post.domain.Payment;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public class PostRequest {
    @Setter
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateInfo {
        private String title;
        private String content;
        private String place;
        private String contact;
        private Payment payment;
        private Integer headcount;
        private Integer cache;
        private String goods;
        private boolean condition;
        private String conditionDetail;
        private Integer doTime;
        private Long schoolId;
        private Long businessProfileId;
        private List<MultipartFile> files;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateDateRule {
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private List<LocalDateTime> doDateList;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateReview {
        private String postTitle;
        private String content;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime doDate;
    }
}
