package com.minibeit.review.domain.repository;

import com.minibeit.review.service.dto.BusinessUserReviewResponse;

import java.util.List;

public interface BusinessUserReviewDetailRepositoryCustom {
    List<BusinessUserReviewResponse.CountsByReviews> findCountByBusinessProfileId(Long businessProfileId);
}
