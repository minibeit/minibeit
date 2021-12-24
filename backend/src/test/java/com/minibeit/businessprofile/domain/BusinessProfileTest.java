package com.minibeit.businessprofile.domain;

import com.minibeit.file.domain.Avatar;
import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@DisplayName("비즈니스프로필 도메인 테스트")
class BusinessProfileTest {

    private User userInBusinessProfile;
    private User admin;

    private Avatar avatar;
    private BusinessProfile businessProfile;
    private BusinessProfile updatedBusinessProfile;

    @BeforeEach
    void setUp() {
        initUsersAndBusinessProfile();
    }

    private void initUsersAndBusinessProfile() {
        admin = User.builder()
                .id(2L)
                .oauthId("3")
                .name("어드민")
                .nickname("테스터3")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();

        businessProfile = BusinessProfile.builder()
                .id(1L)
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(admin)
                .userBusinessProfileList(Collections.singletonList(UserBusinessProfile.builder().id(1L).user(userInBusinessProfile).businessProfile(businessProfile).build()))
                .build();

        updatedBusinessProfile = BusinessProfile.builder()
                .name("수정된 실험실")
                .place("고려대 수정")
                .contact("010-1234-5786")
                .admin(admin)
                .build();

        userInBusinessProfile = User.builder()
                .id(2L)
                .oauthId("1")
                .nickname("테스터1")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .userBusinessProfileList(Collections.singletonList(UserBusinessProfile.builder().businessProfile(businessProfile).build()))
                .build();
    }

    @Test
    @DisplayName("비즈니스프로필 생성")
    void create() {
        avatar = Avatar.builder().id(1L).url("test.url").build();

        BusinessProfile createdBusinessProfile = BusinessProfile.create(businessProfile, avatar, admin);
        assertAll(
                () -> assertThat(createdBusinessProfile.getName()).isEqualTo(businessProfile.getName()),
                () -> assertThat(createdBusinessProfile.getContact()).isEqualTo(businessProfile.getContact())
        );

    }

    @Test
    @DisplayName("비즈니스프로필 수정")
    void update() {
        businessProfile.update(updatedBusinessProfile, admin);

        assertAll(
                () -> assertThat(businessProfile.getName()).isEqualTo(updatedBusinessProfile.getName()),
                () -> assertThat(businessProfile.getContact()).isEqualTo(updatedBusinessProfile.getContact())
        );
    }

    @Test
    @DisplayName("비즈니스프로필의 어드민 변경")
    void changeAdmin() {
        businessProfile.changeAdmin(admin, userInBusinessProfile);
        assertThat(businessProfile.getAdmin()).isEqualTo(userInBusinessProfile);
    }
}