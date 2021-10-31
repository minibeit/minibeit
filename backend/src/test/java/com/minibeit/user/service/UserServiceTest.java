package com.minibeit.user.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.avatar.domain.Avatar;
import com.minibeit.avatar.domain.AvatarServer;
import com.minibeit.avatar.domain.AvatarType;
import com.minibeit.avatar.service.AvatarService;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.common.dto.SavedFile;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostApplicantRequest;
import com.minibeit.post.dto.PostDto;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.service.PostApplicantByBusinessService;
import com.minibeit.post.service.PostByBusinessService;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.user.domain.*;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.dto.UserRequest;
import com.minibeit.user.dto.UserResponse;
import com.minibeit.user.service.exception.DuplicateNickNameException;
import com.minibeit.user.service.exception.UserNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@DisplayName("사용자 비즈니스 흐름 테스트")
class UserServiceTest extends ServiceIntegrationTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @MockBean
    private AvatarService avatarService;

    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private BusinessProfileRepository businessProfileRepository;

    @Autowired
    private UserBusinessProfileRepository userBusinessProfileRepository;

    @Autowired
    private PostApplicantByBusinessService postApplicantByBusinessService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostDoDateRepository postDoDateRepository;

    @Autowired
    private PostApplicantRepository postApplicantRepository;

    @Autowired
    private PostByBusinessService postByBusinessService;

    private Avatar avatar;
    private School school;
    private User userInBusinessProfile;
    private User applyUser1;
    private User rejectUser;
    private User applyUser2;
    private BusinessProfile businessProfile;
    private Post recruitPost;
    private PostDoDate recruitPostPostDoDate1;
    private PostDoDate recruitPostPostDoDate2;
    private PostDoDate fullPostPostDoDate2;
    private PostApplicant postApplicantApplyUser;

    @BeforeEach
    public void init() {
        initSchool();
        initUsersAndBusinessProfile();
        initApplyPost();
    }

    private void initSchool() {
        school = School.builder().name("고려대").build();
        schoolRepository.save(school);
    }

    private void initUsersAndBusinessProfile() {
        User apUser = User.builder()
                .oauthId("1")
                .nickname("별")
                .role(Role.USER)
                .gender(Gender.FEMALE)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .school(school)
                .alarm(new Alarm(null, null))
                .build();
        applyUser1 = userRepository.save(apUser);

        User apUser2 = User.builder()
                .oauthId("2")
                .nickname("세모")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .school(school)
                .alarm(new Alarm(null, null))
                .build();
        applyUser2 = userRepository.save(apUser2);

        User businessUser = User.builder()
                .oauthId("3")
                .nickname("동그라미")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .school(school)
                .alarm(new Alarm(null, null))
                .build();
        userInBusinessProfile = userRepository.save(businessUser);

        User dupUser = User.builder()
                .oauthId("4")
                .nickname("달")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .school(school)
                .alarm(new Alarm(null, null))
                .build();
        rejectUser = userRepository.save(dupUser);

        businessProfile = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(userInBusinessProfile)
                .build();
        businessProfile.setCreatedBy(userInBusinessProfile);
        businessProfileRepository.save(businessProfile);
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(userInBusinessProfile, businessProfile));
    }

    private void initApplyPost() {
        PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
                .title("모집중")
                .content("실험 내용")
                .place("고려대학교 연구실")
                .contact("010-1234-1234")
                .category("미디어")
                .headcount(1)
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
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 26, 17, 30)).build()))
                .build();

        Post createdPost = Post.create(createRequest, school, businessProfile);
        recruitPost = postRepository.save(createdPost);

        PostDoDate postDoDate1 = PostDoDate.create(LocalDateTime.of(2021, 9, 29, 9, 30), recruitPost);
        PostDoDate postDoDate2 = PostDoDate.create(LocalDateTime.of(2021, 10, 3, 9, 30), recruitPost);
        PostDoDate postDoDate3 = PostDoDate.create(LocalDateTime.of(2021, 10, 4, 9, 30), recruitPost);
        recruitPostPostDoDate1 = postDoDateRepository.save(postDoDate1);
        fullPostPostDoDate2 = postDoDateRepository.save(postDoDate2);
        recruitPostPostDoDate2 = postDoDateRepository.save(postDoDate3);

        PostApplicant postApplicant1 = PostApplicant.create(postDoDate1, applyUser1);
        postApplicantApplyUser = postApplicantRepository.save(postApplicant1);

        PostApplicant postApplicant2 = PostApplicant.create(postDoDate1, rejectUser);
        postApplicantRepository.save(postApplicant2);

        PostApplicant postApplicant3 = PostApplicant.create(postDoDate2, applyUser2);
        postApplicantRepository.save(postApplicant3);

        List<PostApplicant> postApplicants = Collections.singletonList(postApplicant3);
        postDoDate2.updateFull(postApplicants);

    }

    @Test
    @DisplayName("닉네임 중복 체크 - 성공")
    void nicknameCheck() {
        //given//when//then
        UserRequest.Nickname request = UserRequest.Nickname.builder().nickname("중복안된이름").build();

        userService.nickNameCheck(request);

        Optional<User> user = userRepository.findByNickname(request.getNickname());
        assertThat(user).isEmpty();

    }

    @Test
    @DisplayName("닉네임 중복 체크 - 실패(중복된 이름)")
    void nicknameCheckFailureWhenDuplicateNickname() {

        UserRequest.Nickname request = UserRequest.Nickname.builder().nickname(applyUser1.getNickname()).build();

        assertThatThrownBy(() -> userService.nickNameCheck(request)).isInstanceOf(DuplicateNickNameException.class);

        User findUser = userRepository.findByNickname(request.getNickname()).orElseThrow(UserNotFoundException::new);
        assertThat(findUser.getNickname()).isEqualTo(request.getNickname());
    }

    @Test
    @DisplayName("유저 정보 업데이트 - 성공(다른 정보로 업데이트)")
    void allUpdate() throws IOException {
        //given
        User user = userRepository.findById(applyUser1.getId()).orElseThrow(UserNotFoundException::new);

        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MultipartFile multipartFile = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is);

        UserRequest.Update updateInfo = UserRequest.Update.builder()
                .name("새로운")
                .nickname("뉴닉네임")
                .nicknameChanged(true)
                .gender(Gender.MALE)
                .phoneNum("010-1234-5432")
                .job("대학생")
                .schoolId(school.getId())
                .birth(LocalDate.of(2222, 1, 1))
                .avatar(multipartFile)
                .avatarChanged(true).build();
        SavedFile savedFile = new SavedFile("original", "files", "100", 10L, "avatar.com", 12, 10, true, AvatarType.IMAGE, AvatarServer.S3);

        Avatar avatar = Avatar.create(savedFile);

        given(avatarService.upload(any())).willReturn(avatar);
        userService.update(updateInfo, user);
        //then
        User updatedUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);

        assertThat(updatedUser.getNickname()).isEqualTo(updateInfo.getNickname());
        assertThat(updatedUser.getAvatar().getName()).isEqualTo(avatar.getName());
        assertThat(updatedUser.getBirth()).isEqualTo(updateInfo.getBirth());
        assertThat(updatedUser.getJob()).isEqualTo(updateInfo.getJob());
        assertThat(updatedUser.getPhoneNum()).isEqualTo(updateInfo.getPhoneNum());
        assertThat(updatedUser.getGender()).isEqualTo(updateInfo.getGender());
    }

    @Test
    @DisplayName("유저 정보 업데이트 - 성공(정보 그대로 업데이트)")
    void updateToSameData() throws IOException {
        //given
        User user = userRepository.findById(applyUser1.getId()).orElseThrow(UserNotFoundException::new);
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MultipartFile multipartFile = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is);

        UserRequest.Update updateInfo = UserRequest.Update.builder()
                .name("테스터1")
                .nickname("테스터1")
                .nicknameChanged(false)
                .gender(Gender.MALE)
                .phoneNum("010-1234-1234")
                .job("테스트하는사람")
                .schoolId(school.getId())
                .birth(LocalDate.of(2000, 12, 12))
                .avatar(multipartFile)
                .avatarChanged(true).build();
        SavedFile savedFile = new SavedFile("original", "files", "100", 10L, "avatar.com", 12, 10, true, AvatarType.IMAGE, AvatarServer.S3);

        Avatar avatar = Avatar.create(savedFile);

        given(avatarService.upload(any())).willReturn(avatar);
        userService.update(updateInfo, user);
        //then
        User updatedUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);

        assertThat(updatedUser.getNickname()).isEqualTo(updateInfo.getNickname());
        assertThat(updatedUser.getAvatar().getName()).isEqualTo(avatar.getName());
        assertThat(updatedUser.getBirth()).isEqualTo(updateInfo.getBirth());
        assertThat(updatedUser.getJob()).isEqualTo(updateInfo.getJob());
        assertThat(updatedUser.getPhoneNum()).isEqualTo(updateInfo.getPhoneNum());
        assertThat(updatedUser.getGender()).isEqualTo(updateInfo.getGender());
    }

    @Test
    @DisplayName("유저 정보 업데이트 - 실패(중복된 닉네임 사용)")
    void updateFailureWhenNicknameDuplicate() throws IOException {
        //given
        User user = userRepository.findById(applyUser1.getId()).orElseThrow(UserNotFoundException::new);

        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MultipartFile multipartFile = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is);

        UserRequest.Update updateInfo = UserRequest.Update.builder()
                .name("테스터1")
                .nickname("별")
                .nicknameChanged(true)
                .gender(Gender.MALE)
                .phoneNum("010-1234-5678")
                .job("테스트하는사람")
                .schoolId(school.getId())
                .birth(LocalDate.of(2000, 12, 12))
                .avatar(multipartFile)
                .avatarChanged(true).build();

        //when
        assertThatThrownBy(() -> userService.update(updateInfo, user))
                .isInstanceOf(DuplicateNickNameException.class);
        //then
        User noUpdatedUser = userRepository.findById(applyUser1.getId()).orElseThrow(UserNotFoundException::new);
        assertThat(noUpdatedUser.getNickname()).isEqualTo(applyUser1.getNickname());
        assertThat(noUpdatedUser.getPhoneNum()).isEqualTo(applyUser1.getPhoneNum());

    }

    @Test
    @DisplayName("내정보 조회 - 성공")
    void getMe() {
        //given
        //when
        UserResponse.GetOne me = userService.getMe(applyUser1);
        //then
        assertAll(
                () -> assertThat(applyUser1.getNickname()).isEqualTo(me.getNickname()),
                () -> assertThat(applyUser1.getBirth()).isEqualTo(me.getBirth()),
                () -> assertThat(applyUser1.getJob()).isEqualTo(me.getJob()),
                () -> assertThat(applyUser1.getPhoneNum()).isEqualTo(me.getPhoneNum()),
                () -> assertThat(applyUser1.getName()).isEqualTo(me.getName()),
                () -> assertThat(applyUser1.getGender().name()).isEqualTo(me.getGender())
        );


    }

    @Test
    @DisplayName("비즈니스 프로필 조회 - 성공")
    void getListInBusinessProfile() {
        //given
        final int sharedBusinessProfileUsers = 1;
        //when
        List<UserResponse.IdAndNickname> listInBusinessProfile = userService.getListInBusinessProfile(businessProfile.getId());

        //then
        assertThat(listInBusinessProfile.get(0).getId()).isEqualTo(userInBusinessProfile.getId());
        assertThat(listInBusinessProfile.get(0).getNickname()).isEqualTo(userInBusinessProfile.getNickname());
        assertThat(listInBusinessProfile.size()).isEqualTo(sharedBusinessProfileUsers);

    }

    @Test
    @DisplayName("비즈니스 프로필 조회 - 성공(유저가 아무도 없을 때)")
    void getListInBusinessProfileWhenNoUser() {
        //given
        final int sharedBusinessProfileUsers = 0;

        BusinessProfile businessProfile = BusinessProfile.builder()
                .id(1L)
                .name("연구소")
                .place("고려대")
                .contact("연락처")
                .admin(userInBusinessProfile)
                .avatar(avatar)
                .build();
        businessProfile.setCreatedBy(userInBusinessProfile);
        businessProfileRepository.save(businessProfile);

        //when
        List<UserResponse.IdAndNickname> listInBusinessProfile = userService.getListInBusinessProfile(businessProfile.getId());

        assertAll(
                () -> assertThat(listInBusinessProfile.size()).isEqualTo(sharedBusinessProfileUsers),
                () -> assertDoesNotThrow(UserNotFoundException::new)
        );

    }

    @Test
    @DisplayName("유저 정보 업데이트하고 이전 닉네임으로 중복 확인하기 - 성공")
    void userUpdateAndCheckPreviousNickname() throws IOException {
        User user = userRepository.findById(userInBusinessProfile.getId()).orElseThrow(UserNotFoundException::new);
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MultipartFile multipartFile = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is);

        UserRequest.Update updateInfo = UserRequest.Update.builder()
                .name("테스터1")
                .nickname("새로운 닉네임")
                .nicknameChanged(true)
                .gender(Gender.MALE)
                .phoneNum("010-1234-1234")
                .job("테스트하는사람")
                .schoolId(school.getId())
                .birth(LocalDate.of(2000, 12, 12))
                .avatar(multipartFile)
                .avatarChanged(true).build();

        userService.update(updateInfo, user);

        UserRequest.Nickname originalNickName = UserRequest.Nickname.builder().nickname("테스터1").build();

        assertDoesNotThrow(
                () -> userService.nickNameCheck(originalNickName)
        );

    }

    @Test
    @DisplayName("유저 정보 업데이트하고 업데이트한 닉네임으로 중복 확인하기 - 실패")
    void updateFailureWhenCheckUpdatedNickname() throws IOException {
        User user = userRepository.findById(userInBusinessProfile.getId()).orElseThrow(UserNotFoundException::new);
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MultipartFile multipartFile = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is);

        UserRequest.Update updateInfo = UserRequest.Update.builder()
                .name("테스터1")
                .nickname("새로운 닉네임")
                .nicknameChanged(true)
                .gender(Gender.MALE)
                .phoneNum("010-1234-1234")
                .job("테스트하는사람")
                .schoolId(school.getId())
                .birth(LocalDate.of(2000, 12, 12))
                .avatar(multipartFile)
                .avatarChanged(true).build();

        userService.update(updateInfo, user);

        UserRequest.Nickname updatedNickName = UserRequest.Nickname.builder().nickname("새로운 닉네임").build();

        assertThatThrownBy(() -> userService.nickNameCheck(updatedNickName))
                .isInstanceOf(DuplicateNickNameException.class);
    }

    @Test
    @DisplayName("거부된 게시물 생겼을 때 알림 발생 - 성공")
    void getAlarmWhenRejectPost() {
        //given
        User applicant = userRepository.findById(applyUser1.getId()).orElseThrow(UserNotFoundException::new);
        UserResponse.Alaram beforeAlarmState = userService.getNews(applicant);

        //when
        PostApplicantRequest.ApplyReject request = PostApplicantRequest.ApplyReject.builder().comment("적합하지 않습니다").build();
        postApplicantByBusinessService.applyReject(recruitPostPostDoDate1.getId(), applicant.getId(), request,userInBusinessProfile);

        UserResponse.Alaram afterAlarmState = userService.getNews(applicant);
        //then
        assertThat(beforeAlarmState.isRejectedAlarm()).isEqualTo(false);
        assertThat(afterAlarmState.isRejectedAlarm()).isEqualTo(true);
    }

    @Test
    @DisplayName("참여확정된 게시물 생겼을 때 알림 발생 - 성공")
    void getAlarmWhenCompletedPost() {
        //given
        User applicant = userRepository.findById(applyUser1.getId()).orElseThrow(UserNotFoundException::new);
        UserResponse.Alaram beforeAlarmState = userService.getNews(applicant);

        PostRequest.RejectComment rejectComment = PostRequest.RejectComment.builder().rejectComment("거부됨").build();
        postApplicantByBusinessService.applyApprove(recruitPostPostDoDate1.getId(), applyUser1.getId(), userInBusinessProfile);
        postByBusinessService.recruitmentCompleted(recruitPost.getId(), rejectComment, userInBusinessProfile);

        //when
        UserResponse.Alaram afterAlarmState = userService.getNews(applicant);

        assertThat(beforeAlarmState.isApprovedAlarm()).isEqualTo(false);
        assertThat(afterAlarmState.isApprovedAlarm()).isEqualTo(true);
    }

}