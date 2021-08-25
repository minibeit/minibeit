package com.minibeit.businessprofile.dto;

import com.minibeit.businessprofile.domain.BusinessProfile;
import lombok.*;

public class BusinessProfileResponse {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class IdAndName {
        private Long id;
        private String name;

        public static BusinessProfileResponse.IdAndName build(BusinessProfile businessProfile) {
            return IdAndName.builder().id(businessProfile.getId()).name(businessProfile.getName()).build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetOne {
        private Long id;
        private String name;
        private String category;
        private String place;
        private String introduce;
        private String contact;

        public static BusinessProfileResponse.GetOne build(BusinessProfile businessProfile) {
            return GetOne.builder()
                    .id(businessProfile.getId())
                    .name(businessProfile.getName())
                    .category(businessProfile.getCategory())
                    .place(businessProfile.getPlace())
                    .introduce(businessProfile.getIntroduce())
                    .contact(businessProfile.getContact())
                    .build();
        }
    }
}
