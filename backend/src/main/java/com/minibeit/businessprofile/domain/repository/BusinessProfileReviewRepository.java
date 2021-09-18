package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.BusinessProfileReview;
import com.minibeit.common.dto.PageDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessProfileReviewRepository extends JpaRepository<BusinessProfileReview, Long>, BusinessProfileReviewRepositoryCustom {
}
