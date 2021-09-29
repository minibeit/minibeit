package com.minibeit.post.dto;

import com.minibeit.post.domain.RejectPost;
import lombok.*;

public class RejectPostResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetList {
        private Long id;
        private String title;
        private String rejectComment;

        public static RejectPostResponse.GetList build(RejectPost rejectPost) {
            return GetList.builder()
                    .id(rejectPost.getId())
                    .title(rejectPost.getTitle())
                    .rejectComment(rejectPost.getRejectComment())
                    .build();
        }
    }
}
