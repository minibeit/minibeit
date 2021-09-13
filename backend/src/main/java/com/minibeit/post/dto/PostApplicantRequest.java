package com.minibeit.post.dto;

import lombok.*;

public class PostApplicantRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class ApplyReject {
        private String comment;
    }
}
