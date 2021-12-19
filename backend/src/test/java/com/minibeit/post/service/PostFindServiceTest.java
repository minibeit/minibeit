package com.minibeit.post.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.common.domain.FileServer;
import com.minibeit.common.domain.FileType;
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
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("PostService 조회 흐름 테스트")
public class PostFindServiceTest extends ServiceIntegrationTest {
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
    private User testUser;
    private School KSchool;
    private School YSchool;
    private BusinessProfile businessProfile;
    private Post post;
    private PostFile postFile;
    private PostDoDate postDoDate;
    private final SavedFile savedFile = new SavedFile("original", "files", "100", 10L, "avatar.com", 12, 10, true, FileType.IMAGE, FileServer.S3);


    @BeforeEach
    public void init() {
        initSchool();
        initUsersAndBusinessProfile();
        initPost();
    }

    private void initSchool() {
        KSchool = School.builder().name("고려대").build();
        KSchool = schoolRepository.save(KSchool);
        YSchool = School.builder().name("연세대").build();
        YSchool = schoolRepository.save(YSchool);
    }

    private void initUsersAndBusinessProfile() {
        User user1 = User.builder()
                .oauthId("1")
                .nickname("동그라미")
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
        testUser = userRepository.save(user3);

        businessProfile = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(userInBusinessProfile)
                .build();
        businessProfileRepository.save(businessProfile);
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(userInBusinessProfile, businessProfile, List.of(BusinessProfile.builder().build())));
    }

    private void initPost() {
        PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
                .title("게시물1")
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
                .endDate(LocalDateTime.of(2021, 9, 29, 17, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 29, 17, 30)).build()))
                .build();

        Post createdPost = Post.create(createRequest, KSchool, businessProfile);
        post = postRepository.save(createdPost);
        PostFile createdPostFile = PostFile.create(post, savedFile);
        postFile = postFileRepository.save(createdPostFile);
        postDoDate = postDoDateRepository.save(PostDoDate.create(LocalDateTime.of(2021, 9, 29, 9, 30), createdPost));
        PostLike postLike = PostLike.create(post, userInBusinessProfile);
        postLikeRepository.save(postLike);
        PostApplicant postApplicant1 = PostApplicant.create(postDoDate, testUser, List.of(0L));
        postApplicantRepository.save(postApplicant1);

        PostRequest.CreateInfo createRequest2 = PostRequest.CreateInfo.builder()
                .title("게시물2")
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
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 3, 12, 30)).build()))
                .build();

        Post createdPost2 = Post.create(createRequest2, KSchool, businessProfile);
        Post post2 = postRepository.save(createdPost2);

        PostLike postLike2 = PostLike.create(post2, userInBusinessProfile);
        postLikeRepository.save(postLike2);
        PostDoDate postDoDate2 = postDoDateRepository.save(PostDoDate.create(LocalDateTime.of(2021, 10, 3, 12, 30), post2));
        PostApplicant postApplicant2 = PostApplicant.create(postDoDate2, testUser, List.of(0L));
        postApplicant2.updateStatus(ApplyStatus.APPROVE);
        postApplicantRepository.save(postApplicant2);

        PostRequest.CreateInfo createRequest3 = PostRequest.CreateInfo.builder()
                .title("게시물3")
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
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 3, 12, 30)).build()))
                .build();

        Post createdPost3 = Post.create(createRequest3, KSchool, businessProfile);
        Post post3 = postRepository.save(createdPost3);

        PostDoDate postDoDate3 = postDoDateRepository.save(PostDoDate.create(LocalDateTime.of(2021, 9, 15, 12, 30), post3));
        PostApplicant postApplicant3 = PostApplicant.create(postDoDate3, testUser, List.of(0L));
        postApplicant3.updateStatus(ApplyStatus.COMPLETE);
        postApplicantRepository.save(postApplicant3);
    }

    @Test
    @DisplayName("게시물 단건 조회 -성공")
    void getOne() {
        CustomUserDetails customUserDetails = CustomUserDetails.create(userInBusinessProfile);
        PostResponse.GetOne response = postService.getOne(post.getId(), customUserDetails);
        assertThat(response.getId()).isEqualTo(post.getId());
        assertThat(response.getFiles()).extracting("url").containsExactly(postFile.getUrl());
        assertThat(response.getBusinessProfileInfo().getId()).isEqualTo(businessProfile.getId());
    }

    @Test
    @DisplayName("게시물 월별 실험 시작 시간 목록 조회 -성공")
    void getPostStartTimeList() {
        List<PostResponse.GetPostStartTime> response = postService.getPostStartTimeList(post.getId(), LocalDate.of(2021, 9, 29));
        Post findPost = postRepository.findById(post.getId()).orElseThrow(PostNotFoundException::new);
        assertThat(response).extracting("id").containsExactly(postDoDate.getId());
        assertThat(response).extracting("startTime").containsExactly(postDoDate.getDoDate());
        assertThat(response).extracting("endTime").containsExactly(postDoDate.getDoDate().plusMinutes(findPost.getDoTime()));
        assertThat(response).extracting("isFull").containsExactly(false);
    }

    @Test
    @DisplayName("즐겨찾기한 게시물 조회 - 성공")
    void getListByLike() {
        PageDto pageDto = new PageDto(1, 10);
        Page<PostResponse.GetLikeList> response = postService.getListByLike(userInBusinessProfile, pageDto);

        assertThat(response.getContent()).extracting("title").containsExactlyElementsOf(Arrays.asList("게시물2", "게시물1"));
    }

    @ParameterizedTest(name = "자신이 지원한 게시물 상태에 따라 목록 조회(대기중,확정,완료)- 성공")
    @MethodSource
    void getListByApplyStatus(ApplyStatus applyStatus, LocalDateTime now, PageDto pageDto, List<String> contentResult) {
        Page<PostResponse.GetMyApplyList> response = postService.getListByApplyStatus(applyStatus, testUser, now, pageDto);
        assertThat(response.getContent()).extracting("title").containsExactlyElementsOf(contentResult);
    }

    static Stream<Arguments> getListByApplyStatus() {
        return Stream.of(
                Arguments.of(ApplyStatus.WAIT, LocalDateTime.of(2021, 9, 25, 17, 30), new PageDto(1, 5), List.of("게시물1")),
                Arguments.of(ApplyStatus.APPROVE, LocalDateTime.of(2021, 10, 4, 0, 0), new PageDto(1, 5), List.of("게시물2")),
                Arguments.of(ApplyStatus.COMPLETE, LocalDateTime.of(2021, 9, 30, 18, 0), new PageDto(1, 5), List.of("게시물3"))
        );
    }

    @Test
    @DisplayName("게시물 전체 조회 - 성공")
    void getList() {
        CustomUserDetails customUserDetails = CustomUserDetails.create(testUser);
        PageDto pageDto = new PageDto(1, 5);
        Page<PostResponse.GetList> response = postService.getList(KSchool.getId(), LocalDate.of(2021, 9, 29), "미디어", pageDto, Payment.CACHE, LocalTime.of(9, 30), LocalTime.of(12, 30), 5000, 60, customUserDetails);

        assertThat(response.getTotalElements()).isEqualTo(1L);
    }

    @Test
    @DisplayName("게시물에서 실험이 있는 날짜 조회 - 성공")
    void getDoDateListByYearMonth() {
        YearMonth yearMonth = YearMonth.of(2021, 9);
        PostResponse.DoDateList response = postService.getDoDateListByYearMonth(post.getId(), yearMonth);
        assertThat(response.getDoDateList()).containsExactly(LocalDate.of(2021, 9, 29));
    }
}
