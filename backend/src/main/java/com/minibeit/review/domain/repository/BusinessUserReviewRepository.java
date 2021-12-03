package com.minibeit.review.domain.repository;

import com.minibeit.review.domain.BusinessUserReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessUserReviewRepository extends JpaRepository<BusinessUserReview, Long> {
}
