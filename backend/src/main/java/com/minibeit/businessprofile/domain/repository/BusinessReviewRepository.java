package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.BusinessReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessReviewRepository extends JpaRepository<BusinessReview, Long> {
}
