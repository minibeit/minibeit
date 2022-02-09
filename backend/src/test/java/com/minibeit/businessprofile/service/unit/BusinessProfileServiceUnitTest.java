package com.minibeit.businessprofile.service.unit;

import com.minibeit.businessprofile.domain.BusinessValidator;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.service.BusinessProfileService;
import com.minibeit.businessprofile.service.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.businessprofile.service.exception.UserBusinessProfileNotFoundException;
import com.minibeit.file.avatar.service.MockAvatar;
import com.minibeit.file.domain.Avatar;
import com.minibeit.file.service.AvatarService;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import com.minibeit.user.service.unit.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.minibeit.businessprofile.service.unit.MockBusinessProfile.BusinessProfile1.*;
import static com.minibeit.user.service.unit.MockUser.MockUser1;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("BusinessProfileService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class BusinessProfileServiceUnitTest {
    @Mock
    BusinessProfileRepository businessProfileRepository;
    @Mock
    UserBusinessProfileRepository userBusinessProfileRepository;
    @Mock
    UserRepository userRepository;
    @Mock
    AvatarService avatarService;
    @Mock
    BusinessValidator businessValidator;
    @InjectMocks
    BusinessProfileService businessProfileService;

    @Test
    @DisplayName("비즈니스 프로필 생성 성공")
    public void create() {
        given(userRepository.findByIdWithUserBusinessProfileAndBusiness(MockUser1.ID)).willReturn(Optional.of(MockUser1.USER));
        given(avatarService.upload(any())).willReturn(Avatar.builder().id(MockAvatar.MockAvatar1.ID).build());
        given(businessProfileRepository.save(any())).willReturn(BUSINESS_PROFILE_1);

        BusinessProfileResponse.IdAndName response = businessProfileService.create(CREATE_REQUEST, MockUser1.USER);

        assertThat(response.getId()).isEqualTo(ID);
        verify(businessValidator).createValidate(any());
        verify(businessProfileRepository).save(any());
    }

    @Test
    @DisplayName("비즈니스 프로필 생성 실패 (해당 유저가 없는 경우)")
    public void createFail() {
        given(userRepository.findByIdWithUserBusinessProfileAndBusiness(MockUser1.ID)).willReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> businessProfileService.create(CREATE_REQUEST, MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필 수정 성공")
    public void update() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.of(BUSINESS_PROFILE_1));

        BusinessProfileResponse.IdAndName response = businessProfileService.update(ID, UPDATE_REQUEST, MockUser1.USER);

        verify(businessValidator).adminValidate(any(), any());
        verify(avatarService).deleteOne(any());
        verify(avatarService).upload(any());
        assertThat(response.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @DisplayName("비즈니스 프로필 수정 실패 (해당 비즈니스 프로필이 없는 경우)")
    public void updateFail() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.empty());
        assertThrows(BusinessProfileNotFoundException.class, () -> businessProfileService.update(ID, UPDATE_REQUEST, MockUser1.USER));
    }


    @Test
    @DisplayName("비즈니스 프로필 초대 성공")
    public void invite() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.of(BUSINESS_PROFILE_1));
        given(userRepository.findByIdWithUserBusinessProfileAndBusiness(any())).willReturn(Optional.of(MockUser1.USER));

        businessProfileService.invite(ID, MockUser.MockUser2.ID, MockUser1.USER);

        verify(businessValidator).inviteValidate(any(), any(), any());
        verify(userBusinessProfileRepository).save(any());
    }

    @Test
    @DisplayName("비즈니스 프로필 초대 실패 (해당 유저가 없는 경우)")
    public void inviteFail_UserNotFound() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.of(BUSINESS_PROFILE_1));
        given(userRepository.findByIdWithUserBusinessProfileAndBusiness(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> businessProfileService.invite(ID, MockUser.MockUser2.ID, MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필 초대 실패 (해당 비즈니스 프로필이 없는 경우)")
    public void inviteFail_BusinessNotFound() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.empty());

        assertThrows(BusinessProfileNotFoundException.class, () -> businessProfileService.invite(ID, MockUser.MockUser2.ID, MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필 추방 성공")
    public void expel() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.of(BUSINESS_PROFILE_1));
        given(userBusinessProfileRepository.findByUserIdAndBusinessProfileId(any(), any())).willReturn(Optional.of(USER_BUSINESS_PROFILE));

        businessProfileService.expel(ID, MockUser.MockUser2.ID, MockUser1.USER);

        verify(businessValidator).expelValidate(any(), any(), any());
        verify(userBusinessProfileRepository).deleteById(any());
    }

    @Test
    @DisplayName("비즈니스 프로필 추방 실패 (해당 비즈니스 프로필이 없는 경우)")
    public void expelFailBusinessNotFound() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.empty());

        assertThrows(BusinessProfileNotFoundException.class, () -> businessProfileService.expel(ID, MockUser.MockUser2.ID, MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필 추방 실패 (해당 유저가 없는 경우)")
    public void expelFailUserNotFound() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.of(BUSINESS_PROFILE_1));
        given(userBusinessProfileRepository.findByUserIdAndBusinessProfileId(any(), any())).willReturn(Optional.empty());

        assertThrows(UserBusinessProfileNotFoundException.class, () -> businessProfileService.expel(ID, MockUser.MockUser2.ID, MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필 관리자 변경 성공")
    public void changeAdmin() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.of(BUSINESS_PROFILE_1));
        given(userRepository.findByIdWithUserBusinessProfileAndBusiness(any())).willReturn(Optional.of(MockUser1.USER));

        businessProfileService.changeAdmin(ID, MockUser.MockUser2.ID, MockUser1.USER);

        verify(businessValidator).changeAdminValidate(any(), any(), any());
    }

    @Test
    @DisplayName("비즈니스 프로필 관리자 변경 실패 (해당 유저가 없는 경우)")
    public void changeAdminFail_UserNotFound() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.of(BUSINESS_PROFILE_1));
        given(userRepository.findByIdWithUserBusinessProfileAndBusiness(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> businessProfileService.changeAdmin(ID, MockUser.MockUser2.ID, MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필 관리자 변경 실패 (해당 비즈니스 프로필이 없는 경우)")
    public void changeAdminFail_BusinessNotFound() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.empty());

        assertThrows(BusinessProfileNotFoundException.class, () -> businessProfileService.changeAdmin(ID, MockUser.MockUser2.ID, MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필 탈퇴 성공")
    public void leave() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.of(BUSINESS_PROFILE_1));
        given(userBusinessProfileRepository.findByUserIdAndBusinessProfileId(any(), any())).willReturn(Optional.of(USER_BUSINESS_PROFILE));

        businessProfileService.leave(ID, MockUser1.USER);

        verify(userBusinessProfileRepository).deleteById(MockUser1.ID);
    }

    @Test
    @DisplayName("비즈니스 프로필 탈퇴 실패 (해당 비즈니스 프로필이 없는 경우)")
    public void leaveFailBusinessNotFound() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.empty());

        assertThrows(BusinessProfileNotFoundException.class, () -> businessProfileService.leave(ID, MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필 탈퇴 실패 (해당 유저가 없는 경우)")
    public void leaveFailUserNotFound() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.of(BUSINESS_PROFILE_1));
        given(userBusinessProfileRepository.findByUserIdAndBusinessProfileId(any(), any())).willReturn(Optional.empty());

        assertThrows(UserBusinessProfileNotFoundException.class, () -> businessProfileService.leave(ID, MockUser1.USER));
    }

    @Test
    @DisplayName("자신의 비즈니스 프로필 목록 조회 성공")
    public void getListIsMine() {
        given(businessProfileRepository.findAllByUserId(ID)).willReturn(anyList());

        businessProfileService.getListIsMine(MockUser1.USER);

        verify(businessProfileRepository).findAllByUserId(MockUser1.ID);
    }

    @Test
    @DisplayName("비즈니스 프로필 단건 조회 성공")
    public void getOne() {
        given(businessProfileRepository.findByIdWithAdmin(ID)).willReturn(Optional.of(BUSINESS_PROFILE_1));

        businessProfileService.getOne(ID, MockUser1.USER);

        verify(businessProfileRepository).findByIdWithAdmin(ID);
    }

    @Test
    @DisplayName("비즈니스 프로필 단건 조회 실패 (해당 비즈니스프로필이 없는 경우)")
    public void getOneFail() {
        given(businessProfileRepository.findByIdWithAdmin(ID)).willReturn(Optional.empty());

        assertThrows(BusinessProfileNotFoundException.class, () -> businessProfileService.getOne(ID, MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필 삭제 성공")
    public void delete() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.of(BUSINESS_PROFILE_1));

        businessProfileService.delete(ID, MockUser1.USER);

        verify(businessValidator).deleteValidate(any(), any());
        verify(avatarService).deleteOne(any());
        verify(businessProfileRepository).deleteById(ID);
    }

    @Test
    @DisplayName("비즈니스 프로필 삭제 실패 (해당 비즈니스프로필이 없는 경우)")
    public void deleteFail() {
        given(businessProfileRepository.findById(ID)).willReturn(Optional.empty());

        assertThrows(BusinessProfileNotFoundException.class, () -> businessProfileService.delete(ID, MockUser1.USER));
    }
}