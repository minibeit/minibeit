package com.minibeit.postapplicant.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.PostLike;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostLikeRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostDto;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.service.exception.DuplicateApplyException;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
import com.minibeit.post.service.exception.PostDoDateIsFullException;
import com.minibeit.post.service.exception.PostDoDateNotFoundException;
import com.minibeit.postapplicant.domain.ApplyStatus;
import com.minibeit.postapplicant.domain.PostApplicant;
import com.minibeit.postapplicant.domain.repository.PostApplicantRepository;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("PostApplicant Service 흐름 테스트")
class PostApplicantServiceTest extends ServiceIntegrationTest {
    @Autowired
    private PostApplicantService postApplicantService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostDoDateRepository postDoDateRepository;
    @Autowired
    private PostApplicantRepository postApplicantRepository;
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private BusinessProfileRepository businessProfileRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserBusinessProfileRepository userBusinessProfileRepository;
    @Autowired
    private PostLikeRepository postLikeRepository;

    private User userInBusinessProfile;
    private User applyUser1;
    private User duplicatedApplyUser;
    private User applyUser2;
    private User notApplyUser;
    private School school;
    private BusinessProfile businessProfile;
    private Post recruitPost;
    private PostDoDate recruitPostPostDoDate1;
    private PostDoDate recruitPostPostDoDate2;
    private PostApplicant postApplicantApplyUser;

