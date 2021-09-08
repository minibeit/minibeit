package com.minibeit.post.dto;

import com.minibeit.businessprofile.domain.BusinessProfile;
import lombok.*;

public class PostDto {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class BusinessProfileInfo {
        private Long id;
        private String name;
        private String avatar;
        private String contact;
        private String address;
        private String introduce;

        public static PostDto.BusinessProfileInfo build(BusinessProfile businessProfile) {
            final BusinessProfileInfoBuilder businessProfileInfoBuilder = BusinessProfileInfo.builder()
                    .id(businessProfile.getId())
                    .name(businessProfile.getName())
                    .address(businessProfile.getContact())
                    .contact(businessProfile.getContact())
                    .introduce(businessProfile.getIntroduce());
            if (businessProfile.getAvatar() != null) {
                return businessProfileInfoBuilder.avatar(businessProfile.getAvatar().getUrl()).build();
            }
            return businessProfileInfoBuilder.build();
        }
    }
}
