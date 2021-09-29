package com.minibeit.businessprofile.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

public class BusinessProfileRequest {
    @Setter
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Create {
        private String name;
        private String place;
        private String contact;
        private MultipartFile avatar;
    }

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Update {
        private String name;
        private String place;
        private String contact;
        private MultipartFile avatar;
        private boolean avatarChanged;
    }
}
