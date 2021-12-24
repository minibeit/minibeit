package com.minibeit.businessprofile.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.businessprofile.service.exception.UserBusinessProfileNotFoundException;
import com.minibeit.common.exception.DuplicateException;
import com.minibeit.common.exception.InvalidOperationException;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.service.dto.PostDto;
import com.minibeit.post.service.dto.PostRequest;
import com.minibeit.postapplicant.domain.ApplyStatus;
import com.minibeit.postapplicant.domain.PostApplicant;
import com.minibeit.postapplicant.domain.repository.PostApplicantRepository;
import com.minibeit.school.domain.School;
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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;


@DisplayName("비즈니스프로필 흐름 테스트")
class BusinessProfileServiceTest extends ServiceIntegrationTest {
    @Autowired
    private PostApplicantRepository postApplicantRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostDoDateRepository postDoDateRepository;
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private BusinessProfileRepository businessProfileRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserBusinessProfileRepository userBusinessProfileRepository;
    @Autowired
    private BusinessProfileService businessProfileService;

    private BusinessProfile businessProfile;
    private BusinessProfile emptyBusinessProfile;
    private BusinessProfileRequest.Update request;

    private User userInBusinessProfile, anotherUser, admin;
    private User approveUser1;
    private User approveUser2;
    private User waitUser1;
    private User waitUser2;

    private UserBusinessProfile cancelUserBusinessProfile;

    private PostApplicant postApplicant1;
    private PostApplicant postApplicant2;

    private School school;

    private PostRequest.CreateInfo createInfoRequest;
    private ArrayList<PostDoDate> postDoDates;

    private final int originalSharedBusinessProfileUsers = 2;

    @BeforeEach
    void set() {
        initSchool();
        initUsersAndBusinessProfile();
        initPostRequest();
        initPost();
        initUpdateRequest();
    }

    private void initSchool() {
        school = School.builder().name("고려대").build();
        schoolRepository.save(school);
    }

