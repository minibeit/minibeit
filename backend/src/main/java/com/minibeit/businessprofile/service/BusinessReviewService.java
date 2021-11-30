package com.minibeit.businessprofile.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.BusinessReview;
import com.minibeit.businessprofile.domain.BusinessReviewDetail;
import com.minibeit.businessprofile.domain.ReviewType;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.BusinessReviewDetailRepository;
import com.minibeit.businessprofile.domain.repository.BusinessReviewRepository;
import com.minibeit.businessprofile.dto.BusinessReviewResponse;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.businessprofile.service.exception.BusinessReviewDetailNotFoundException;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
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
public class BusinessReviewService {
    private final BusinessReviewDetailRepository businessReviewDetailRepository;
    private final BusinessProfileRepository businessProfileRepository;
    private final BusinessReviewRepository businessReviewRepository;
    private final PostApplicantRepository postApplicantRepository;

    public void create(Long businessProfileId, Long postDoDateId, Long reviewDetailId, LocalDateTime now, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, user.getId()).orElseThrow(PostApplicantNotFoundException::new);
        if (!postApplicant.writeReviewIsPossible(now)) {
            throw new PermissionException();
        }
        postApplicant.updateWriteReview();
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        BusinessReviewDetail businessReviewDetail = businessReviewDetailRepository.findById(reviewDetailId).orElseThrow(BusinessReviewDetailNotFoundException::new);
        BusinessReview businessReview = BusinessReview.create(businessProfile, businessReviewDetail);
        businessReviewRepository.save(businessReview);
    }

    @Transactional(readOnly = true)
    public List<BusinessReviewResponse.IdAndName> getList(ReviewType type) {
        List<BusinessReviewDetail> businessReviewDetailList = businessReviewDetailRepository.findAllByType(type);
        return businessReviewDetailList.stream().map(BusinessReviewResponse.IdAndName::build).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BusinessReviewResponse.CountsByReviews> getGoodReviewsWithCount(Long businessProfileId) {
        return businessReviewDetailRepository.findCountByBusinessProfileId(businessProfileId);
    }
}
