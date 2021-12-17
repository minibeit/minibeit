package com.minibeit.post.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.minibeit.businessprofile.domain.BusinessProfile;
import lombok.*;

import java.time.LocalDateTime;

public class PostDto {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class BusinessProfileInfo {
        private Long id;
        private String name;
        private String avatar;
        private String contact;
        private String address;
        private String adminName;

        public static PostDto.BusinessProfileInfo build(BusinessProfile businessProfile) {
            BusinessProfileInfoBuilder businessProfileInfoBuilder = BusinessProfileInfo.builder()
                    .id(businessProfile.getId())
                    .name(businessProfile.getName())
                    .address(businessProfile.getContact())
                    .contact(businessProfile.getContact())
                    .adminName(businessProfile.getAdmin().getName());
            if (businessProfile.getAvatar() != null) {
                return businessProfileInfoBuilder.avatar(businessProfile.getAvatar().getUrl()).build();
            }
            return businessProfileInfoBuilder.build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class BusinessProfileSimpleInfo {
        private Long id;
        private String name;

        public static PostDto.BusinessProfileSimpleInfo build(Long id, String name) {
            return BusinessProfileSimpleInfo.builder()
                    .id(id)
                    .name(name)
                    .build();
        }
    }


    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class PostDoDate {
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime doDate;
    }
}
