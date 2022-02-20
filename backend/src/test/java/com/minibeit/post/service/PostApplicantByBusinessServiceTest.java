//package com.minibeit.post.service;
//
//import com.minibeit.ServiceIntegrationTest;
//import com.minibeit.businessprofile.domain.BusinessProfile;
//import com.minibeit.businessprofile.domain.UserBusinessProfile;
//import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
//import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
//import com.minibeit.common.exception.InvalidOperationException;
//import com.minibeit.common.exception.PermissionException;
//import com.minibeit.post.domain.Payment;
//import com.minibeit.post.domain.Post;
//import com.minibeit.post.domain.PostDoDate;
//import com.minibeit.post.domain.RejectPost;
//import com.minibeit.post.domain.repository.PostDoDateRepository;
//import com.minibeit.post.domain.repository.PostRepository;
//import com.minibeit.post.domain.repository.RejectPostRepository;
//import com.minibeit.post.service.dto.PostDto;
//import com.minibeit.post.service.dto.PostRequest;
//import com.minibeit.post.domain.ApplyStatus;
//import com.minibeit.post.domain.PostApplicant;
//import com.minibeit.post.domain.repository.PostApplicantRepository;
//import com.minibeit.post.service.dto.PostApplicantRequest;
//import com.minibeit.post.service.exception.PostApplicantNotFoundException;
//import com.minibeit.school.domain.School;
//import com.minibeit.school.domain.SchoolRepository;
//import com.minibeit.user.domain.Role;
//import com.minibeit.user.domain.SignupProvider;
//import com.minibeit.user.domain.User;
//import com.minibeit.user.domain.repository.UserRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.time.LocalDateTime;
//import java.util.Arrays;
//import java.util.Collections;
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.assertj.core.api.Assertions.assertThatThrownBy;
//
//@DisplayName("PostApplicantService by Business 흐름 테스트")
//class PostApplicantByBusinessServiceTest extends ServiceIntegrationTest {
//    @Autowired
//    private PostApplicantByBusinessService postApplicantByBusinessService;
//    @Autowired
//    private PostRepository postRepository;
//    @Autowired
//    private PostDoDateRepository postDoDateRepository;
//    @Autowired
//    private PostApplicantRepository postApplicantRepository;
//    @Autowired
//    private SchoolRepository schoolRepository;
//    @Autowired
//    private BusinessProfileRepository businessProfileRepository;
//    @Autowired
//    private UserRepository userRepository;
//    @Autowired
//    private UserBusinessProfileRepository userBusinessProfileRepository;
//    @Autowired
//    private RejectPostRepository rejectPostRepository;
//
//    private User userInBusinessProfile;
//    private User applyUser1;
//    private User rejectUser;
//    private User applyUser2;
//    private User notApplyUser;
//    private User notAttendUser;
//    private User approvedUser;
//    private School school;
//    private BusinessProfile businessProfile;
//    private Post recruitPost;
//    private PostDoDate recruitPostPostDoDate1;
//    private PostDoDate recruitPostPostDoDate2;
//    private PostDoDate recruitPostPostDoDate3;
//    private PostDoDate fullPostPostDoDate2;
//    private PostApplicant postApplicantApplyUser;
//
//    @BeforeEach
//    public void init() {
//        initSchool();
//        initUsersAndBusinessProfile();
//        initApplyPost();
//    }
//
//    private void initSchool() {
//        school = School.builder().name("고려대").build();
//        schoolRepository.save(school);
//    }
//
//    private void initUsersAndBusinessProfile() {
//        User apUser = User.builder()
//                .oauthId("1")
//                .nickname("별")
//                .role(Role.USER)
//                .signupCheck(true)
//                .provider(SignupProvider.KAKAO)
//                .build();
//        applyUser1 = userRepository.save(apUser);
//
//        User apUser2 = User.builder()
//                .oauthId("2")
//                .nickname("세모")
//                .role(Role.USER)
//                .signupCheck(true)
//                .provider(SignupProvider.KAKAO)
//                .build();
//        applyUser2 = userRepository.save(apUser2);
//
//        User apUser3 = User.builder()
//                .oauthId("5")
//                .nickname("동글동글")
//                .role(Role.USER)
//                .signupCheck(true)
//                .provider(SignupProvider.KAKAO)
//                .build();
//        approvedUser = userRepository.save(apUser3);
//
//        User businessUser = User.builder()
//                .oauthId("3")
//                .nickname("동그라미")
//                .role(Role.USER)
//                .signupCheck(true)
//                .provider(SignupProvider.KAKAO)
//                .build();
//        userInBusinessProfile = userRepository.save(businessUser);
//
//        User dupUser = User.builder()
//                .oauthId("4")
//                .nickname("달")
//                .role(Role.USER)
//                .signupCheck(true)
//                .provider(SignupProvider.KAKAO)
//                .build();
//        rejectUser = userRepository.save(dupUser);
//
//        User notAUser = User.builder()
//                .oauthId("4")
//                .nickname("달")
//                .role(Role.USER)
//                .signupCheck(true)
//                .provider(SignupProvider.KAKAO)
//                .build();
//        notApplyUser = userRepository.save(notAUser);
//
//        User notAtUser = User.builder()
//                .oauthId("5")
//                .nickname("해")
//                .role(Role.USER)
//                .signupCheck(true)
//                .provider(SignupProvider.KAKAO)
//                .build();
//        notAttendUser = userRepository.save(notAtUser);
//
//        businessProfile = BusinessProfile.builder()
//                .name("동그라미 실험실")
//                .place("고려대")
//                .contact("010-1234-5786")
//                .admin(userInBusinessProfile)
//                .build();
//        businessProfileRepository.save(businessProfile);
//        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(userInBusinessProfile, businessProfile));
//    }
//
//    private void initApplyPost() {
//        PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
//                .title("모집중")
//                .content("실험 내용")
//                .place("고려대학교 연구실")
//                .contact("010-1234-1234")
//                .category("미디어")
//                .headcount(1)
//                .payment(Payment.CACHE)
//                .cache(10000)
//                .goods(null)
//                .paymentDetail("계좌로 지급해드립니다.")
//                .condition(true)
//                .conditionDetail("커피 많이 드시는 사람|")
//                .doTime(60)
//                .schoolId(school.getId())
//                .businessProfileId(businessProfile.getId())
//                .startDate(LocalDateTime.of(2021, 9, 26, 17, 30))
//                .endDate(LocalDateTime.of(2021, 10, 4, 17, 30))
//                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 26, 17, 30)).build()))
//                .build();
//
//        Post createdPost = createRequest.toEntity();
//        createdPost.create(school, businessProfile, request.toPostDoDates(), thumbnail, files);
//        recruitPost = postRepository.save(createdPost);
//
//        PostRequest.CreateInfo createRequest2 = PostRequest.CreateInfo.builder()
//                .title("모집중")
//                .content("실험 내용")
//                .place("고려대학교 연구실")
//                .contact("010-1234-1234")
//                .category("미디어")
//                .headcount(2)
//                .payment(Payment.CACHE)
//                .cache(10000)
//                .goods(null)
//                .paymentDetail("계좌로 지급해드립니다.")
//                .condition(true)
//                .conditionDetail("커피 많이 드시는 사람|")
//                .doTime(60)
//                .schoolId(school.getId())
//                .businessProfileId(businessProfile.getId())
//                .startDate(LocalDateTime.of(2021, 9, 26, 17, 30))
//                .endDate(LocalDateTime.of(2021, 10, 10, 17, 30))
//                .doDateList(Arrays.asList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 29, 9, 30)).build(),
//                        PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 3, 9, 30)).build(),
//                        PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 4, 9, 30)).build(),
//                        PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 4, 10, 0)).build()))
//                .build();
//
//        Post createdPost2 = createRequest2.toEntity();
//        createdPost2.create(school, businessProfile, request.toPostDoDates(), thumbnail, files);
//        Post recruitPost2 = postRepository.save(createdPost);
//        List<PostDoDate> postDoDates2 = createRequest2.toPostDoDates();
//        postDoDates2.forEach(postDoDate -> postDoDate.assignPost(recruitPost2));
//        postDoDateRepository.saveAll(postDoDates2);
//
//        recruitPostPostDoDate1 = postDoDates2.get(0);
//        fullPostPostDoDate2 = postDoDates2.get(1);
//        recruitPostPostDoDate2 = postDoDates2.get(2);
//        recruitPostPostDoDate3 = postDoDates2.get(3);
//
//        PostApplicant postApplicant1 = PostApplicant.create(recruitPostPostDoDate1, applyUser1);
//        postApplicantApplyUser = postApplicantRepository.save(postApplicant1);
//
//        PostApplicant postApplicant2 = PostApplicant.create(recruitPostPostDoDate1, rejectUser);
//        postApplicantRepository.save(postApplicant2);
//
//        PostApplicant postApplicant3 = PostApplicant.create(fullPostPostDoDate2, applyUser2);
//        postApplicantRepository.save(postApplicant3);
//
//        PostApplicant postApplicant4 = PostApplicant.create(recruitPostPostDoDate3, approvedUser);
//        postApplicant4.updateStatus(ApplyStatus.APPROVE);
//        postApplicantRepository.save(postApplicant4);
//
//        PostApplicant postApplicant5 = PostApplicant.create(recruitPostPostDoDate2, approvedUser);
//
//        postApplicantRepository.save(postApplicant5);
//
//        List<PostApplicant> postApplicants = Collections.singletonList(postApplicant3);
//        fullPostPostDoDate2.updateFull(postApplicants);
//
//        PostApplicant postApplicant6 = PostApplicant.create(recruitPostPostDoDate3, notAttendUser);
//        postApplicantRepository.save(postApplicant6);
//    }
//
//    @Test
//    @DisplayName("지원자 참여 approve - 성공")
//    public void applyApprove() {
//        assertThat(recruitPostPostDoDate1.isFull()).isEqualTo(false);
//        postApplicantByBusinessService.applyApprove(recruitPostPostDoDate1.getId(), applyUser1.getId(), userInBusinessProfile);
//
//        PostApplicant postApplicant = postApplicantRepository.findById(postApplicantApplyUser.getId()).orElseThrow(PostApplicantNotFoundException::new);
//
//        assertThat(postApplicant.getApplyStatus()).isEqualTo(ApplyStatus.APPROVE);
//        assertThat(recruitPostPostDoDate1.isFull()).isEqualTo(true);
//    }
//
//    @Test
//    @DisplayName("지원자 참여 approve - 실패(로그인 유저가 비즈니스 프로필 소속이 아닌 경우)")
//    public void applyApproveLoginUserNotInBusinessProfile() {
//        assertThatThrownBy(() -> postApplicantByBusinessService.applyApprove(recruitPostPostDoDate1.getId(), applyUser1.getId(), applyUser2))
//                .isExactlyInstanceOf(PermissionException.class);
//    }
//
//    @Test
//    @DisplayName("지원자 참여 approve - 실패(없는 날짜인 경우)")
//    public void applyApproveNotFoundPostDoDate() {
//        assertThatThrownBy(() -> postApplicantByBusinessService.applyApprove(9999L, applyUser1.getId(), userInBusinessProfile))
//                .isExactlyInstanceOf(PostApplicantNotFoundException.class);
//    }
//
//    @Test
//    @DisplayName("지원자 참여 approve - 실패(없는 참여자인 경우)")
//    public void applyApproveNotFoundPostApplicant() {
//        assertThatThrownBy(() -> postApplicantByBusinessService.applyApprove(recruitPostPostDoDate1.getId(), notApplyUser.getId(), userInBusinessProfile))
//                .isExactlyInstanceOf(PostApplicantNotFoundException.class);
//    }
//
//    @Test
//    @DisplayName("지원자 참여 approve - 실패(모집인원이 가득 찬 경우)")
//    public void applyApprovePostDoDateIsFull() {
//        assertThatThrownBy(() -> postApplicantByBusinessService.applyApprove(fullPostPostDoDate2.getId(), applyUser2.getId(), userInBusinessProfile))
//                .isExactlyInstanceOf(InvalidOperationException.class);
//    }
//
//    @Test
//    @DisplayName("지원자 참여 approve - 실패(지원자가 동시간대의 확정된 모집이 있는 경우)")
//    public void ExistedApplySameTime() {
//        assertThatThrownBy(() -> postApplicantByBusinessService.applyApprove(recruitPostPostDoDate2.getId(), approvedUser.getId(), userInBusinessProfile))
//                .isExactlyInstanceOf(InvalidOperationException.class);
//    }
//
//    @Test
//    @DisplayName("지원자 확정 취소 - 성공")
//    public void applyApproveCancel() {
//        assertThat(fullPostPostDoDate2.isFull()).isEqualTo(true);
//        postApplicantByBusinessService.applyApproveCancel(fullPostPostDoDate2.getId(), applyUser2.getId(), userInBusinessProfile);
//
//        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(fullPostPostDoDate2.getId(), applyUser2.getId()).orElseThrow(PostApplicantNotFoundException::new);
//
//        assertThat(postApplicant.getApplyStatus()).isEqualTo(ApplyStatus.WAIT);
//        assertThat(fullPostPostDoDate2.isFull()).isEqualTo(false);
//    }
//
//    @Test
//    @DisplayName("지원자 확정 취소 - 실패(없는 날짜인 경우)")
//    public void applyApproveCancelNotFoundPostDoDate() {
//        assertThatThrownBy(() -> postApplicantByBusinessService.applyApproveCancel(9999L, applyUser2.getId(), userInBusinessProfile))
//                .isExactlyInstanceOf(PostApplicantNotFoundException.class);
//    }
//
//    @Test
//    @DisplayName("지원자 확정 취소 - 실패(없는 참여자인 경우)")
//    public void applyApproveCancelNotFoundPostApplicant() {
//        assertThatThrownBy(() -> postApplicantByBusinessService.applyApproveCancel(fullPostPostDoDate2.getId(), notApplyUser.getId(), userInBusinessProfile))
//                .isExactlyInstanceOf(PostApplicantNotFoundException.class);
//    }
//
//    @Test
//    @DisplayName("지원자 확정 취소 - 실패(로그인 유저가 비즈니스 프로필 소속이 아닌 경우)")
//    public void applyApproveCancelLoginUserNotInBusinessProfile() {
//        assertThatThrownBy(() -> postApplicantByBusinessService.applyApproveCancel(fullPostPostDoDate2.getId(), applyUser2.getId(), applyUser1))
//                .isExactlyInstanceOf(PermissionException.class);
//    }
//
//    @Test
//    @DisplayName("지원자 반려 - 성공")
//    public void applyReject() {
//        PostApplicantRequest.ApplyReject request = PostApplicantRequest.ApplyReject.builder().comment("아쉽네요").build();
//        postApplicantByBusinessService.applyReject(recruitPostPostDoDate1.getId(), rejectUser.getId(), request, userInBusinessProfile);
//
//        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(recruitPostPostDoDate1.getId(), rejectUser.getId()).orElseThrow(PostApplicantNotFoundException::new);
//        List<RejectPost> rejectPostList = rejectPostRepository.findAll();
//
//        assertThat(postApplicant.getApplyStatus()).isEqualTo(ApplyStatus.REJECT);
//        assertThat(rejectPostList.size()).isEqualTo(1);
//    }
//
//    @Test
//    @DisplayName("지원자 반려 - 실패(없는 날짜인 경우)")
//    public void applyRejectNotFoundPostDoDate() {
//        PostApplicantRequest.ApplyReject request = PostApplicantRequest.ApplyReject.builder().comment("아쉽네요").build();
//        assertThatThrownBy(() -> postApplicantByBusinessService.applyReject(9999L, rejectUser.getId(), request, userInBusinessProfile))
//                .isExactlyInstanceOf(PostApplicantNotFoundException.class);
//    }
//
//    @Test
//    @DisplayName("지원자 반려 - 실패(없는 참여자인 경우)")
//    public void applyRejectNotFoundPostApplicant() {
//        PostApplicantRequest.ApplyReject request = PostApplicantRequest.ApplyReject.builder().comment("아쉽네요").build();
//        assertThatThrownBy(() -> postApplicantByBusinessService.applyReject(recruitPostPostDoDate1.getId(), 9999L, request, userInBusinessProfile))
//                .isExactlyInstanceOf(PostApplicantNotFoundException.class);
//    }
//
//    @Test
//    @DisplayName("지원자 반려 - 실패(로그인 유저가 비즈니스 프로필 소속이 아닌 경우)")
//    public void applyRejectLoginUserNotInBusinessProfile() {
//        PostApplicantRequest.ApplyReject request = PostApplicantRequest.ApplyReject.builder().comment("아쉽네요").build();
//        assertThatThrownBy(() -> postApplicantByBusinessService.applyReject(recruitPostPostDoDate1.getId(), rejectUser.getId(), request, applyUser1))
//                .isExactlyInstanceOf(PermissionException.class);
//    }
//
//    @Test
//    @DisplayName("확정자 불참으로 변경 - 성공")
//    public void attendChange() {
//        PostApplicantRequest.AttendChange request = PostApplicantRequest.AttendChange.builder().isAttend(false).build();
//
//        postApplicantByBusinessService.attendChange(recruitPostPostDoDate3.getId(), notAttendUser.getId(), request, userInBusinessProfile);
//
//        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(recruitPostPostDoDate3.getId(), notAttendUser.getId()).orElseThrow(PostApplicantNotFoundException::new);
//
//        assertThat(postApplicant.isBusinessFinish()).isEqualTo(false);
//    }
//
//    @Test
//    @DisplayName("확정자 불참으로 변경 - 실패(없는 날짜인 경우)")
//    public void attendChangeNotFoundPostDoDate() {
//        PostApplicantRequest.AttendChange request = PostApplicantRequest.AttendChange.builder().isAttend(false).build();
//
//        assertThatThrownBy(() -> postApplicantByBusinessService.attendChange(9999L, notAttendUser.getId(), request, userInBusinessProfile))
//                .isExactlyInstanceOf(PostApplicantNotFoundException.class);
//    }
//
//    @Test
//    @DisplayName("확정자 불참으로 변경 - 실패(없는 참여자인 경우)")
//    public void attendChangeNotFoundPostApplicant() {
//        PostApplicantRequest.AttendChange request = PostApplicantRequest.AttendChange.builder().isAttend(false).build();
//
//        assertThatThrownBy(() -> postApplicantByBusinessService.attendChange(recruitPostPostDoDate2.getId(), notApplyUser.getId(), request, userInBusinessProfile))
//                .isExactlyInstanceOf(PostApplicantNotFoundException.class);
//    }
//
//    @Test
//    @DisplayName("확정자 불참으로 변경 - 실패(로그인 유저가 비즈니스 프로필 소속이 아닌 경우)")
//    public void attendChangeLoginUserNotInBusinessProfile() {
//        PostApplicantRequest.AttendChange request = PostApplicantRequest.AttendChange.builder().isAttend(false).build();
//
//        assertThatThrownBy(() -> postApplicantByBusinessService.attendChange(recruitPostPostDoDate3.getId(), notAttendUser.getId(), request, applyUser2))
//                .isExactlyInstanceOf(PermissionException.class);
//    }
//}