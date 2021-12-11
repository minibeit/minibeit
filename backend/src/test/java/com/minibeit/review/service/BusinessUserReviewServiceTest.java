package com.minibeit.review.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostDto;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
import com.minibeit.review.domain.BusinessUserReviewDetail;
import com.minibeit.review.domain.BusinessUserReviewEvalType;
import com.minibeit.review.domain.BusinessUserReviewType;
import com.minibeit.review.domain.repository.BusinessUserReviewDetailRepository;
import com.minibeit.review.domain.repository.BusinessUserReviewRepository;
import com.minibeit.review.dto.BusinessUserReviewResponse;
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
import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DisplayName("BusinessUserReviewService 흐름 테스트")
class BusinessUserReviewServiceTest extends ServiceIntegrationTest {
    @Autowired
    private BusinessUserReviewService businessUserReviewService;
    @Autowired
    private BusinessUserReviewRepository businessUserReviewRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BusinessProfileRepository businessProfileRepository;
    @Autowired
    private UserBusinessProfileRepository userBusinessProfileRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostDoDateRepository postDoDateRepository;
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private BusinessUserReviewDetailRepository businessUserReviewDetailRepository;
    @Autowired
    private PostApplicantRepository postApplicantRepository;

    private School school;
    private User userInBusinessProfile;
    private User user2;
    private User notAttendUser;
    private User notCompleteSelf;
    private BusinessProfile businessProfile;
    private PostDoDate postDoDate;
    private Post post;
    private BusinessUserReviewDetail goodBReviewDetail;

    @BeforeEach
    void setup() {
        schoolSetup();
        reviewDetailSetup();
        userAndBusinessSetup();
        postSetup();
    }

    void schoolSetup() {
        School makeSchool = School.builder().name("고려대").build();
        school = schoolRepository.save(makeSchool);
    }

    void reviewDetailSetup() {
        BusinessUserReviewDetail createdReviewDetail = BusinessUserReviewDetail.builder().id(1L).content("좋은 실험입니다.").type(BusinessUserReviewType.B).evalType(BusinessUserReviewEvalType.GOOD).build();
        goodBReviewDetail = businessUserReviewDetailRepository.save(createdReviewDetail);
    }

    void userAndBusinessSetup() {
        User makeUser1 = User.builder()
                .oauthId("1")
                .nickname("동그라미")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        userInBusinessProfile = userRepository.save(makeUser1);

        User makeUser2 = User.builder()
                .oauthId("2")
                .nickname("네모")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        user2 = userRepository.save(makeUser2);

        User makeUser3 = User.builder()
                .oauthId("3")
                .nickname("세모")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        notAttendUser = userRepository.save(makeUser3);

        User makeUser4 = User.builder()
                .oauthId("4")
                .nickname("별")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        notCompleteSelf = userRepository.save(makeUser4);

        businessProfile = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(userInBusinessProfile)
                .build();
        businessProfileRepository.save(businessProfile);
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(userInBusinessProfile, businessProfile));
    }

    void postSetup() {
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
                .schoolId(school.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 9, 29, 9, 30))
                .endDate(LocalDateTime.of(2021, 9, 29, 12, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 29, 17, 30)).build()))
                .build();

        Post createdPost = Post.create(createRequest, school, businessProfile);
        post = postRepository.save(createdPost);

        PostDoDate postDoDate1 = PostDoDate.create(LocalDateTime.of(2021, 9, 29, 9, 30), post);
        PostDoDate postDoDate2 = PostDoDate.create(LocalDateTime.of(2021, 10, 3, 9, 30), post);
        PostDoDate postDoDate3 = PostDoDate.create(LocalDateTime.of(2021, 10, 4, 9, 30), post);

        postDoDate = postDoDateRepository.save(postDoDate1);
        postDoDateRepository.save(postDoDate2);
        postDoDateRepository.save(postDoDate3);

        PostApplicant postApplicant1 = PostApplicant.create(postDoDate, user2);
        postApplicant1.updateStatus(ApplyStatus.APPROVE);
        postApplicant1.changeBusinessFinish(true);
        postApplicant1.updateMyFinish();
        postApplicantRepository.save(postApplicant1);

        PostApplicant postApplicant2 = PostApplicant.create(postDoDate, notAttendUser);
        postApplicant1.updateStatus(ApplyStatus.APPROVE);
        postApplicant1.changeBusinessFinish(false);
        postApplicant1.updateMyFinish();
        postApplicantRepository.save(postApplicant2);

        PostApplicant postApplicant3 = PostApplicant.create(postDoDate, notCompleteSelf);
        postApplicant1.updateStatus(ApplyStatus.APPROVE);
        postApplicant1.changeBusinessFinish(true);
        postApplicantRepository.save(postApplicant3);
    }

    @Test
    @DisplayName("비즈니스 후기 작성 - 성공")
    void createBusinessReview() {
        BusinessUserReviewResponse.OnlyId response = businessUserReviewService.createBusinessReview(businessProfile.getId(), postDoDate.getId(), goodBReviewDetail.getId(), LocalDateTime.of(2021, 9, 30, 0, 0), user2);
        assertNotNull(businessUserReviewRepository.findById(response.getId()));
    }

    @Test
    @DisplayName("비즈니스 후기 작성 실패(지원자가 아닌 경우)")
    void createBusinessReviewNotFoundApplicant() {
        assertThatThrownBy(() -> businessUserReviewService.createBusinessReview(businessProfile.getId(), postDoDate.getId(), goodBReviewDetail.getId(), LocalDateTime.of(2021, 9, 30, 0, 0), userInBusinessProfile))
                .isExactlyInstanceOf(PostApplicantNotFoundException.class);
    }

    @Test
    @DisplayName("비즈니스 후기 작성 실패(비즈니스에서 불참을 누른 경우)")
    void createBusinessReviewNotAttend() {
        assertThatThrownBy(() -> businessUserReviewService.createBusinessReview(businessProfile.getId(), postDoDate.getId(), goodBReviewDetail.getId(), LocalDateTime.of(2021, 9, 30, 0, 0), notAttendUser))
                .isExactlyInstanceOf(PermissionException.class);
    }

    @Test
    @DisplayName("비즈니스 후기 작성 실패(참여한지 7일이 지난 경우)")
    void createBusinessReviewAfter7Day() {
        assertThatThrownBy(() -> businessUserReviewService.createBusinessReview(businessProfile.getId(), postDoDate.getId(), goodBReviewDetail.getId(), LocalDateTime.of(2021, 10, 7, 0, 0), user2))
                .isExactlyInstanceOf(PermissionException.class);
    }

    @Test
    @DisplayName("비즈니스 후기 작성 실패(자신이 완료버튼을 누르지 않은 경우)")
    void createBusinessReviewNotCompleteSelf() {
        assertThatThrownBy(() -> businessUserReviewService.createBusinessReview(businessProfile.getId(), postDoDate.getId(), goodBReviewDetail.getId(), LocalDateTime.of(2021, 10, 7, 0, 0), notCompleteSelf))
                .isExactlyInstanceOf(PermissionException.class);
    }
}