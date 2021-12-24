package com.minibeit.review.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
import com.minibeit.review.domain.BusinessUserReview;
import com.minibeit.review.domain.BusinessUserReviewDetail;
import com.minibeit.review.domain.BusinessUserReviewEvalType;
import com.minibeit.review.domain.BusinessUserReviewType;
import com.minibeit.review.domain.repository.BusinessUserReviewDetailRepository;
import com.minibeit.review.domain.repository.BusinessUserReviewRepository;
import com.minibeit.review.service.dto.BusinessUserReviewResponse;
import com.minibeit.review.service.exception.BusinessReviewDetailNotFoundException;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BusinessUserReviewService {
    private final BusinessUserReviewDetailRepository businessBusinessUserReviewDetailRepository;
    private final BusinessProfileRepository businessProfileRepository;
    private final BusinessUserReviewRepository businessUserReviewRepository;
    private final PostApplicantRepository postApplicantRepository;
    private final UserRepository userRepository;

    public BusinessUserReviewResponse.OnlyId createBusinessReview(Long businessProfileId, Long postDoDateId, Long reviewDetailId, LocalDateTime now, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, user.getId()).orElseThrow(PostApplicantNotFoundException::new);
        postApplicant.updateWriteReview(now);

        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        BusinessUserReviewDetail businessUserReviewDetail = businessBusinessUserReviewDetailRepository.findById(reviewDetailId).orElseThrow(BusinessReviewDetailNotFoundException::new);
        BusinessUserReview businessUserReview = BusinessUserReview.createWithBusiness(businessProfile, businessUserReviewDetail);
        BusinessUserReview savedReview = businessUserReviewRepository.save(businessUserReview);

        return BusinessUserReviewResponse.OnlyId.build(savedReview);
    }

    public BusinessUserReviewResponse.OnlyId createUserReview(Long businessProfileId, Long userId, Long postDoDateId, Long reviewDetailId, LocalDateTime now, User user) {
        User applicantUser = userRepository.findByIdWithUserBusinessProfile(userId).orElseThrow(UserNotFoundException::new);
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);

        postApplicant.evaluated(now, user, businessProfileId);

        BusinessUserReviewDetail businessUserReviewDetail = businessBusinessUserReviewDetailRepository.findById(reviewDetailId).orElseThrow(BusinessReviewDetailNotFoundException::new);
        BusinessUserReview businessUserReview = BusinessUserReview.createWithUser(applicantUser, businessUserReviewDetail);
        BusinessUserReview review = businessUserReviewRepository.save(businessUserReview);
        return BusinessUserReviewResponse.OnlyId.build(review);
    }

    @Transactional(readOnly = true)
    public List<BusinessUserReviewResponse.IdAndContent> getList(BusinessUserReviewType type, BusinessUserReviewEvalType evalType) {
        List<BusinessUserReviewDetail> businessUserReviewDetailList = businessBusinessUserReviewDetailRepository.findAllByTypeAndEvalType(type, evalType);
        return businessUserReviewDetailList.stream().map(BusinessUserReviewResponse.IdAndContent::build).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BusinessUserReviewResponse.CountsByReviews> getGoodReviewsWithCount(Long businessProfileId) {
        return businessBusinessUserReviewDetailRepository.findCountByBusinessProfileId(businessProfileId);
    }
}
