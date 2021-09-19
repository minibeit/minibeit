package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.BusinessProfileReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BusinessProfileReviewRepositoryCustom {
    Page<BusinessProfileReview>  findAllByBusinessProfileId(Long businessProfileId, Pageable pageable);
}
