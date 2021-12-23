package com.minibeit.post.dto;

import com.minibeit.file.domain.PostFile;
import lombok.*;

public class PostFileDto {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Image {
        private String url;
        private String name;

        public static PostFileDto.Image build(PostFile postFile) {
            if (postFile == null) {
                return null;
            }
            return Image.builder().url(postFile.getUrl()).name(postFile.getName()).build();
        }
    }
}
