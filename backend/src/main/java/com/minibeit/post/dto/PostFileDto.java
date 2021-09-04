package com.minibeit.post.dto;

import com.minibeit.post.domain.PostFile;
import lombok.*;

public class PostFileDto {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Image {
        private String url;

        public static PostFileDto.Image build(PostFile postFile) {
            if (postFile == null) {
                return null;
            }
            return PostFileDto.Image.builder().url(postFile.getUrl()).build();
        }
    }
}