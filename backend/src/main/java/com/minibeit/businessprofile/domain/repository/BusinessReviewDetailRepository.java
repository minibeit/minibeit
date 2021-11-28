package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.BusinessReviewDetail;
import com.minibeit.businessprofile.domain.ReviewType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessReviewDetailRepository extends JpaRepository<BusinessReviewDetail, Long> {
    List<BusinessReviewDetail> findAllByType(ReviewType type);
}
