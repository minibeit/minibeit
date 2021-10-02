package com.minibeit.businessprofile.service;

import com.minibeit.avatar.domain.repository.AvatarRepository;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.common.component.file.S3Uploader;
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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.NoPermissionException;
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



}