package com.minibeit.user.domain;

import com.minibeit.avatar.domain.Avatar;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.school.domain.School;
import com.minibeit.user.dto.UserRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@DisplayName("user 도메인 테스트")
class UserTest {

    private User user1;
    private UserRequest.Signup signUpRequest;
    private School school;
    private Avatar avatar;
    private UserRequest.Update updateRequest;

    @BeforeEach
    void setUp() {
        // given
        avatar = Avatar.builder().id(1L).url("test.url").build();

        school = School.builder().name("고려대").id(1L).build();

        user1 = User.builder()
                .id(1L)
                .oauthId("1")
                .nickname("별")
                .role(Role.USER)
                .gender(Gender.FEMALE)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .school(school)
                .build();

        makeSignupRequest();
        makeUpdateRequest();

    }

    private void makeSignupRequest() {
        signUpRequest = UserRequest.Signup.builder()
                .name("홍길동")
                .birth(LocalDate.of(2002, 3, 23))
                .job("대학생")
                .phoneNum("010-2345-4053")
                .gender(Gender.MALE)
                .nickname("별명")
                .schoolId(1L)
                .interestsIds(List.of(1L)).build();
    }

    private void makeUpdateRequest() {
        updateRequest = UserRequest.Update.builder()
                .name("바뀐이름")
                .birth(LocalDate.of(2002, 3, 30))
                .job("대학생")
                .phoneNum("010-2345-4053")
                .gender(Gender.MALE)
                .nickname("별명")
                .schoolId(1L).build();
    }

    @DisplayName("회원가입")
    @Test
    void signup() {
        user1 = user1.signup(signUpRequest, school, avatar);
        assertAll(
                () -> assertThat(user1.getNickname()).isEqualTo(signUpRequest.getNickname()),
                () -> assertThat(user1.getName()).isEqualTo(signUpRequest.getName())
        );
    }

    @DisplayName("회원정보 수정")
    @Test
    void update() {

        User updatedUser = user1.update(updateRequest, school);
        assertAll(
                () -> assertThat(updatedUser.getNickname()).isEqualTo(updateRequest.getNickname()),
                () -> assertThat(updatedUser.getName()).isEqualTo(updateRequest.getName())
        );
    }

    @DisplayName("아바타 수정")
    @Test
    void updateAvatar() {
        Avatar newAvatar = Avatar.builder().id(2L).url("newTest.url").build();

        user1.updateAvatar(newAvatar);

        assertThat(user1.getAvatar().getId()).isEqualTo(newAvatar.getId());
        assertThat(user1.getAvatar().getUrl()).isEqualTo(newAvatar.getUrl());
    }

    @DisplayName("현재 유저가 비즈니스프로필 어드민인지 확인")
    @Test
    void isAdminInBusinessProfile() {
        BusinessProfile businessProfile1 = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(user1)
                .build();

        assertThat(user1.isAdminInBusinessProfile(businessProfile1)).isEqualTo(true);

    }
}