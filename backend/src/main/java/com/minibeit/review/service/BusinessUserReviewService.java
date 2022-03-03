package com.minibeit.review.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.service.integrate.BusinessProfiles;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.service.integrate.PostApplicants;
import com.minibeit.review.domain.*;
import com.minibeit.review.domain.repository.BusinessUserReviewDetailRepository;
import com.minibeit.review.domain.repository.BusinessUserReviewRepository;
import com.minibeit.review.service.dto.BusinessUserReviewResponse;
import com.minibeit.review.service.exception.BusinessReviewDetailNotFoundException;
import com.minibeit.user.domain.User;
import com.minibeit.user.service.integrate.Users;
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
    private final BusinessUserReviewRepository businessUserReviewRepository;
    private final BusinessUserReviewValidator businessUserReviewValidator;
    private final BusinessProfiles businessProfiles;
    private final Users users;
    private final PostApplicants postApplicants;

    public BusinessUserReviewResponse.OnlyId createBusinessReview(Long businessProfileId, Long postDoDateId, Long reviewDetailId, LocalDateTime now, User user) {
        PostApplicant postApplicant = postApplicants.writeBusinessReview(postDoDateId, user.getId());
        businessUserReviewValidator.createBusinessReviewValidate(postApplicant, now);

        BusinessProfile businessProfile = businessProfiles.getOne(businessProfileId);
        BusinessUserReviewDetail businessUserReviewDetail = businessBusinessUserReviewDetailRepository.findById(reviewDetailId).orElseThrow(BusinessReviewDetailNotFoundException::new);
        BusinessUserReview businessUserReview = BusinessUserReview.createWithBusiness(businessProfile, businessUserReviewDetail, user);
        BusinessUserReview savedReview = businessUserReviewRepository.save(businessUserReview);

        return BusinessUserReviewResponse.OnlyId.build(savedReview);
    }

    public BusinessUserReviewResponse.OnlyId createUserReview(Long businessProfileId, Long userId, Long postDoDateId, Long reviewDetailId, LocalDateTime now, User user) {
        User applicantUser = users.getOne(userId);
        BusinessProfile businessProfile = businessProfiles.getOne(businessProfileId);
        User loginUser = users.getOneWithWithUserBusinessProfileAndBusiness(user.getId());
        PostApplicant postApplicant = postApplicants.writeUserReview(postDoDateId, userId);

        businessUserReviewValidator.createUserReviewValidate(postApplicant, loginUser.getUserBusinessProfileList(), businessProfileId, now);

        BusinessUserReviewDetail businessUserReviewDetail = businessBusinessUserReviewDetailRepository.findById(reviewDetailId).orElseThrow(BusinessReviewDetailNotFoundException::new);
        BusinessUserReview businessUserReview = BusinessUserReview.createWithUser(applicantUser, businessProfile, businessUserReviewDetail);
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
