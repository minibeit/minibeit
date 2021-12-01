package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.dto.BusinessReviewResponse;

import java.util.List;

public interface BusinessReviewDetailRepositoryCustom {
    List<BusinessReviewResponse.CountsByReviews> findCountByBusinessProfileId(Long businessProfileId);
}
