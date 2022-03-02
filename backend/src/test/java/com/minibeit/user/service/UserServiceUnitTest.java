package com.minibeit.user.service;

import com.minibeit.businessprofile.service.mock.MockBusinessProfile;
import com.minibeit.file.service.integrate.Avatars;
import com.minibeit.school.service.integrate.Schools;
import com.minibeit.school.service.mock.MockSchool;
import com.minibeit.user.domain.UserValidator;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.domain.repository.UserVerificationCodeRepository;
import com.minibeit.user.service.dto.UserResponse;
import com.minibeit.user.service.exception.UserNotFoundException;
import com.minibeit.user.service.exception.UserVerificationCodeNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.minibeit.businessprofile.service.mock.MockBusinessProfile.BusinessProfile1.ID;
import static com.minibeit.user.service.mock.MockUser.MockUser1.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("UserService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class UserServiceUnitTest {
    @Mock
    UserRepository userRepository;
    @Mock
    UserVerificationCodeRepository userVerificationCodeRepository;
    @Mock
    Schools schools;
    @Mock
    Avatars avatars;
    @Mock
    UserValidator userValidator;
    @InjectMocks
    UserService userService;

    @Test
    @DisplayName("회원가입 성공")
    public void signup() {
        given(userRepository.findById(ID)).willReturn(Optional.of(USER));
        given(schools.getOne(MockSchool.School1.ID)).willReturn(MockSchool.School1.SCHOOL);

        UserResponse.CreateOrUpdate response = userService.signup(SIGNUP_REQUEST, USER);

        assertThat(response.getId()).isEqualTo(ID);
        assertThat(response.getNickname()).isEqualTo(SIGNUP_REQUEST.getNickname());
        assertThat(response.getSchoolId()).isEqualTo(SIGNUP_REQUEST.getSchoolId());
        verify(userValidator).nicknameValidate(any());
        verify(avatars).upload(any());
    }

    @Test
    @DisplayName("회원가입 실패 (해당 유저가 없는 경우)")
    public void signupFailUserNotFound() {
        given(userRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.signup(SIGNUP_REQUEST, USER));
    }

    @Test
    @DisplayName("개인정보 수정 성공")
    public void update() {
        given(userRepository.findByIdWithAvatar(any())).willReturn(Optional.of(USER));
        given(schools.getOne(any())).willReturn(MockSchool.School1.SCHOOL);

        userService.update(UPDATE_REQUEST, USER);

        verify(userValidator).updateValidate(any(), any());
        verify(avatars).updateUserAvatar(any(), any(),any());
    }

    @Test
    @DisplayName("개인정보 수정 실패 (해당 유저가 없는 경우)")
    public void updateFailUserNotFound() {
        given(userRepository.findByIdWithAvatar(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.update(UPDATE_REQUEST, USER));
    }

    @Test
    @DisplayName("인증 코드 확인 성공")
    public void codeVerification() {
        given(userVerificationCodeRepository.findByUserIdAndVerificationKinds(any(), any())).willReturn(Optional.of(USER_VERIFICATION_CODE));

        UserResponse.Verification response = userService.codeVerification(ID, VERIFICATION_REQUEST, VERIFICATION_EXPIRY_DATE);

        assertThat(response.getPhoneNum()).isEqualTo(PHONE_NUM);
        assertThat(response.getEmail()).isEqualTo(EMAIL);
        verify(userValidator).verificationCodeValidate(any(), any(), any());
    }

    @Test
    @DisplayName("인증 코드 확인 실패 (해당 인증코드가 없는 경우)")
    public void codeVerificationFail() {
        given(userVerificationCodeRepository.findByUserIdAndVerificationKinds(any(), any())).willReturn(Optional.empty());

        assertThrows(UserVerificationCodeNotFoundException.class, () -> userService.codeVerification(ID, VERIFICATION_REQUEST, VERIFICATION_EXPIRY_DATE));
    }

    @Test
    @DisplayName("내 정보 조회 성공")
    public void getMe() {
        given(userRepository.findById(any())).willReturn(Optional.of(USER));
        given(schools.getOne(SCHOOL_ID)).willReturn(MockSchool.School1.SCHOOL);

        UserResponse.GetOne response = userService.getMe(USER);

        assertThat(response.getId()).isEqualTo(ID);
        verify(userRepository).findById(any());
    }

    @Test
    @DisplayName("내 정보 조회 실패 (해당 유저가 없는 경우)")
    public void getMeFail() {
        given(userRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.getMe(USER));
    }


    @Test
    @DisplayName("비즈니스 프로필에 소속인원 목록 조회")
    public void getListInBusinessProfile() {
        given(userRepository.findAllInBusinessProfile(any())).willReturn(anyList());

        userService.getListInBusinessProfile(MockBusinessProfile.BusinessProfile1.ID);

        verify(userRepository).findAllInBusinessProfile(any());
    }

    @Test
    @DisplayName("해당 글자로 시작하는 닉네임 조회")
    public void searchByNickname() {
        given(userRepository.findByNicknameStartsWith(any())).willReturn(anyList());

        userService.searchByNickname(NICKNAME);

        verify(userRepository).findByNicknameStartsWith(any());
    }

    @Test
    @DisplayName("회원 탈퇴 성공")
    public void deleteOne() {
        given(userRepository.findByIdWithAvatar(any())).willReturn(Optional.of(USER));

        userService.deleteOne(USER);

        verify(userValidator).deleteValidate(any());
        verify(avatars).deleteOne(any());
        verify(userRepository).delete(any());
    }
}
