package com.minibeit.post.service.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

public class PostApplicantRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class ApplyReject {
        @NotBlank(message = "반려 사유가 공백일 수 없습니다.")
        private String comment;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class AttendChange {
        private Boolean isAttend;
    }
}
