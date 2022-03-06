package com.minibeit.review.service;

import com.minibeit.businessprofile.service.integrate.BusinessProfiles;
import com.minibeit.businessprofile.service.mock.MockBusinessProfile;
import com.minibeit.post.service.integrate.PostApplicants;
import com.minibeit.post.service.mock.MockPostApplicant;
import com.minibeit.post.service.mock.MockPostDoDate;
import com.minibeit.review.domain.repository.BusinessUserReviewDetailRepository;
import com.minibeit.review.domain.repository.BusinessUserReviewRepository;
import com.minibeit.review.service.exception.BusinessReviewDetailNotFoundException;
import com.minibeit.user.service.integrate.Users;
import com.minibeit.user.service.mock.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import static com.minibeit.review.service.mock.MockBusinessUserReviewDetail.MockBusinessUserReviewDetail1.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("BusinessUserReviewService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class BusinessUserReviewServiceUnitTest {
    @Mock
    BusinessUserReviewDetailRepository businessBusinessUserReviewDetailRepository;
    @Mock
    BusinessUserReviewRepository businessUserReviewRepository;
    @Mock
    BusinessProfiles businessProfiles;
    @Mock
    PostApplicants postApplicants;
    @Mock
    Users users;
    @Mock
    BusinessUserReviewValidator businessUserReviewValidator;
    @InjectMocks
    BusinessUserReviewService businessUserReviewService;

    @Test
    @DisplayName("참여자가 비즈니스 프로필에 대한 리뷰 작성 성공")
    public void createBusinessReview() {
        given(postApplicants.writeBusinessReview(any(), any())).willReturn(MockPostApplicant.MockPostApplicant1.POST_APPLICANT);
        given(businessProfiles.getOne(any())).willReturn(MockBusinessProfile.BusinessProfile1.BUSINESS_PROFILE);
        given(businessBusinessUserReviewDetailRepository.findById(any())).willReturn(Optional.of(BUSINESS_USER_REVIEW_DETAIL));
        given(businessUserReviewRepository.save(any())).willReturn(MockBusinessUserReview.MockBusinessUserReview1.BUSINESS_USER_REVIEW);

        businessUserReviewService.createBusinessReview(MockBusinessProfile.BusinessProfile1.ID, MockPostDoDate.MockPostDoDate1.ID, ID, LocalDateTime.of(2022, 2, 13, 3, 30), MockUser.MockUser1.USER);

        verify(postApplicants).writeBusinessReview(any(), any());
        verify(businessUserReviewValidator).createBusinessReviewValidate(any(), any());
        verify(businessUserReviewRepository).save(any());
    }

    @Test
    @DisplayName("참여자가 비즈니스 프로필에 대한 리뷰 작성 실패 (해당 상세 리뷰가 없는 경우)")
    public void createBusinessReviewFailReviewDetailNotFound() {
        given(postApplicants.writeBusinessReview(any(), any())).willReturn(MockPostApplicant.MockPostApplicant1.POST_APPLICANT);
        given(businessProfiles.getOne(any())).willReturn(MockBusinessProfile.BusinessProfile1.BUSINESS_PROFILE);
        given(businessBusinessUserReviewDetailRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(BusinessReviewDetailNotFoundException.class, () -> businessUserReviewService.createBusinessReview(MockBusinessProfile.BusinessProfile1.ID, MockPostDoDate.MockPostDoDate1.ID, ID, LocalDateTime.of(2022, 2, 13, 3, 30), MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("비즈니스 프로필이 유저에 대한 평가 작성 성공")
    public void createUserReview() {
        given(users.getOne(any())).willReturn(MockUser.MockUser1.USER);
        given(businessProfiles.getOne(any())).willReturn(MockBusinessProfile.BusinessProfile1.BUSINESS_PROFILE);
        given(users.getOneWithWithUserBusinessProfileAndBusiness(any())).willReturn(MockUser.MockUser2.USER);
        given(postApplicants.writeUserReview(any(), any())).willReturn(MockPostApplicant.MockPostApplicant1.POST_APPLICANT);
        given(businessBusinessUserReviewDetailRepository.findById(any())).willReturn(Optional.of(BUSINESS_USER_REVIEW_DETAIL));
        given(businessUserReviewRepository.save(any())).willReturn(MockBusinessUserReview.MockBusinessUserReview1.BUSINESS_USER_REVIEW);

        businessUserReviewService.createUserReview(MockBusinessProfile.BusinessProfile1.ID, MockUser.MockUser2.ID, MockPostDoDate.MockPostDoDate1.ID, ID, LocalDateTime.of(2022, 2, 13, 3, 30), MockUser.MockUser1.USER);

        verify(postApplicants).writeUserReview(any(), any());
        verify(businessUserReviewValidator).createUserReviewValidate(any(), any(), any(), any());
        verify(businessUserReviewRepository).save(any());
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
