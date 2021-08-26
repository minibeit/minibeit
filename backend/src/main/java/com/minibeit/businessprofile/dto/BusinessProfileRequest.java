package com.minibeit.businessprofile.dto;

import lombok.*;

public class BusinessProfileRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateAndUpdate {
        private String name;
        private String category;
        private String place;
        private String introduce;
        private String contact;
    }
}
