package com.minibeit.post.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostApplicantDto;
import com.minibeit.post.dto.PostApplicantResponse;
import com.minibeit.post.dto.PostDto;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("PostApplicantService by Business 조회 흐름 테스트")
public class PostApplicantByBusinessFindServiceTest extends ServiceIntegrationTest {
    @Autowired
    private PostApplicantByBusinessService postApplicantByBusinessService;
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

    private User userInBusinessProfile;
    private User rejectUser1;
    private User rejectUser2;
    private User approveUser1;
    private User approveUser2;
    private User waitUser;
    private School school;
    private BusinessProfile businessProfile;
    private Post recruitPost;

    @BeforeEach
    public void init() {
        initSchool();
        initUsersAndBusinessProfile();
        initApplyPost();
    }

    private void initSchool() {
        School createdSchool = School.builder().name("고려대").build();
        school = schoolRepository.save(createdSchool);
    }

    private void initUsersAndBusinessProfile() {
        User apUser = User.builder()
                .oauthId("1")
                .name("반려된지원자1")
                .nickname("별")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        rejectUser1 = userRepository.save(apUser);

        User apUser2 = User.builder()
                .oauthId("2")
                .nickname("세모")
                .name("반려된지원자2")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        rejectUser2 = userRepository.save(apUser2);

        User dupUser = User.builder()
                .oauthId("4")
                .nickname("달")
                .name("확정된지원자1")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        approveUser1 = userRepository.save(dupUser);

        User notAUser = User.builder()
                .oauthId("4")
                .nickname("달")
                .name("확정된지원자2")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        approveUser2 = userRepository.save(notAUser);

        User notAtUser = User.builder()
                .oauthId("5")
                .nickname("해")
                .name("대기중인지원자1")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        waitUser = userRepository.save(notAtUser);

        User businessUser = User.builder()
                .oauthId("3")
                .nickname("동그라미")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        userInBusinessProfile = userRepository.save(businessUser);

        businessProfile = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(userInBusinessProfile)
                .build();
        businessProfileRepository.save(businessProfile);
        userBusinessProfileRepository.save(UserBusinessProfile.create(userInBusinessProfile, businessProfile));
    }

    private void initApplyPost() {
        PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
                .title("모집중")
                .content("실험 내용")
                .place("고려대학교 연구실")
                .contact("010-1234-1234")
                .category("미디어")
                .headcount(5)
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

        PostDoDate postDoDate1 = PostDoDate.create(LocalDateTime.of(2021, 10, 10, 9, 30), recruitPost);
        PostDoDate postDoDate2 = PostDoDate.create(LocalDateTime.of(2021, 10, 11, 9, 30), recruitPost);

        postDoDateRepository.save(postDoDate1);
        postDoDateRepository.save(postDoDate2);


        PostApplicant postApplicant1 = PostApplicant.create(postDoDate1, rejectUser1);
        postApplicant1.updateStatus(ApplyStatus.REJECT);
        postApplicantRepository.save(postApplicant1);
        PostApplicant postApplicant2 = PostApplicant.create(postDoDate1, rejectUser2);
        postApplicant2.updateStatus(ApplyStatus.REJECT);
        postApplicantRepository.save(postApplicant2);
        PostApplicant postApplicant3 = PostApplicant.create(postDoDate1, approveUser1);
        postApplicant3.updateStatus(ApplyStatus.APPROVE);
        postApplicantRepository.save(postApplicant3);
        PostApplicant postApplicant4 = PostApplicant.create(postDoDate1, approveUser2);
        postApplicant4.updateStatus(ApplyStatus.APPROVE);
        postApplicantRepository.save(postApplicant4);
        PostApplicant postApplicant5 = PostApplicant.create(postDoDate1, waitUser);
        postApplicantRepository.save(postApplicant5);
        PostApplicant postApplicant6 = PostApplicant.create(postDoDate2, waitUser);
        postApplicantRepository.save(postApplicant6);
        PostApplicant postApplicant7 = PostApplicant.create(postDoDate2, approveUser1);
        postApplicant7.updateStatus(ApplyStatus.APPROVE);
        postApplicantRepository.save(postApplicant7);
    }

    @ParameterizedTest(name = "지원자 목록 조회 - 성공")
    @MethodSource
    public void getApplicantListByDate(ApplyStatus applyStatus, LocalDate doDate, List<String> contentResult) {
        List<PostApplicantResponse.ApplicantInfo> response = postApplicantByBusinessService.getApplicantListByDate(recruitPost.getId(), applyStatus, doDate);
        List<PostApplicantDto.UserInfo> userInfoList1 = null;
        for (PostApplicantResponse.ApplicantInfo applicantInfo : response) {
            userInfoList1 = applicantInfo.getUserInfoList();
        }

        assertThat(userInfoList1).extracting("name").containsExactlyElementsOf(contentResult);
    }

    static Stream<Arguments> getApplicantListByDate() {
        return Stream.of(
                Arguments.of(ApplyStatus.WAIT, LocalDate.of(2021, 10, 10), Arrays.asList("확정된지원자1", "확정된지원자2", "대기중인지원자1")),
                Arguments.of(ApplyStatus.APPROVE, LocalDate.of(2021, 10, 10), Arrays.asList("확정된지원자1", "확정된지원자2")),
                Arguments.of(ApplyStatus.WAIT, LocalDate.of(2021, 10, 11), Arrays.asList("대기중인지원자1", "확정된지원자1")),
                Arguments.of(ApplyStatus.APPROVE, LocalDate.of(2021, 10, 11), List.of("확정된지원자1"))
        );
    }
}
