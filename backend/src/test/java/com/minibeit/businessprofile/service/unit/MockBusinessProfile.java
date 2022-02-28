package com.minibeit.businessprofile.service.unit;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.service.dto.BusinessProfileRequest;
import com.minibeit.user.domain.Avatar;
import com.minibeit.user.domain.User;
import org.springframework.mock.web.MockMultipartFile;

public class MockBusinessProfile {
    public static class BusinessProfile1 {
        public static final Long ID = 1L;
        public static final String NAME = "동그라미";
        public static final String PLACE = "고려대학교";
        public static final String PLACE_DETAIL = "신공학관";
        public static final String CONTACT = "010-1234-1234";
        public static final Long ADMIN_ID = 1L;
        public static final String ADMIN_NAME = "어드민";
        public static final Long AVATAR_ID = 1L;
        public static final String AVATAR_NAME = "file name";
        public static final String UPDATED_NAME = "수정된 동그라미";
        public static final String UPDATED_PLACE = "수정된 고려대학교";
        public static final String UPDATED_PLACE_DETAIL = "수정된 신공학관";
        public static final String UPDATED_CONTACT = "010-5678-5678";

        public static final BusinessProfile BUSINESS_PROFILE = BusinessProfile.builder()
                .id(ID)
                .name(NAME)
                .place(PLACE)
                .placeDetail(PLACE_DETAIL)
                .contact(CONTACT)
                .admin(User.builder().id(ADMIN_ID).name(ADMIN_NAME).build())
                .avatar(Avatar.builder().id(AVATAR_ID).name(AVATAR_NAME).build()).build();

        public static final UserBusinessProfile USER_BUSINESS_PROFILE = UserBusinessProfile.builder()
                .id(ID)
                .build();

        public static final BusinessProfileRequest.Create CREATE_REQUEST = BusinessProfileRequest.Create.builder()
                .name(NAME)
                .place(PLACE)
                .contact(CONTACT)
                .build();

        public static final BusinessProfileRequest.Update UPDATE_REQUEST = BusinessProfileRequest.Update.builder()
                .name(UPDATED_NAME)
                .place(UPDATED_PLACE)
                .placeDetail(UPDATED_PLACE_DETAIL)
                .contact(UPDATED_CONTACT)
                .avatarChanged(true)
                .avatar(new MockMultipartFile("filename", "test".getBytes()))
                .build();
    }
}
