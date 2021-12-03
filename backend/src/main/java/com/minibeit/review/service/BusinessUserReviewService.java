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
import com.minibeit.review.dto.BusinessUserReviewResponse;
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
    private final UserBusinessProfileRepository userBusinessProfileRepository;
    private final UserRepository userRepository;

    public void createBusinessReview(Long businessProfileId, Long postDoDateId, Long reviewDetailId, LocalDateTime now, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, user.getId()).orElseThrow(PostApplicantNotFoundException::new);
        if (!postApplicant.writeBusinessReviewIsPossible(now)) {
            throw new PermissionException();
        }
        postApplicant.updateWriteReview();
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        BusinessUserReviewDetail businessUserReviewDetail = businessBusinessUserReviewDetailRepository.findById(reviewDetailId).orElseThrow(BusinessReviewDetailNotFoundException::new);
        BusinessUserReview businessUserReview = BusinessUserReview.createWithBusiness(businessProfile, businessUserReviewDetail);
        businessUserReviewRepository.save(businessUserReview);
    }

    public void createUserReview(Long businessProfileId, Long userId, Long postDoDateId, Long reviewDetailId, LocalDateTime now, User user) {
        User applicantUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);

        if (!userBusinessProfileRepository.existsByUserIdAndBusinessProfileId(user.getId(), businessProfileId)) {
            throw new PermissionException();
        }

        if (!postApplicant.writeUserReviewIsPossible(now)) {
            throw new PermissionException();
        }
        postApplicant.updateEvaluatedBusiness();
        BusinessUserReviewDetail businessUserReviewDetail = businessBusinessUserReviewDetailRepository.findById(reviewDetailId).orElseThrow(BusinessReviewDetailNotFoundException::new);
        BusinessUserReview businessUserReview = BusinessUserReview.createWithUser(applicantUser, businessUserReviewDetail);
        businessUserReviewRepository.save(businessUserReview);
    }

    @Transactional(readOnly = true)
    public List<BusinessUserReviewResponse.IdAndName> getList(BusinessUserReviewType type, BusinessUserReviewEvalType evalType) {
        List<BusinessUserReviewDetail> businessUserReviewDetailList = businessBusinessUserReviewDetailRepository.findAllByTypeAndEvalType(type, evalType);
        return businessUserReviewDetailList.stream().map(BusinessUserReviewResponse.IdAndName::build).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BusinessUserReviewResponse.CountsByReviews> getGoodReviewsWithCount(Long businessProfileId) {
        return businessBusinessUserReviewDetailRepository.findCountByBusinessProfileId(businessProfileId);
    }
}
