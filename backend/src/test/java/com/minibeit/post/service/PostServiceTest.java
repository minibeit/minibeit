package com.minibeit.post.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.avatar.domain.AvatarServer;
import com.minibeit.avatar.domain.AvatarType;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.common.dto.PageDto;
import com.minibeit.common.dto.SavedFile;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.*;
import com.minibeit.post.dto.PostDto;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.security.userdetails.CustomUserDetails;
import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("Post Service 흐름 테스트")
class PostServiceTest extends ServiceIntegrationTest {
    @Autowired
    private PostService postService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostDoDateRepository postDoDateRepository;
    @Autowired
    private PostApplicantRepository postApplicantRepository;
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private PostFileRepository postFileRepository;
    @Autowired
    private PostLikeRepository postLikeRepository;
    @Autowired
    private BusinessProfileRepository businessProfileRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserBusinessProfileRepository userBusinessProfileRepository;

    private User userInBusinessProfile;
    private User anotherUser;
    private User testUser;
    private School KSchool;
    private School YSchool;
    private BusinessProfile businessProfile;
    private Post postForGet;
    private PostDoDate postDoDateForGet;
    private Post likePost;
    private Post notLikePost;
    private PostFile postFile;
    private Post applicantPost1;
    private Post applicantPost2;
    private Post applicantPost3;
    private PostDoDate postDoDate1;
    private PostDoDate postDoDate2;
    private PostDoDate postDoDate3;
    private final SavedFile savedFile = new SavedFile("original", "files", "100", 10L, "avatar.com", 12, 10, true, AvatarType.IMAGE, AvatarServer.S3);

    @BeforeEach
    public void init() {
        initSchool();
        initUsersAndBusinessProfile();
    }

    private void initSchool() {
        KSchool = School.builder().name("고려대").build();
        schoolRepository.save(KSchool);
        YSchool = School.builder().name("연세대").build();
        schoolRepository.save(YSchool);
    }

