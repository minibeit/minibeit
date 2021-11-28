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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BusinessReviewService {
    private final BusinessReviewDetailRepository businessReviewDetailRepository;
    private final BusinessProfileRepository businessProfileRepository;
    private final BusinessReviewRepository businessReviewRepository;

    public void create(Long businessProfileId, Long reviewDetailId) {
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
}
