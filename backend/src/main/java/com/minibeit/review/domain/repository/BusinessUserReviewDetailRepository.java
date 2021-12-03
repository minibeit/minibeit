package com.minibeit.review.domain.repository;

import com.minibeit.review.domain.BusinessUserReviewDetail;
import com.minibeit.review.domain.BusinessUserReviewEvalType;
import com.minibeit.review.domain.BusinessUserReviewType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessUserReviewDetailRepository extends JpaRepository<BusinessUserReviewDetail, Long>, BusinessUserReviewDetailRepositoryCustom {
    List<BusinessUserReviewDetail> findAllByTypeAndEvalType(BusinessUserReviewType type, BusinessUserReviewEvalType evalType);
}
