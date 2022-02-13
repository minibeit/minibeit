package com.minibeit.review.service.unit;

import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.businessprofile.service.unit.MockBusinessProfile;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
import com.minibeit.post.service.unit.mock.MockPostApplicant;
import com.minibeit.post.service.unit.mock.MockPostDoDate;
import com.minibeit.review.domain.BusinessUserReviewValidator;
import com.minibeit.review.domain.repository.BusinessUserReviewDetailRepository;
import com.minibeit.review.domain.repository.BusinessUserReviewRepository;
import com.minibeit.review.service.BusinessUserReviewService;
import com.minibeit.review.service.exception.BusinessReviewDetailNotFoundException;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import com.minibeit.user.service.unit.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import static com.minibeit.review.service.unit.MockBusinessUserReviewDetail.MockBusinessUserReviewDetail1.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("UserService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class BusinessUserReviewServiceUnitTest {
    @Mock
    BusinessUserReviewDetailRepository businessBusinessUserReviewDetailRepository;
    @Mock
    BusinessProfileRepository businessProfileRepository;
    @Mock
    BusinessUserReviewRepository businessUserReviewRepository;
    @Mock
    PostApplicantRepository postApplicantRepository;
    @Mock
    UserRepository userRepository;
    @Mock
    BusinessUserReviewValidator businessUserReviewValidator;
    @InjectMocks
    BusinessUserReviewService businessUserReviewService;

    @Test
    @DisplayName("참여자가 비즈니스 프로필에 대한 리뷰 작성 성공")
    public void createBusinessReview() {
        given(postApplicantRepository.findByPostDoDateIdAndUserId(any(), any())).willReturn(Optional.of(MockPostApplicant.MockPostApplicant1.POST_APPLICANT));
        given(businessProfileRepository.findById(any())).willReturn(Optional.of(MockBusinessProfile.BusinessProfile1.BUSINESS_PROFILE));
        given(businessBusinessUserReviewDetailRepository.findById(any())).willReturn(Optional.of(BUSINESS_USER_REVIEW_DETAIL));
        given(businessUserReviewRepository.save(any())).willReturn(MockBusinessUserReview.MockBusinessUserReview1.BUSINESS_USER_REVIEW);

        businessUserReviewService.createBusinessReview(MockBusinessProfile.BusinessProfile1.ID, MockPostDoDate.MockPostDoDate1.ID, ID, LocalDateTime.of(2022, 2, 13, 3, 30), MockUser.MockUser1.USER);

        verify(businessUserReviewValidator).createBusinessReviewValidate(any(), any());
        verify(businessUserReviewRepository).save(any());
    }

    @Test
    @DisplayName("참여자가 비즈니스 프로필에 대한 리뷰 작성 실패 (해당 참여자가 없는 경우)")
    public void createBusinessReviewFailPostApplicantNotFound() {
        given(postApplicantRepository.findByPostDoDateIdAndUserId(any(), any())).willReturn(Optional.empty());

        assertThrows(PostApplicantNotFoundException.class, () -> businessUserReviewService.createBusinessReview(MockBusinessProfile.BusinessProfile1.ID, MockPostDoDate.MockPostDoDate1.ID, ID, LocalDateTime.of(2022, 2, 13, 3, 30), MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("참여자가 비즈니스 프로필에 대한 리뷰 작성 실패 (해당 비즈니스 프로필이 없는 경우)")
    public void createBusinessReviewFailBusinessProfileNotFound() {
        given(postApplicantRepository.findByPostDoDateIdAndUserId(any(), any())).willReturn(Optional.of(MockPostApplicant.MockPostApplicant1.POST_APPLICANT));
        given(businessProfileRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(BusinessProfileNotFoundException.class, () -> businessUserReviewService.createBusinessReview(MockBusinessProfile.BusinessProfile1.ID, MockPostDoDate.MockPostDoDate1.ID, ID, LocalDateTime.of(2022, 2, 13, 3, 30), MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("참여자가 비즈니스 프로필에 대한 리뷰 작성 실패 (해당 상세 리뷰가 없는 경우)")
    public void createBusinessReviewFailReviewDetailNotFound() {
        given(postApplicantRepository.findByPostDoDateIdAndUserId(any(), any())).willReturn(Optional.of(MockPostApplicant.MockPostApplicant1.POST_APPLICANT));
        given(businessProfileRepository.findById(any())).willReturn(Optional.of(MockBusinessProfile.BusinessProfile1.BUSINESS_PROFILE));
        given(businessBusinessUserReviewDetailRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(BusinessReviewDetailNotFoundException.class, () -> businessUserReviewService.createBusinessReview(MockBusinessProfile.BusinessProfile1.ID, MockPostDoDate.MockPostDoDate1.ID, ID, LocalDateTime.of(2022, 2, 13, 3, 30), MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필이 유저에 대한 평가 작성 성공")
    public void createUserReview() {
        given(userRepository.findById(any())).willReturn(Optional.of(MockUser.MockUser1.USER));
        given(businessProfileRepository.findById(any())).willReturn(Optional.of(MockBusinessProfile.BusinessProfile1.BUSINESS_PROFILE));
        given(userRepository.findByIdWithUserBusinessProfileAndBusiness(any())).willReturn(Optional.of(MockUser.MockUser2.USER));
        given(postApplicantRepository.findByPostDoDateIdAndUserId(any(), any())).willReturn(Optional.of(MockPostApplicant.MockPostApplicant1.POST_APPLICANT));
        given(businessBusinessUserReviewDetailRepository.findById(any())).willReturn(Optional.of(BUSINESS_USER_REVIEW_DETAIL));
        given(businessUserReviewRepository.save(any())).willReturn(MockBusinessUserReview.MockBusinessUserReview1.BUSINESS_USER_REVIEW);

        businessUserReviewService.createUserReview(MockBusinessProfile.BusinessProfile1.ID, MockUser.MockUser2.ID, MockPostDoDate.MockPostDoDate1.ID, ID, LocalDateTime.of(2022, 2, 13, 3, 30), MockUser.MockUser1.USER);

        verify(businessUserReviewValidator).createUserReiviewValidate(any(), any(), any(), any());
        verify(businessUserReviewRepository).save(any());
    }


    @Test
    @DisplayName("비즈니스 프로필이 유저에 대한 평가 작성 실패 (해당 참여자가 없는 경우)")
    public void createUserReviewFailPostApplicantNotFound() {
        given(userRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> businessUserReviewService.createUserReview(MockBusinessProfile.BusinessProfile1.ID, MockUser.MockUser2.ID, MockPostDoDate.MockPostDoDate1.ID, ID, LocalDateTime.of(2022, 2, 13, 3, 30), MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필이 유저에 대한 평가 작성 실패 (해당 비즈니스 프로필이 없는 경우)")
    public void createUserReviewFailBusinessProfileNotFound() {
        given(userRepository.findById(any())).willReturn(Optional.of(MockUser.MockUser1.USER));
        given(businessProfileRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(BusinessProfileNotFoundException.class, () -> businessUserReviewService.createUserReview(MockBusinessProfile.BusinessProfile1.ID, MockUser.MockUser2.ID, MockPostDoDate.MockPostDoDate1.ID, ID, LocalDateTime.of(2022, 2, 13, 3, 30), MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필이 유저에 대한 평가 작성 실패 (해당 비즈니스 프로필이 없는 경우)")
    public void createUserReviewFailLoginUserNotFound() {
        given(userRepository.findById(any())).willReturn(Optional.of(MockUser.MockUser1.USER));
        given(businessProfileRepository.findById(any())).willReturn(Optional.of(MockBusinessProfile.BusinessProfile1.BUSINESS_PROFILE));
        given(userRepository.findByIdWithUserBusinessProfileAndBusiness(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> businessUserReviewService.createUserReview(MockBusinessProfile.BusinessProfile1.ID, MockUser.MockUser2.ID, MockPostDoDate.MockPostDoDate1.ID, ID, LocalDateTime.of(2022, 2, 13, 3, 30), MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필이 유저에 대한 평가 작성 실패 (해당 참여자가 없는 경우)")
    public void createUserReviewFailPostApplicant2NotFound() {
        given(userRepository.findById(any())).willReturn(Optional.of(MockUser.MockUser1.USER));
        given(businessProfileRepository.findById(any())).willReturn(Optional.of(MockBusinessProfile.BusinessProfile1.BUSINESS_PROFILE));
        given(userRepository.findByIdWithUserBusinessProfileAndBusiness(any())).willReturn(Optional.of(MockUser.MockUser2.USER));
        given(postApplicantRepository.findByPostDoDateIdAndUserId(any(), any())).willReturn(Optional.empty());

        assertThrows(PostApplicantNotFoundException.class, () -> businessUserReviewService.createUserReview(MockBusinessProfile.BusinessProfile1.ID, MockUser.MockUser2.ID, MockPostDoDate.MockPostDoDate1.ID, ID, LocalDateTime.of(2022, 2, 13, 3, 30), MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필이 유저에 대한 평가 작성 실패 (해당 참여자가 없는 경우)")
    public void createUserReviewFailReviewDetailNotFound() {
        given(userRepository.findById(any())).willReturn(Optional.of(MockUser.MockUser1.USER));
        given(businessProfileRepository.findById(any())).willReturn(Optional.of(MockBusinessProfile.BusinessProfile1.BUSINESS_PROFILE));
        given(userRepository.findByIdWithUserBusinessProfileAndBusiness(any())).willReturn(Optional.of(MockUser.MockUser2.USER));
        given(postApplicantRepository.findByPostDoDateIdAndUserId(any(), any())).willReturn(Optional.of(MockPostApplicant.MockPostApplicant1.POST_APPLICANT));
        given(businessBusinessUserReviewDetailRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(BusinessReviewDetailNotFoundException.class, () -> businessUserReviewService.createUserReview(MockBusinessProfile.BusinessProfile1.ID, MockUser.MockUser2.ID, MockPostDoDate.MockPostDoDate1.ID, ID, LocalDateTime.of(2022, 2, 13, 3, 30), MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("상세 리뷰 목록 조회 성공")
    public void getList() {
        given(businessBusinessUserReviewDetailRepository.findAllByTypeAndEvalType(any(), any())).willReturn(Collections.singletonList(BUSINESS_USER_REVIEW_DETAIL));

        businessUserReviewService.getList(REVIEW_TYPE, EVAL_TYPE);

        verify(businessBusinessUserReviewDetailRepository).findAllByTypeAndEvalType(any(), any());
    }

    @Test
    @DisplayName("비즈니스 프로필 리뷰 목록 조회(좋은 리뷰만)")
    public void getGoodReviewsWithCount() {
        given(businessBusinessUserReviewDetailRepository.findCountByBusinessProfileId(any())).willReturn(anyList());

        businessUserReviewService.getGoodReviewsWithCount(MockBusinessProfile.BusinessProfile1.ID);

        verify(businessBusinessUserReviewDetailRepository).findCountByBusinessProfileId(any());
    }
}
