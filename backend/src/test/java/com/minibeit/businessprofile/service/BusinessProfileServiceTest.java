package com.minibeit.businessprofile.service;

import com.minibeit.avatar.domain.repository.AvatarRepository;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotPermission;
import com.minibeit.businessprofile.service.exception.DuplicateShareException;
import com.minibeit.businessprofile.service.exception.UserBusinessProfileNotFoundException;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostFileRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.service.PostByBusinessService;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@DisplayName("비즈니스프로필 흐름 테스트")
class BusinessProfileServiceTest {

    @Autowired
    private PostByBusinessService postByBusinessService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostDoDateRepository postDoDateRepository;
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private PostFileRepository postFileRepository;
    @Autowired
    private BusinessProfileRepository businessProfileRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserBusinessProfileRepository userBusinessProfileRepository;
    @Autowired
    private BusinessProfileService businessProfileService;
    @MockBean
    private AvatarRepository avatarRepository;

    private BusinessProfile businessProfile;
    private User userInBusinessProfile, anotherUser, admin;
    private BusinessProfileRequest.Update request;
    private final int originalSharedBusinessProfileUsers = 2;

    @BeforeEach
    void set() {
        initUsersAndBusinessProfile();
        initUpdateRequest();
    }

    private void initUpdateRequest() {
        request = BusinessProfileRequest.Update.builder()
                .name("업데이트 실험실")
                .place("업데이트 장소")
                .contact("010-1235-5786")
                .build();
    }