    @BeforeEach
    public void init() {
        initSchool();
        initUsersAndBusinessProfile();
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
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        applyUser1 = userRepository.save(apUser);

        User apUser2 = User.builder()
                .oauthId("2")
                .nickname("세모")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        applyUser2 = userRepository.save(apUser2);

        User businessUser = User.builder()
                .oauthId("3")
                .nickname("동그라미")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        userInBusinessProfile = userRepository.save(businessUser);

        User dupUser = User.builder()
                .oauthId("4")
                .nickname("달")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        duplicatedApplyUser = userRepository.save(dupUser);


        User notAUser = User.builder()
                .oauthId("4")
                .nickname("달")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        notApplyUser = userRepository.save(notAUser);

        businessProfile = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(userInBusinessProfile)
                .build();
        businessProfileRepository.save(businessProfile);
        List<BusinessProfile> businessProfileList = new ArrayList<>();
        businessProfileList.add(businessProfile);
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(userInBusinessProfile, businessProfile));
    }

    private void initApplyPost() {
        PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
                .title("모집중")
                .content("실험 내용")
                .place("고려대학교 연구실")
                .contact("010-1234-1234")
                .category("미디어")
                .headcount(3)
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
                .doDateList(Arrays.asList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 29, 9, 30)).build(),
                        PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 3, 9, 30)).build()))
                .build();

        Post createdPost = createRequest.toEntity();
        createdPost.create(school, businessProfile);
        recruitPost = postRepository.save(createdPost);
        List<PostDoDate> postDoDates = createRequest.toPostDoDates();
        postDoDates.forEach(postDoDate -> postDoDate.assignPost(recruitPost));
        postDoDateRepository.saveAll(postDoDates);

        recruitPostPostDoDate1 = postDoDates.get(0);
        recruitPostPostDoDate2 = postDoDates.get(1);


    }

    private void initApplyMyFinishPost() {
        PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
                .title("모집중")
                .content("실험 내용")
                .place("고려대학교 연구실")
                .contact("010-1234-1234")
                .category("미디어")
                .headcount(3)
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
                .doDateList(Arrays.asList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 29, 9, 30)).build(),
                        PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 3, 9, 30)).build()))
                .build();

        Post createdPost = createRequest.toEntity();
        createdPost.create(school, businessProfile);
        recruitPost = postRepository.save(createdPost);
        List<PostDoDate> postDoDates = createRequest.toPostDoDates();
        postDoDates.forEach(postDoDate -> postDoDate.assignPost(recruitPost));
        postDoDateRepository.saveAll(postDoDates);

        recruitPostPostDoDate1 = postDoDates.get(0);
        recruitPostPostDoDate2 = postDoDates.get(1);

        PostApplicant postApplicant1 = PostApplicant.create(recruitPostPostDoDate1, applyUser1);
        postApplicant1.updateStatus(ApplyStatus.APPROVE);
        postApplicantApplyUser = postApplicantRepository.save(postApplicant1);
    }

    private void initApplyCancelPost() {
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
                .doDateList(Arrays.asList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 29, 9, 30)).build(),
                        PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 3, 9, 30)).build()))
                .build();

        Post createdPost = createRequest.toEntity();
        createdPost.create(school, businessProfile);
        recruitPost = postRepository.save(createdPost);
        List<PostDoDate> postDoDates = createRequest.toPostDoDates();
        postDoDates.forEach(postDoDate -> postDoDate.assignPost(recruitPost));
        postDoDateRepository.saveAll(postDoDates);

        recruitPostPostDoDate1 = postDoDates.get(0);
        recruitPostPostDoDate2 = postDoDates.get(1);

        PostApplicant postApplicant1 = PostApplicant.create(recruitPostPostDoDate1, applyUser1);
        postApplicant1.updateStatus(ApplyStatus.APPROVE);
        postApplicantApplyUser = postApplicantRepository.save(postApplicant1);

        List<PostApplicant> postApplicants = Collections.singletonList(postApplicantApplyUser);
        recruitPostPostDoDate1.updateFull(postApplicants);

        PostApplicant postApplicant2 = PostApplicant.create(recruitPostPostDoDate2, applyUser2);
        postApplicant2.updateStatus(ApplyStatus.APPROVE);
        postApplicantRepository.save(postApplicant2);
    }

    @Test
    @DisplayName("게시물 지원하기 - 성공")
    public void apply() {
        initApplyPost();
        postLikeRepository.save(PostLike.builder().id(1L).post(recruitPost).user(applyUser1).build());
        int beforeLikes = postLikeRepository.findAll().size();


        postApplicantService.apply(recruitPostPostDoDate1.getId(), applyUser1);
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(recruitPostPostDoDate1.getId(), applyUser1.getId()).orElseThrow(PostApplicantNotFoundException::new);
        assertThat(postApplicant.getApplyStatus()).isEqualTo(ApplyStatus.WAIT);
        assertThat(postApplicant.isBusinessFinish()).isEqualTo(true);
        assertThat(postApplicant.isWriteReview()).isEqualTo(false);

        int afterLikes = postLikeRepository.findAll().size();
        assertThat(beforeLikes - 1).isEqualTo(afterLikes);
    }

    @Test
    @DisplayName("게시물 지원하기 - 실패(PosDoDate가 없는 경우)")
    public void applyNotFoundPostDoDate() {
        initApplyPost();
        assertThatThrownBy(() -> postApplicantService.apply(9999L, applyUser1))
                .isExactlyInstanceOf(PostDoDateNotFoundException.class);
    }

    @Test
    @DisplayName("게시물 지원하기 - 실패(중복 지원을 한 경우)")
    public void duplicatedApply() {
        initApplyPost();
        postApplicantService.apply(recruitPostPostDoDate1.getId(), duplicatedApplyUser);
        assertThatThrownBy(() -> postApplicantService.apply(recruitPostPostDoDate1.getId(), duplicatedApplyUser))
                .isExactlyInstanceOf(DuplicateApplyException.class);
    }

    @Test
    @DisplayName("게시물 지원하기 - 실패(모집인원이 가득 찬 경우)")
    public void applyIsFull() {
        initApplyPost();
        postApplicantService.apply(recruitPostPostDoDate2.getId(), applyUser1);
        PostApplicant postApplicant1 = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(recruitPostPostDoDate2.getId(), applyUser1.getId()).orElseThrow(PostApplicantNotFoundException::new);
        postApplicant1.updateStatus(ApplyStatus.APPROVE);
        postApplicantService.apply(recruitPostPostDoDate2.getId(), userInBusinessProfile);
        PostApplicant postApplicant2 = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(recruitPostPostDoDate2.getId(), userInBusinessProfile.getId()).orElseThrow(PostApplicantNotFoundException::new);
        postApplicant2.updateStatus(ApplyStatus.APPROVE);
        postApplicantService.apply(recruitPostPostDoDate2.getId(), duplicatedApplyUser);
        PostApplicant postApplicant3 = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(recruitPostPostDoDate2.getId(), duplicatedApplyUser.getId()).orElseThrow(PostApplicantNotFoundException::new);
        postApplicant3.updateStatus(ApplyStatus.APPROVE);
        List<PostApplicant> postApplicants = Arrays.asList(postApplicant1, postApplicant2, postApplicant3);
        recruitPostPostDoDate2.updateFull(postApplicants);

        assertThatThrownBy(() -> postApplicantService.apply(recruitPostPostDoDate2.getId(), applyUser2))
                .isExactlyInstanceOf(PostDoDateIsFullException.class);
    }

    @Test
    @DisplayName("게시물 참여 완료 - 성공")
    public void applyMyFinish() {
        initApplyMyFinishPost();
        LocalDateTime now = LocalDateTime.of(2021, 9, 30, 10, 30);
        postApplicantService.applyMyFinish(recruitPostPostDoDate1.getId(), now, applyUser1);
        PostApplicant postApplicant = postApplicantRepository.findById(postApplicantApplyUser.getId()).orElseThrow(PostApplicantNotFoundException::new);

        assertThat(postApplicant.getApplyStatus()).isEqualTo(ApplyStatus.COMPLETE);
    }

    @Test
    @DisplayName("게시물 참여 완료 - 실패(없는 날짜인 경우)")
    public void applyMyFinishNotFoundPostDoDate() {
        LocalDateTime now = LocalDateTime.of(2021, 9, 30, 10, 30);
        assertThatThrownBy(() -> postApplicantService.applyMyFinish(9999L, now, applyUser1))
                .isExactlyInstanceOf(PostApplicantNotFoundException.class);
    }

    @Test
    @DisplayName("게시물 참여 완료 - 실패(없는 참여자인 경우)")
    public void applyMyFinishNotFoundApplicant() {
        initApplyMyFinishPost();
        LocalDateTime now = LocalDateTime.of(2021, 9, 30, 10, 30);
        assertThatThrownBy(() -> postApplicantService.applyMyFinish(recruitPostPostDoDate1.getId(), now, notApplyUser))
                .isExactlyInstanceOf(PostApplicantNotFoundException.class);
    }

    @Test
    @DisplayName("게시물 참여 완료 - 실패(실험 마감날짜를 지나지 않은 경우)")
    public void applyMyFinishNotAfterPostDoDate() {
        initApplyMyFinishPost();
        LocalDateTime now = LocalDateTime.of(2021, 9, 16, 10, 30);
        assertThatThrownBy(() -> postApplicantService.applyMyFinish(recruitPostPostDoDate1.getId(), now, applyUser1))
                .isExactlyInstanceOf(PermissionException.class);
    }

    @Test
    @DisplayName("게시물 참여 취소 - 성공")
    public void applyCancel() {
        initApplyCancelPost();
        assertThat(recruitPostPostDoDate1.isFull()).isEqualTo(true);
        postApplicantService.applyCancel(recruitPostPostDoDate1.getId(), applyUser1);
        Optional<PostApplicant> response = postApplicantRepository.findByPostDoDateIdAndUserId(recruitPostPostDoDate1.getId(), applyUser1.getId());

        assertThat(recruitPostPostDoDate1.isFull()).isEqualTo(false);
        assertThat(response).isEqualTo(Optional.empty());
    }

    @Test
    @DisplayName("게시물 참여 취소 - 실패(PostDoDate가 없는 경우)")
    public void applyCancelNotFoundPostDoDate() {
        initApplyCancelPost();
        assertThatThrownBy(() -> postApplicantService.applyCancel(9999L, applyUser1))
                .isExactlyInstanceOf(PostApplicantNotFoundException.class);
    }

    @Test
    @DisplayName("게시물 참여 취소 - 실패(참여자가 없는 경우)")
    public void applyCancelNotFoundUser() {
        initApplyCancelPost();
        assertThatThrownBy(() -> postApplicantService.applyCancel(9999L, applyUser2))
                .isExactlyInstanceOf(PostApplicantNotFoundException.class);
    }
}