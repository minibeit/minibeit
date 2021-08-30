package com.minibeit.post.dto;

import com.minibeit.post.domain.Post;
import lombok.*;

public class PostResponse {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class OnlyId {
        private Long id;

        public static PostResponse.OnlyId build(Post post) {
            return PostResponse.OnlyId.builder()
                    .id(post.getId())
                    .build();
        }
    }
}
