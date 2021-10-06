package com.minibeit.post.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostLikeRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostDto;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
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
import java.time.YearMonth;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("비즈니스 프로필 Post Service 조회 흐름 테스트")
public class PostByBusinessFindServiceTest extends ServiceIntegrationTest {
    @Autowired
    private PostByBusinessService postByBusinessService;
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
    private PostLikeRepository postLikeRepository;

    private User userInBusinessProfile;
    private School school;
    private BusinessProfile businessProfile;
    private Post post;

    @BeforeEach
    public void init() {
        initSchool();
        initUsersAndBusinessProfile();
        initPost();
    }

    private void initSchool() {
        school = School.builder().name("고려대").build();
        schoolRepository.save(school);
    }

    private void initUsersAndBusinessProfile() {
        userInBusinessProfile = User.builder()
                .oauthId("1")
                .nickname("동그라미")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        userRepository.save(userInBusinessProfile);

        businessProfile = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(userInBusinessProfile)
                .build();
        businessProfileRepository.save(businessProfile);
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(userInBusinessProfile, businessProfile));
    }

    private void initPost() {
        for (int i = 1; i <= 3; i++) {
            PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
                    .title("모집중" + i)
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
                    .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 26, 17, 30)).build()))
                    .build();

            Post createdPost = Post.create(createRequest, school, businessProfile);
            post = postRepository.save(createdPost);

            PostDoDate postDoDate1 = PostDoDate.create(LocalDateTime.of(2021, 9, 29, 9, 30), createdPost);
            PostDoDate postDoDate2 = PostDoDate.create(LocalDateTime.of(2021, 10, 3, 9, 30), createdPost);
            postDoDateRepository.saveAll(Arrays.asList(postDoDate1, postDoDate2));

            PostLike postLike = PostLike.create(createdPost, userInBusinessProfile);
            postLikeRepository.save(postLike);
        }
        for (int i = 1; i <= 3; i++) {
            PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
                    .title("완료" + i)
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
                    .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 26, 17, 30)).build()))
                    .build();

            Post createdPost = Post.create(createRequest, school, businessProfile);
            createdPost.completed();
            postRepository.save(createdPost);

            PostDoDate postDoDate1 = PostDoDate.create(LocalDateTime.of(2021, 9, 29, 9, 30), createdPost);
            PostDoDate postDoDate2 = PostDoDate.create(LocalDateTime.of(2021, 10, 3, 9, 30), createdPost);
            postDoDateRepository.saveAll(Arrays.asList(postDoDate1, postDoDate2));
        }
    }

    @ParameterizedTest(name = "비즈니스 프로필에서 생성한 게시물 상태에 따라 조회 (모집기간이 지난 게시물은 모집완료 게시물 목록에 나타난다.) - 성공")
    @MethodSource
    void getListByBusinessProfile(PostStatus postStatus, LocalDateTime now, PageDto pageDto, List<String> contentResult) {
        Page<PostResponse.GetListByBusinessProfile> getListByBusinessProfiles = postByBusinessService.getListByBusinessProfile(businessProfile.getId(), postStatus, now, pageDto);
        assertThat(getListByBusinessProfiles.getContent()).extracting("title").containsExactlyElementsOf(contentResult);
    }

    static Stream<Arguments> getListByBusinessProfile() {
        return Stream.of(
                Arguments.of(PostStatus.RECRUIT, LocalDateTime.of(2021, 9, 30, 0, 0), new PageDto(1, 5), Arrays.asList("모집중3", "모집중2", "모집중1")),
                Arguments.of(PostStatus.RECRUIT, LocalDateTime.of(2021, 10, 3, 0, 0), new PageDto(1, 5), Collections.emptyList()),
                Arguments.of(PostStatus.COMPLETE, LocalDateTime.of(2021, 9, 30, 0, 0), new PageDto(1, 5), Arrays.asList("완료3", "완료2", "완료1")),
                Arguments.of(PostStatus.COMPLETE, LocalDateTime.of(2021, 10, 3, 0, 0), new PageDto(1, 10), Arrays.asList("완료3", "완료2", "완료1", "모집중3", "모집중2", "모집중1"))
        );
    }

    @ParameterizedTest(name = "비즈니스 프로필에서 생성한 게시물 상태에 따라 조회 즐겨찾기 수 포함 - 성공")
    @MethodSource
    void getListByBusinessProfileWithLikes(PostStatus postStatus, LocalDateTime now, PageDto pageDto) {
        Page<PostResponse.GetListByBusinessProfile> getListByBusinessProfiles = postByBusinessService.getListByBusinessProfile(businessProfile.getId(), postStatus, now, pageDto);
        PostResponse.GetListByBusinessProfile response = getListByBusinessProfiles.getContent().get(0);
        assertThat(response.getLikes()).isEqualTo(1);
    }

    static Stream<Arguments> getListByBusinessProfileWithLikes() {
        return Stream.of(
                Arguments.of(PostStatus.RECRUIT, LocalDateTime.of(2021, 9, 30, 0, 0), new PageDto(1, 5))
        );
    }

    @Test
    @DisplayName("게시물에서 실험이 있는 날짜 조회 - 성공")
    void getDoDateListByYearMonth() {
        YearMonth yearMonth = YearMonth.of(2021, 9);
        PostResponse.DoDateList response = postByBusinessService.getDoDateListByYearMonth(post.getId(), yearMonth);
        assertThat(response.getDoDateList().size()).isEqualTo(1);
        assertThat(response.getDoDateList()).containsExactly(LocalDate.of(2021, 9, 29));
    }
}
