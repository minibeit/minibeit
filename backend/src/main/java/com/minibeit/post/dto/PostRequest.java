package com.minibeit.post.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.PostStatus;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public class PostRequest {
    @Setter
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Create {
        private String title;
        private String content;
        private String place;
        private String contact;
        private Payment payment;
        private Integer cache;
        private String goods;
        private boolean condition;
        private String conditionDetail;
        private Integer doTime;
        private Long schoolId;
        private Long businessProfileId;
        private List<MultipartFile> files;
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
        private LocalDateTime startDate;
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
        private LocalDateTime endDate;
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
        private List<LocalDateTime> doDateList;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Apply {
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime doDate;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class ApplyCheck {
        private PostStatus approve;
    }
}
