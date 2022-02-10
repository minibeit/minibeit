package com.minibeit.user.service.unit;

import com.minibeit.businessprofile.service.unit.MockBusinessProfile;
import com.minibeit.common.exception.DuplicateException;
import com.minibeit.file.avatar.service.unit.MockAvatar;
import com.minibeit.file.service.AvatarService;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.school.service.unit.MockSchool;
import com.minibeit.user.domain.UserValidator;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.domain.repository.UserVerificationCodeRepository;
import com.minibeit.user.service.UserService;
import com.minibeit.user.service.dto.UserResponse;
import com.minibeit.user.service.exception.SchoolNotFoundException;
import com.minibeit.user.service.exception.UserNotFoundException;
import com.minibeit.user.service.exception.UserVerificationCodeNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.minibeit.businessprofile.service.unit.MockBusinessProfile.BusinessProfile1.ID;
import static com.minibeit.user.service.unit.MockUser.MockUser1.*;
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
    SchoolRepository schoolRepository;
    @Mock
    AvatarService avatarService;
    @Mock
    UserVerificationCodeRepository userVerificationCodeRepository;
    @Mock
    UserValidator userValidator;
    @InjectMocks
    UserService userService;

    @Test
    @DisplayName("회원가입 성공")
    public void signup() {
        given(userRepository.existsByNickname(any())).willReturn(Boolean.FALSE);
        given(userRepository.findById(ID)).willReturn(Optional.of(USER));
        given(schoolRepository.findById(MockSchool.School1.ID)).willReturn(Optional.of(MockSchool.School1.SCHOOL));
        given(avatarService.upload(any())).willReturn(MockAvatar.MockAvatar1.AVATAR);

        UserResponse.CreateOrUpdate response = userService.signup(SIGNUP_REQUEST, USER);

        assertThat(response.getId()).isEqualTo(ID);
        assertThat(response.getNickname()).isEqualTo(SIGNUP_REQUEST.getNickname());
        assertThat(response.getSchoolId()).isEqualTo(SIGNUP_REQUEST.getSchoolId());
    }

    @Test
    @DisplayName("회원가입 실패 (중복된 닉네임)")
    public void signupFailDuplicateNickname() {
        given(userRepository.existsByNickname(any())).willReturn(Boolean.TRUE);

        assertThrows(DuplicateException.class, () -> userService.signup(SIGNUP_REQUEST, USER));
    }

    @Test
    @DisplayName("회원가입 실패 (해당 유저가 없는 경우)")
    public void signupFailUserNotFound() {
        given(userRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.signup(SIGNUP_REQUEST, USER));
    }

    @Test
    @DisplayName("회원가입 실패 (해당 학교가 없는 경우)")
    public void signupFailSchoolNotFound() {
        given(userRepository.findById(any())).willReturn(Optional.of(USER));
        given(schoolRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(SchoolNotFoundException.class, () -> userService.signup(SIGNUP_REQUEST, USER));
    }

    @Test
    @DisplayName("개인정보 수정 성공")
    public void update() {
        given(userRepository.findByIdWithAvatar(any())).willReturn(Optional.of(USER));
        given(schoolRepository.findById(SCHOOL_ID)).willReturn(Optional.of(MockSchool.School1.SCHOOL));
        given(userRepository.existsByNickname(any())).willReturn(Boolean.FALSE);
        given(avatarService.upload(any())).willReturn(MockAvatar.MockAvatar1.AVATAR);

        UserResponse.CreateOrUpdate response = userService.update(UPDATE_REQUEST, USER);

        assertThat(response.getNickname()).isEqualTo(UPDATED_NICKNAME);
        verify(avatarService).deleteOne(any());
        verify(avatarService).upload(any());
    }

    @Test
    @DisplayName("개인정보 수정 실패 (중복된 닉네임)")
    public void updateFailDuplicateNickname() {
        given(userRepository.findByIdWithAvatar(any())).willReturn(Optional.of(USER));
        given(schoolRepository.findById(SCHOOL_ID)).willReturn(Optional.of(MockSchool.School1.SCHOOL));
        given(userRepository.existsByNickname(any())).willReturn(Boolean.TRUE);

        assertThrows(DuplicateException.class, () -> userService.update(UPDATE_REQUEST, USER));
    }

    @Test
    @DisplayName("개인정보 수정 실패 (해당 유저가 없는 경우)")
    public void updateFailUserNotFound() {
        given(userRepository.findByIdWithAvatar(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.update(UPDATE_REQUEST, USER));
    }

    @Test
    @DisplayName("개인정보 수정 실패 (해당 학교가 없는 경우)")
    public void updateFailSchoolNotFound() {
        given(userRepository.findByIdWithAvatar(any())).willReturn(Optional.of(USER));
        given(schoolRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(SchoolNotFoundException.class, () -> userService.update(UPDATE_REQUEST, USER));
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
    @DisplayName("중복 닉네임 체크 성공")
    public void nickNameCheck() {
        given(userRepository.existsByNickname(any())).willReturn(Boolean.TRUE);

        assertThrows(DuplicateException.class, () -> userService.nickNameCheck(NICKNAME_REQUEST));
    }

    @Test
    @DisplayName("중복 닉네임 체크 성공")
    public void nickNameCheckNotFound() {
        given(userRepository.existsByNickname(any())).willReturn(Boolean.FALSE);

        userService.nickNameCheck(NICKNAME_REQUEST);
        verify(userRepository).existsByNickname(any());
    }

    @Test
    @DisplayName("내 정보 조회 성공")
    public void getMe() {
        given(userRepository.findByIdWithSchool(any())).willReturn(Optional.of(USER));

        UserResponse.GetOne response = userService.getMe(USER);

        assertThat(response.getId()).isEqualTo(ID);
        verify(userRepository).findByIdWithSchool(any());
    }

    @Test
    @DisplayName("내 정보 조회 실패 (해당 유저가 없는 경우)")
    public void getMeFail() {
        given(userRepository.findByIdWithSchool(any())).willReturn(Optional.empty());

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
        userService.deleteOne(USER);

        verify(userValidator).deleteValidate(any());
        verify(avatarService).deleteOne(any());
        verify(userRepository).delete(any());
    }
}