    private void initUsersAndBusinessProfile() {
        User user1 = User.builder()
                .oauthId("1")
                .nickname("동그라미")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        User user2 = User.builder()
                .oauthId("2")
                .nickname("세모")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        User user3 = User.builder()
                .oauthId("3")
                .nickname("네모")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        userInBusinessProfile = userRepository.save(user1);
        anotherUser = userRepository.save(user2);
        testUser = userRepository.save(user3);

        businessProfile = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(userInBusinessProfile)
                .build();
        businessProfileRepository.save(businessProfile);
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(userInBusinessProfile, businessProfile));
    }

    private void initPostForGet() {
        PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
                .title("게시물")
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
                .schoolId(KSchool.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 9, 29, 9, 30))
                .endDate(LocalDateTime.of(2021, 9, 29, 12, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 29, 17, 30)).build()))
                .build();

        Post post = Post.create(createRequest, KSchool, businessProfile);
        postForGet = postRepository.save(post);
        PostFile createdPostFile = PostFile.create(postForGet, savedFile);
        postFile = postFileRepository.save(createdPostFile);
        postDoDateForGet = postDoDateRepository.save(PostDoDate.create(LocalDateTime.of(2021, 9, 29, 9, 30), post));
    }

    private void initPostForLike() {
        PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
                .title("즐겨찾기1")
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
                .schoolId(KSchool.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 9, 29, 9, 30))
                .endDate(LocalDateTime.of(2021, 9, 29, 12, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 29, 17, 30)).build()))
                .build();

        Post post = Post.create(createRequest, KSchool, businessProfile);
        likePost = postRepository.save(post);
        PostLike postLike = PostLike.create(post, anotherUser);
        postLikeRepository.save(postLike);

        PostRequest.CreateInfo createRequest3 = PostRequest.CreateInfo.builder()
                .title("즐겨찾기안한게시물")
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
                .schoolId(KSchool.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 9, 29, 9, 30))
                .endDate(LocalDateTime.of(2021, 9, 29, 12, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 29, 17, 30)).build()))
                .build();

        Post post3 = Post.create(createRequest3, KSchool, businessProfile);
        notLikePost = postRepository.save(post3);
    }

    private void initPostListForList() {
        for (int i = 1; i <= 3; i++) {
            PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
                    .title("즐겨찾기" + i)
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
                    .schoolId(KSchool.getId())
                    .businessProfileId(businessProfile.getId())
                    .startDate(LocalDateTime.of(2021, 9, 29, 9, 30))
                    .endDate(LocalDateTime.of(2021, 9, 29, 12, 30))
                    .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 29, 17, 30)).build()))
                    .build();

            Post post = Post.create(createRequest, KSchool, businessProfile);
            postRepository.save(post);
            PostLike postLike = PostLike.create(post, testUser);
            postLikeRepository.save(postLike);
        }
    }

    private void initApplicantPost() {
        PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
                .title("지원1")
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
                .schoolId(KSchool.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 9, 29, 9, 30))
                .endDate(LocalDateTime.of(2021, 10, 5, 12, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 4, 17, 30)).build()))
                .build();

        Post post = Post.create(createRequest, KSchool, businessProfile);
        applicantPost1 = postRepository.save(post);
        postDoDate1 = postDoDateRepository.save(PostDoDate.create(LocalDateTime.of(2021, 10, 4, 17, 30), post));
        PostApplicant postApplicant1 = PostApplicant.create(postDoDate1, testUser);
        postApplicantRepository.save(postApplicant1);

        PostRequest.CreateInfo createRequest2 = PostRequest.CreateInfo.builder()
                .title("지원2")
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
                .schoolId(KSchool.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 9, 29, 9, 30))
                .endDate(LocalDateTime.of(2021, 10, 5, 12, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 3, 12, 30)).build()))
                .build();

        Post post2 = Post.create(createRequest2, KSchool, businessProfile);
        applicantPost2 = postRepository.save(post2);
        postDoDate2 = postDoDateRepository.save(PostDoDate.create(LocalDateTime.of(2021, 10, 3, 12, 30), post2));
        PostApplicant postApplicant2 = PostApplicant.create(postDoDate2, testUser);
        postApplicantRepository.save(postApplicant2);

        PostRequest.CreateInfo createRequest3 = PostRequest.CreateInfo.builder()
                .title("확정1")
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
                .schoolId(KSchool.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 9, 29, 9, 30))
                .endDate(LocalDateTime.of(2021, 10, 5, 12, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 5, 12, 30)).build()))
                .build();

        Post post3 = Post.create(createRequest3, KSchool, businessProfile);
        applicantPost3 = postRepository.save(post3);
        postDoDate3 = postDoDateRepository.save(PostDoDate.create(LocalDateTime.of(2021, 10, 5, 12, 30), post3));
        PostApplicant postApplicant3 = PostApplicant.create(postDoDate3, testUser);
        postApplicant3.updateStatus(ApplyStatus.APPROVE);
        postApplicantRepository.save(postApplicant3);
    }

    private void initCompletedPost() {
        PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
                .title("완료1")
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
                .schoolId(KSchool.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 9, 29, 9, 30))
                .endDate(LocalDateTime.of(2021, 10, 5, 12, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 4, 17, 30)).build()))
                .build();

        Post post = Post.create(createRequest, KSchool, businessProfile);
        applicantPost1 = postRepository.save(post);
        postDoDate1 = postDoDateRepository.save(PostDoDate.create(LocalDateTime.of(2021, 10, 4, 17, 30), post));
        PostApplicant postApplicant1 = PostApplicant.create(postDoDate1, testUser);
        postApplicant1.updateStatus(ApplyStatus.APPROVE);
        postApplicant1.updateMyFinish();
        postApplicantRepository.save(postApplicant1);
        PostRequest.CreateInfo createRequest2 = PostRequest.CreateInfo.builder()
                .title("완료2")
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
                .schoolId(KSchool.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 9, 29, 9, 30))
                .endDate(LocalDateTime.of(2021, 10, 5, 12, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 3, 12, 30)).build()))
                .build();

        Post post2 = Post.create(createRequest2, KSchool, businessProfile);
        applicantPost2 = postRepository.save(post2);
        postDoDate2 = postDoDateRepository.save(PostDoDate.create(LocalDateTime.of(2021, 10, 3, 12, 30), post2));
        PostApplicant postApplicant2 = PostApplicant.create(postDoDate2, testUser);
        postApplicantRepository.save(postApplicant2);
        postApplicant1.updateStatus(ApplyStatus.APPROVE);
        postApplicant2.updateMyFinish();
        postApplicant2.changeBusinessFinish(false);
        PostRequest.CreateInfo createRequest3 = PostRequest.CreateInfo.builder()
                .title("완료3")
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
                .schoolId(KSchool.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 9, 29, 9, 30))
                .endDate(LocalDateTime.of(2021, 10, 5, 12, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 5, 12, 30)).build()))
                .build();

        Post post3 = Post.create(createRequest3, KSchool, businessProfile);
        applicantPost3 = postRepository.save(post3);
        postDoDate3 = postDoDateRepository.save(PostDoDate.create(LocalDateTime.of(2021, 10, 5, 12, 30), post3));
        PostApplicant postApplicant3 = PostApplicant.create(postDoDate3, testUser);
        postApplicant3.updateStatus(ApplyStatus.APPROVE);
        postApplicantRepository.save(postApplicant3);
    }

    @Test
    @DisplayName("즐겨찾기 생성 - 성공")
    void createLike() {
        initPostForLike();
        postService.createOrDeletePostLike(notLikePost.getId(), anotherUser);

        PostLike postLike = postLikeRepository.findByPostIdAndUserId(notLikePost.getId(), anotherUser.getId()).get();

        assertThat(postLike.getPost().getId()).isEqualTo(notLikePost.getId());
    }

    @Test
    @DisplayName("즐겨찾기 삭제 - 성공")
    void deleteLike() {
        initPostForLike();
        postService.createOrDeletePostLike(likePost.getId(), anotherUser);

        Optional<PostLike> response = postLikeRepository.findByPostIdAndUserId(likePost.getId(), anotherUser.getId());

        assertThat(response).isEqualTo(Optional.empty());
    }

    @Test
    @DisplayName("즐겨찾기 생성,삭제 - 실패(게시글이 없는 경우)")
    void createDeleteLikeNotFoundPost() {
        initPostForLike();
        assertThatThrownBy(() -> postService.createOrDeletePostLike(9999L, anotherUser))
                .isExactlyInstanceOf(PostNotFoundException.class);
    }

    @Test
    @DisplayName("게시물 단건 조회 -성공")
    void getOne() {
        initPostForGet();
        CustomUserDetails customUserDetails = CustomUserDetails.create(userInBusinessProfile);
        PostResponse.GetOne response = postService.getOne(postForGet.getId(), customUserDetails);
        assertThat(response.getId()).isEqualTo(postForGet.getId());
        assertThat(response.getFiles()).extracting("url").containsExactly(postFile.getUrl());
        assertThat(response.getBusinessProfileInfo().getId()).isEqualTo(businessProfile.getId());
    }

    @Test
    @DisplayName("게시물 월별 실험 시작 시간 목록 조회 -성공")
    void getPostStartTimeList() {
        initPostForGet();
        List<PostResponse.GetPostStartTime> response = postService.getPostStartTimeList(postForGet.getId(), LocalDate.of(2021, 9, 29));
        Post findPost = postRepository.findById(postForGet.getId()).orElseThrow(PostNotFoundException::new);
        assertThat(response).extracting("id").containsExactly(postDoDateForGet.getId());
        assertThat(response).extracting("startTime").containsExactly(postDoDateForGet.getDoDate());
        assertThat(response).extracting("endTime").containsExactly(postDoDateForGet.getDoDate().plusMinutes(findPost.getDoTime()));
        assertThat(response).extracting("isFull").containsExactly(false);
    }

    @Test
    @DisplayName("즐겨찾기한 게시물 조회 - 성공")
    void getListByLike() {
        initPostListForList();
        PageDto pageDto = new PageDto(1, 10);
        Page<PostResponse.GetLikeList> response = postService.getListByLike(testUser, pageDto);

        assertThat(response.getContent()).extracting("title").containsExactlyElementsOf(Arrays.asList("즐겨찾기3", "즐겨찾기2", "즐겨찾기1"));
    }

    @ParameterizedTest(name = "자신이 지원한 게시물 상태에 따라 목록 조회(대기중,확정)- 성공")
    @MethodSource
    void getListByApplyStatus(ApplyStatus applyStatus, LocalDateTime now, PageDto pageDto, List<String> contentResult) {
        initApplicantPost();
        Page<PostResponse.GetMyApplyList> response = postService.getListByApplyStatus(applyStatus, testUser, now, pageDto);
        assertThat(response.getContent()).extracting("title").containsExactlyElementsOf(contentResult);
    }

    static Stream<Arguments> getListByApplyStatus() {
        return Stream.of(
                Arguments.of(ApplyStatus.WAIT, LocalDateTime.of(2021, 9, 29, 18, 0), new PageDto(1, 5), Arrays.asList("지원2", "지원1")),
                Arguments.of(ApplyStatus.WAIT, LocalDateTime.of(2021, 10, 4, 0, 0), new PageDto(1, 5), List.of("지원1")),
                Arguments.of(ApplyStatus.APPROVE, LocalDateTime.of(2021, 9, 29, 18, 0), new PageDto(1, 5), List.of("확정1"))
        );
    }

    @Test
    @DisplayName("자신이 완료한 게시물 목록 조회 - 성공")
    void getListByMyCompleteList() {
        initCompletedPost();
        PageDto pageDto = new PageDto(1, 5);
        Page<PostResponse.GetMyCompletedList> response = postService.getListByMyCompleteList(testUser, pageDto);
        assertThat(response.getContent()).extracting("title").containsExactly("완료1");
    }
}