    private void initPostRequest() {
        createInfoRequest = PostRequest.CreateInfo.builder()
                .title("커피를 얼마나 마셔야 잠을 못잘까~?")
                .content("실험 내용")
                .place("고려대학교 연구실")
                .contact("010-1234-1234")
                .category("미디어")
                .headcount(10)
                .payment(Payment.CACHE)
                .cache(10000)
                .goods(null)
                .paymentDetail("계좌로 지급해드립니다.")
                .condition(true)
                .conditionDetail("커피 많이 드시는 사람|")
                .doTime(60)
                .schoolId(school.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 9, 26, 17, 30))
                .endDate(LocalDateTime.of(2021, 10, 2, 17, 30))
                .doDateList(Arrays.asList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 9, 9, 30)).build(),
                        PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 1, 9, 30)).build(),
                        PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 2, 9, 30)).build(),
                        PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 3, 9, 30)).build()))
                .build();
    }

    private void initPost() {
        Post createdPost = createInfoRequest.toEntity();
        List<PostDoDate> postDoDates = createInfoRequest.toPostDoDates();
        postDoDates.forEach(postDoDate -> postDoDate.assignPost(createdPost));
        createdPost.create(school, businessProfile);
        Post post = postRepository.save(createdPost);
        postDoDateRepository.saveAll(postDoDates);

        PostDoDate postDoDate1 = postDoDates.get(0);
        PostDoDate postDoDate2 = postDoDates.get(1);
        PostDoDate postDoDate3 = postDoDates.get(2);
        PostDoDate postDoDate4 = postDoDates.get(3);
        postDoDateRepository.saveAll(Arrays.asList(postDoDate1, postDoDate2, postDoDate3, postDoDate4));
        postApplicant1 = PostApplicant.create(postDoDate1, approveUser1);
        postApplicant2 = PostApplicant.create(postDoDate2, approveUser2);
        PostApplicant postApplicant3 = PostApplicant.create(postDoDate3, waitUser1);
        PostApplicant postApplicant4 = PostApplicant.create(postDoDate4, waitUser2);
        postApplicant1.updateStatus(ApplyStatus.APPROVE);
        postApplicant2.updateStatus(ApplyStatus.APPROVE);
        postApplicantRepository.saveAll(Arrays.asList(postApplicant1, postApplicant2, postApplicant3, postApplicant4));
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
        approveUser1 = User.builder()
                .oauthId("3")
                .nickname("지원자1")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        approveUser2 = User.builder()
                .oauthId("4")
                .nickname("지원자2")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        waitUser1 = User.builder()
                .oauthId("5")
                .nickname("지원자3")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        waitUser2 = User.builder()
                .oauthId("6")
                .nickname("지원자4")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();

        userRepository.saveAll(Arrays.asList(userInBusinessProfile, anotherUser, admin, approveUser1, approveUser2, waitUser1, waitUser2));

        BusinessProfile businessProfile1 = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(admin)
                .build();
        emptyBusinessProfile = BusinessProfile.builder()
                .name("빈 실험실")
                .place("고려대")
                .contact("010-0101-0011")
                .admin(admin)
                .build();

        businessProfile = businessProfileRepository.save(businessProfile1);
        businessProfileRepository.save(emptyBusinessProfile);
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(admin, businessProfile));
        cancelUserBusinessProfile = userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(userInBusinessProfile, businessProfile));
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
                () -> assertThat(getOne.getAdminNickname()).isEqualTo(businessProfile.getAdmin().getNickname()),
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
                () -> assertThat(getOne.getAdminNickname()).isEqualTo(businessProfile.getAdmin().getNickname()),
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
                () -> assertThat(getOne.getAdminNickname()).isEqualTo(businessProfile.getAdmin().getNickname()),
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
                () -> businessProfileService.delete(emptyBusinessProfile.getId(), admin)
        );
        assertThatThrownBy(
                () -> businessProfileService.getOne(emptyBusinessProfile.getId(), anotherUser)
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

//    @Test
//    @DisplayName("비즈니스 프로필 공유 - 성공(어드민일때)")
//    void sharingBusinessProfile() {
//        businessProfileService.shareBusinessProfile(businessProfile.getId(), anotherUser.getId(), admin);
//        final int afterSharedBusinessProfileUsers = originalSharedBusinessProfileUsers + 1;
//
//        assertAll(
//                () -> assertThat(businessProfile.getUserBusinessProfileList().size()).isEqualTo(afterSharedBusinessProfileUsers),
//                () -> assertThat(businessProfile.getUserBusinessProfileList().get(2).getUser().getId()).isEqualTo(anotherUser.getId())
//        );
//    }

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
        ).isInstanceOf(DuplicateException.class);

        assertThat(businessProfile.getUserBusinessProfileList().size()).isEqualTo(originalSharedBusinessProfileUsers);
    }

    @Test
    @DisplayName("비즈니스 프로필 공유 취소 - 성공")
    void sharingCancel() {
        UserBusinessProfile response = userBusinessProfileRepository.findById(cancelUserBusinessProfile.getId()).orElseThrow(UserBusinessProfileNotFoundException::new);
        assertThat(response.getBusinessProfile().getId()).isEqualTo(businessProfile.getId());
        businessProfileService.cancelShare(businessProfile.getId(), userInBusinessProfile.getId(), admin);

        Optional<UserBusinessProfile> response2 = userBusinessProfileRepository.findById(cancelUserBusinessProfile.getId());

        assertThat(response2).isEqualTo(Optional.empty());
    }

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
        ).isInstanceOf(InvalidOperationException.class);

        assertThat(businessProfile.getUserBusinessProfileList().size()).isEqualTo(originalSharedBusinessProfileUsers);
    }

    @Test
    @DisplayName("어드민 권한 양도 - 성공")
    void transferOfAuthority() {
        businessProfileService.changeAdmin(businessProfile.getId(), userInBusinessProfile.getId(), admin);

        assertThat(businessProfile.getAdmin().getId()).isEqualTo(userInBusinessProfile.getId());
    }

    @Test
    @DisplayName("어드민 권한 양도 - 실패(공유된 유저가 아닐때)")
    void transferOfAuthorityFailureWhenNotSharedUser() {
        assertThatThrownBy(
                () -> businessProfileService.changeAdmin(businessProfile.getId(), anotherUser.getId(), admin)
        ).isInstanceOf(InvalidOperationException.class);
        assertThat(businessProfile.getAdmin().getId()).isEqualTo(admin.getId());
    }

    @Test
    @DisplayName("어드민 권한 양도 - 실패(권한없는 유저가 시도할때)")
    void transferOfAuthorityFailureWhenNotAdmin() {
        assertThatThrownBy(
                () -> businessProfileService.changeAdmin(businessProfile.getId(), userInBusinessProfile.getId(), userInBusinessProfile)
        ).isInstanceOf(PermissionException.class);
        assertThat(businessProfile.getAdmin().getId()).isEqualTo(admin.getId());
    }
}