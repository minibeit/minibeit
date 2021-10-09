package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.BusinessProfileReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface BusinessProfileReviewRepositoryCustom {
    Page<BusinessProfileReview>  findAllByBusinessProfileId(Long businessProfileId, Pageable pageable);

    Optional<BusinessProfileReview> findByIdWithUser(Long businessProfileReviewId);

}
