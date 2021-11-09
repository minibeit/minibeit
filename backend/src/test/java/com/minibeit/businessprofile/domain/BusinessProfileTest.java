package com.minibeit.businessprofile.domain;

import com.minibeit.avatar.domain.Avatar;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("비즈니스프로필 도메인 테스트")
class BusinessProfileTest {

    private User userInBusinessProfile;
    private User admin;
    private Avatar avatar;
    private BusinessProfile businessProfile;
    private BusinessProfileRequest.Create request;


    @BeforeEach
    void setUp() {
        initUsersAndBusinessProfile();
        makeBusinessProfileRequest();
    }

    private void makeBusinessProfileRequest(){
        request = BusinessProfileRequest.Create.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786").build();

    }
    private void initUsersAndBusinessProfile() {
        userInBusinessProfile = User.builder()
                .oauthId("1")
                .nickname("테스터1")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();

        admin = User.builder()
                .oauthId("3")
                .name("어드민")
                .nickname("테스터3")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();

         businessProfile = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(admin)
                .build();
    }

    @Test
    @DisplayName("비즈니스프로필 생성")
    void create() {
        UserBusinessProfile userBusinessProfile = UserBusinessProfile.create(admin);
        avatar = Avatar.builder().id(1L).url("test.url").build();

        BusinessProfile businessProfile = BusinessProfile.create(request, userBusinessProfile, avatar, admin);
        assertAll(
                () -> assertThat(businessProfile.getName()).isEqualTo(request.getName()),
                () -> assertThat(businessProfile.getContact()).isEqualTo(request.getContact())
        );

    }

    @Test
    @DisplayName("비즈니스프로필 수정")
    void update() {
        BusinessProfileRequest.Update updateRequest = BusinessProfileRequest.Update.builder()
                .name("수정된 이름")
                .contact("010-1111-2222")
                .build();

        businessProfile.update(updateRequest);

        assertAll(
                () -> assertThat(businessProfile.getName()).isEqualTo(updateRequest.getName()),
                () -> assertThat(businessProfile.getContact()).isEqualTo(updateRequest.getContact())
        );

    }

    @Test
    @DisplayName("비즈니스프로필의 어드민 변경")
    void changeAdmin(){
        businessProfile.changeAdmin(userInBusinessProfile);
        assertThat(businessProfile.getAdmin()).isEqualTo(userInBusinessProfile);
    }


}