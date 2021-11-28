package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.BusinessReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessProfileReviewRepository extends JpaRepository<BusinessReview, Long> {
}