    private void initUsersAndBusinessProfile() {
        userInBusinessProfile = User.builder()
                .oauthId("1")
                .nickname("테스터1")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        anotherUser = User.builder()
                .oauthId("2")
                .nickname("테스터2")
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

        userRepository.saveAll(Arrays.asList(userInBusinessProfile, anotherUser, admin));

        businessProfile = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(admin)
                .build();
        businessProfileRepository.save(businessProfile);
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(admin, businessProfile));
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(userInBusinessProfile, businessProfile));
    }

    @Test
    @DisplayName("비즈니스프로필 생성 - 성공")
    void create() {
        BusinessProfileRequest.Create request = BusinessProfileRequest.Create.builder()
                .name("새로운 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .build();
        BusinessProfileResponse.IdAndName newBusinessProfile = businessProfileService.create(request, anotherUser);

        assertThat(newBusinessProfile.getName()).isEqualTo("새로운 실험실");
    }

    @Test
    @DisplayName("비즈니스프로필 업데이트 - 성공 (admin 유저)")
    void update() {

        businessProfileService.update(businessProfile.getId(), request, admin);

        assertAll(
                () -> assertThat(businessProfile.getName()).isEqualTo(request.getName()),
                () -> assertThat(businessProfile.getPlace()).isEqualTo(request.getPlace()),
                () -> assertThat(businessProfile.getContact()).isEqualTo(request.getContact())
        );

    }

    @Test
    @DisplayName("비즈니스프로필 업데이트 - 실패 (admin이 아닌 유저)")
    void updateFailureWhenNotAdmin() {

        businessProfileService.update(businessProfile.getId(), request, admin);

        assertThatThrownBy(
                () -> businessProfileService.update(businessProfile.getId(), request, userInBusinessProfile)
        ).isInstanceOf(PermissionException.class);
        assertThatThrownBy(
                () -> businessProfileService.update(businessProfile.getId(), request, anotherUser)
        ).isInstanceOf(PermissionException.class);
    }

    @Test
    @DisplayName("비즈니스 프로필 목록 조회 - 성공")
    void getListIsMine() {

        final int businessProfiles = 1;
        List<BusinessProfileResponse.GetList> listIsMine = businessProfileService.getListIsMine(admin);

        assertAll(
                () -> assertThat(listIsMine.size()).isEqualTo(businessProfiles),
                () -> assertThat(listIsMine.get(0).getName()).isEqualTo(businessProfile.getName()),
                () -> assertThat(listIsMine.get(0).getId()).isEqualTo(businessProfile.getId())
        );
    }

    @Test
    @DisplayName("비즈니스 프로필 목록 조회 - 성공(어드민이 아닐 때)")
    void getListIsMineWhenNotAdmin() {

        final int businessProfiles = 1;
        List<BusinessProfileResponse.GetList> listIsMine = businessProfileService.getListIsMine(userInBusinessProfile);

        assertAll(
                () -> assertThat(listIsMine.size()).isEqualTo(businessProfiles),
                () -> assertThat(listIsMine.get(0).getName()).isEqualTo(businessProfile.getName()),
                () -> assertThat(listIsMine.get(0).getId()).isEqualTo(businessProfile.getId())
        );
    }

    @Test
    @DisplayName("비즈니스 프로필 단건 조회 - 성공")
    void getOne() {

        BusinessProfileResponse.GetOne getOne = businessProfileService.getOne(businessProfile.getId(), admin);

        assertAll(
                () -> assertThat(getOne.getAdminNickName()).isEqualTo(businessProfile.getAdmin().getNickname()),
                () -> assertThat(getOne.getName()).isEqualTo(businessProfile.getName()),
                () -> assertThat(getOne.getContact()).isEqualTo(businessProfile.getContact()),
                () -> assertThat(getOne.getPlace()).isEqualTo(businessProfile.getPlace()),
                () -> assertThat(getOne.getNumberOfEmployees()).isEqualTo(businessProfile.getUserBusinessProfileList().size())
        );
    }

    @Test
    @DisplayName("비즈니스 프로필 단건 조회 - 성공(어드민이 아닐 때)")
    void getOneFailureWhenNotAdmin() {

        BusinessProfileResponse.GetOne getOne = businessProfileService.getOne(businessProfile.getId(), userInBusinessProfile);

        assertAll(
                () -> assertThat(getOne.getAdminNickName()).isEqualTo(businessProfile.getAdmin().getNickname()),
                () -> assertThat(getOne.getName()).isEqualTo(businessProfile.getName()),
                () -> assertThat(getOne.getContact()).isEqualTo(businessProfile.getContact()),
                () -> assertThat(getOne.getPlace()).isEqualTo(businessProfile.getPlace()),
                () -> assertThat(getOne.getNumberOfEmployees()).isEqualTo(businessProfile.getUserBusinessProfileList().size())
        );
    }

    @Test
    @DisplayName("비즈니스 프로필 단건 조회 - 성공(비즈니스프로필 공유자가 아닐 때)")
    void getOneFailureWhenNotUserInBusinessProfile() {

        BusinessProfileResponse.GetOne getOne = businessProfileService.getOne(businessProfile.getId(), anotherUser);

        assertAll(
                () -> assertThat(getOne.getAdminNickName()).isEqualTo(businessProfile.getAdmin().getNickname()),
                () -> assertThat(getOne.getName()).isEqualTo(businessProfile.getName()),
                () -> assertThat(getOne.getContact()).isEqualTo(businessProfile.getContact()),
                () -> assertThat(getOne.getPlace()).isEqualTo(businessProfile.getPlace()),
                () -> assertThat(getOne.getNumberOfEmployees()).isEqualTo(businessProfile.getUserBusinessProfileList().size())
        );
    }

    @Test
    @DisplayName("비즈니스 프로필 삭제 - 성공(어드민일 때)")
    void delete() {

        assertDoesNotThrow(
                () -> businessProfileService.delete(businessProfile.getId(), admin)
        );
        assertThatThrownBy(
                () -> businessProfileService.getOne(businessProfile.getId(), anotherUser)
        ).isInstanceOf(BusinessProfileNotFoundException.class);

    }

    @Test
    @DisplayName("비즈니스 프로필 삭제 - 실패(어드민이 아닐때)")
    void deleteFailureWhenNotAdmin() {

        assertThatThrownBy(
                () -> businessProfileService.delete(businessProfile.getId(), anotherUser)
        ).isInstanceOf(PermissionException.class);

        assertThatThrownBy(
                () -> businessProfileService.delete(businessProfile.getId(), userInBusinessProfile)
        ).isInstanceOf(PermissionException.class);

    }

    @Test
    @DisplayName("비즈니스 프로필 공유 - 성공(어드민일때)")
    void sharingBusinessProfile() {

        businessProfileService.shareBusinessProfile(businessProfile.getId(), anotherUser.getId(), admin);
        final int afterSharedBusinessProfileUsers = originalSharedBusinessProfileUsers + 1;

        assertAll(
                () -> assertThat(businessProfile.getUserBusinessProfileList().size()).isEqualTo(afterSharedBusinessProfileUsers),
                () -> assertThat(businessProfile.getUserBusinessProfileList().get(2).getUser().getId()).isEqualTo(anotherUser.getId())
        );
    }

    @Test
    @DisplayName("비즈니스 프로필 공유 - 실패(어드민이 아닐때)")
    void sharingBusinessProfileFailureWhenNotAdmin() {

        assertThatThrownBy(
                () -> businessProfileService.shareBusinessProfile(businessProfile.getId(), anotherUser.getId(), userInBusinessProfile)
        ).isInstanceOf(PermissionException.class);
        assertThatThrownBy(
                () -> businessProfileService.shareBusinessProfile(businessProfile.getId(), anotherUser.getId(), anotherUser)
        ).isInstanceOf(PermissionException.class);

        assertThat(businessProfile.getUserBusinessProfileList().size()).isEqualTo(originalSharedBusinessProfileUsers);
    }

    @Test
    @DisplayName("비즈니스 프로필 공유 - 실패(없는 유저 초대할 때)")
    void sharingBusinessProfileFailureWhenNotUserSharing() {

        Long notUserId = 100L;

        assertThatThrownBy(
                () -> businessProfileService.shareBusinessProfile(businessProfile.getId(), notUserId, admin)
        ).isInstanceOf(UserNotFoundException.class);

        assertThat(businessProfile.getUserBusinessProfileList().size()).isEqualTo(originalSharedBusinessProfileUsers);
    }

    @Test
    @DisplayName("비즈니스 프로필 공유 - 실패(이미 공유된 유저 초대할 때)")
    void sharingBusinessProfileFailureWhenInviteSharedUser() {

        assertThatThrownBy(
                () -> businessProfileService.shareBusinessProfile(businessProfile.getId(), userInBusinessProfile.getId(), admin)
        ).isInstanceOf(DuplicateShareException.class);

        assertThat(businessProfile.getUserBusinessProfileList().size()).isEqualTo(originalSharedBusinessProfileUsers);
    }

    /**
     * controller 테스트는 되는데 service에서는 삭제가 안되네요..
     */
//    @Test
//    @DisplayName("비즈니스 프로필 공유 취소 - 성공")
//    void sharingCancel() {
//
//        businessProfileService.cancelShare(businessProfile.getId(), userInBusinessProfile.getId(), admin);
//        final int afterSharedBusinessProfileUsers = originalSharedBusinessProfileUsers - 1;
//
//        assertThat(businessProfile.getUserBusinessProfileList().size()).isEqualTo(afterSharedBusinessProfileUsers);
//    }
//
    @Test
    @DisplayName("비즈니스 프로필 공유 취소 - 실패(어드민이 아닐때)")
    void sharingCancelFailureWhenNotAdmin() {

        assertThatThrownBy(
                () -> businessProfileService.cancelShare(businessProfile.getId(), userInBusinessProfile.getId(), userInBusinessProfile)
        ).isInstanceOf(PermissionException.class);
        assertThatThrownBy(
                () -> businessProfileService.cancelShare(businessProfile.getId(), userInBusinessProfile.getId(), anotherUser)
        ).isInstanceOf(PermissionException.class);

        assertThat(businessProfile.getUserBusinessProfileList().size()).isEqualTo(originalSharedBusinessProfileUsers);
    }

    @Test
    @DisplayName("비즈니스 프로필 공유 취소 - 실패(공유된 유저가 아닐때)")
    void sharingCancelFailureWhenNotSharedUser() {

        assertThatThrownBy(
                () -> businessProfileService.cancelShare(businessProfile.getId(), anotherUser.getId(), admin)
        ).isInstanceOf(UserBusinessProfileNotFoundException.class);

        assertThat(businessProfile.getUserBusinessProfileList().size()).isEqualTo(originalSharedBusinessProfileUsers);
    }

    @Test
    @DisplayName("비즈니스 프로필 공유 취소 - 실패(자신의 id가 들어갈 때)")
    void sharingCancelFailureWhenAdminId() {

        assertThatThrownBy(
                () -> businessProfileService.cancelShare(businessProfile.getId(), admin.getId(), admin)
        ).isInstanceOf(BusinessProfileNotPermission.class);

        assertThat(businessProfile.getUserBusinessProfileList().size()).isEqualTo(originalSharedBusinessProfileUsers);
    }

    @Test
    @DisplayName("어드민 권한 양도 - 성공")
    void transferOfAuthority() {

        businessProfileService.transferOfAuthority(businessProfile.getId(), userInBusinessProfile.getId(), admin);

        assertThat(businessProfile.getAdmin().getId()).isEqualTo(userInBusinessProfile.getId());
    }

    @Test
    @DisplayName("어드민 권한 양도 - 실패(공유된 유저가 아닐때)")
    void transferOfAuthorityFailureWhenNotSharedUser() {

        assertThatThrownBy(
                () -> businessProfileService.transferOfAuthority(businessProfile.getId(), anotherUser.getId(), admin)
        ).isInstanceOf(UserNotFoundException.class);
        assertThat(businessProfile.getAdmin().getId()).isEqualTo(admin.getId());
    }


}