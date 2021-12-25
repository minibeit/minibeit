package com.minibeit.review.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.review.domain.BusinessUserReview;
import com.minibeit.review.domain.BusinessUserReviewDetail;
import com.minibeit.review.domain.BusinessUserReviewEvalType;
import com.minibeit.review.domain.BusinessUserReviewType;
import com.minibeit.review.domain.repository.BusinessUserReviewDetailRepository;
import com.minibeit.review.domain.repository.BusinessUserReviewRepository;
import com.minibeit.review.service.dto.BusinessUserReviewResponse;
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

import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("BusinessUserReviewService 후기 조회 테스트")
public class BusinessUserReviewFindServiceTest extends ServiceIntegrationTest {
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
    private BusinessUserReviewDetailRepository businessUserReviewDetailRepository;

    private BusinessProfile businessProfile;
    private BusinessUserReviewDetail businessGoodReview1;
    private BusinessUserReviewDetail businessGoodReview2;


    @BeforeEach
    public void setup() {
        reviewDetailSetup();
        goodReviewInBusinessSetup();
    }

    void reviewDetailSetup() {
        BusinessUserReviewDetail createdReviewDetail = BusinessUserReviewDetail.builder().id(1L).content("B 좋은후기1").type(BusinessUserReviewType.B).evalType(BusinessUserReviewEvalType.GOOD).build();
        businessGoodReview1 = businessUserReviewDetailRepository.save(createdReviewDetail);
        BusinessUserReviewDetail createdReviewDetail2 = BusinessUserReviewDetail.builder().id(2L).content("B 안좋은후기1").type(BusinessUserReviewType.B).evalType(BusinessUserReviewEvalType.BAD).build();
        businessUserReviewDetailRepository.save(createdReviewDetail2);
        BusinessUserReviewDetail createdReviewDetail3 = BusinessUserReviewDetail.builder().id(3L).content("U 좋은후기1").type(BusinessUserReviewType.U).evalType(BusinessUserReviewEvalType.GOOD).build();
        businessUserReviewDetailRepository.save(createdReviewDetail3);
        BusinessUserReviewDetail createdReviewDetail4 = BusinessUserReviewDetail.builder().id(4L).content("U 안좋은후기1").type(BusinessUserReviewType.U).evalType(BusinessUserReviewEvalType.BAD).build();
        businessUserReviewDetailRepository.save(createdReviewDetail4);
        BusinessUserReviewDetail createdReviewDetail6 = BusinessUserReviewDetail.builder().id(5L).content("B 안좋은후기2").type(BusinessUserReviewType.B).evalType(BusinessUserReviewEvalType.BAD).build();
        businessUserReviewDetailRepository.save(createdReviewDetail6);
        BusinessUserReviewDetail createdReviewDetail5 = BusinessUserReviewDetail.builder().id(6L).content("B 좋은후기2").type(BusinessUserReviewType.B).evalType(BusinessUserReviewEvalType.GOOD).build();
        businessGoodReview2 = businessUserReviewDetailRepository.save(createdReviewDetail5);
        BusinessUserReviewDetail createdReviewDetail7 = BusinessUserReviewDetail.builder().id(7L).content("U 좋은후기2").type(BusinessUserReviewType.U).evalType(BusinessUserReviewEvalType.GOOD).build();
        businessUserReviewDetailRepository.save(createdReviewDetail7);
        BusinessUserReviewDetail createdReviewDetail8 = BusinessUserReviewDetail.builder().id(8L).content("U 안좋은후기2").type(BusinessUserReviewType.U).evalType(BusinessUserReviewEvalType.BAD).build();
        businessUserReviewDetailRepository.save(createdReviewDetail8);
        BusinessUserReviewDetail createdReviewDetail9 = BusinessUserReviewDetail.builder().id(10L).content("B 좋은후기3").type(BusinessUserReviewType.B).evalType(BusinessUserReviewEvalType.GOOD).build();
        businessUserReviewDetailRepository.save(createdReviewDetail9);
    }

    void goodReviewInBusinessSetup() {
        User makeUser1 = User.builder()
                .oauthId("1")
                .nickname("동그라미")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        User savedUser = userRepository.save(makeUser1);
        BusinessProfile createdBusiness = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(savedUser)
                .build();
        businessProfile = businessProfileRepository.save(createdBusiness);
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(savedUser, businessProfile));


        BusinessUserReview review1 = BusinessUserReview.createWithBusiness(businessProfile, businessGoodReview1);
        BusinessUserReview review2 = BusinessUserReview.createWithBusiness(businessProfile, businessGoodReview2);
        businessUserReviewRepository.save(review1);
        businessUserReviewRepository.save(review2);
    }

    @ParameterizedTest(name = "상세 리뷰 조회 - 성공")
    @MethodSource
    void getList(BusinessUserReviewType type, BusinessUserReviewEvalType evalType, List<String> contentResult) {
        List<BusinessUserReviewResponse.IdAndContent> response = businessUserReviewService.getList(type, evalType);
        assertThat(response).extracting("content").containsExactlyElementsOf(contentResult);
    }

    static Stream<Arguments> getList() {
        return Stream.of(
                Arguments.of(BusinessUserReviewType.B, BusinessUserReviewEvalType.GOOD, Arrays.asList("B 좋은후기1", "B 좋은후기2", "B 좋은후기3")),
                Arguments.of(BusinessUserReviewType.B, BusinessUserReviewEvalType.BAD, Arrays.asList("B 안좋은후기1", "B 안좋은후기2")),
                Arguments.of(BusinessUserReviewType.U, BusinessUserReviewEvalType.GOOD, Arrays.asList("U 좋은후기1", "U 좋은후기2")),
                Arguments.of(BusinessUserReviewType.U, BusinessUserReviewEvalType.BAD, Arrays.asList("U 안좋은후기1", "U 안좋은후기2"))
        );
    }

    @Test
    @DisplayName("비즈니스프로필 좋은 리뷰 목록 및 개수 조회 - 성공")
    void getGoodReviewsWithCount() {
        List<BusinessUserReviewResponse.CountsByReviews> response = businessUserReviewService.getGoodReviewsWithCount(businessProfile.getId());

        assertThat(response).extracting("count").containsExactlyElementsOf(Arrays.asList(1L, 1L, 0L));
    }
}
