package com.minibeit.review.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.review.dto.BusinessUserReviewResponse;
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
import com.minibeit.review.service.exception.BusinessReviewDetailNotFoundException;
import com.minibeit.user.domain.User;
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

    public void create(Long businessProfileId, Long postDoDateId, Long reviewDetailId, LocalDateTime now, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, user.getId()).orElseThrow(PostApplicantNotFoundException::new);
        if (!postApplicant.writeReviewIsPossible(now)) {
            throw new PermissionException();
        }
        postApplicant.updateWriteReview();
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        BusinessUserReviewDetail businessUserReviewDetail = businessBusinessUserReviewDetailRepository.findById(reviewDetailId).orElseThrow(BusinessReviewDetailNotFoundException::new);
        BusinessUserReview businessUserReview = BusinessUserReview.create(businessProfile, businessUserReviewDetail);
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
