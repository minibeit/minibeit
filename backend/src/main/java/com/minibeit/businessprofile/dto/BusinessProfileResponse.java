package com.minibeit.businessprofile.dto;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.user.domain.User;
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
        private String adminNickName;
        private String place;
        private String contact;
        private Integer numberOfEmployees;
        private String avatar;
        private boolean isAdmin;

        public static BusinessProfileResponse.GetOne build(BusinessProfile businessProfile, User user) {
            GetOneBuilder getOneBuilder = GetOne.builder()
                    .id(businessProfile.getId())
                    .name(businessProfile.getName())
                    .adminNickName(businessProfile.getAdmin().getNickname())
                    .place(businessProfile.getPlace())
                    .contact(businessProfile.getContact())
                    .isAdmin(user.isAdminInBusinessProfile(businessProfile))
                    .numberOfEmployees(businessProfile.getUserBusinessProfileList().size());
            if (businessProfile.getAvatar() != null) {
                return getOneBuilder.avatar(businessProfile.getAvatar().getUrl()).build();
            }
            return getOneBuilder.build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetList {
        private Long id;
        private String name;
        private String avatar;
        private boolean isAdmin;

        public static BusinessProfileResponse.GetList build(BusinessProfile businessProfile, User user) {
            GetListBuilder getListBuilder = GetList.builder()
                    .id(businessProfile.getId())
                    .name(businessProfile.getName())
                    .isAdmin(user.isAdminInBusinessProfile(businessProfile));
            if (businessProfile.getAvatar() != null) {
                getListBuilder.avatar(businessProfile.getAvatar().getUrl()).build();
            }
            return getListBuilder.build();
        }
    }
}
