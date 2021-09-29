package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.BusinessProfileReview;
import com.minibeit.businessprofile.domain.QBusinessProfile;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import static com.minibeit.businessprofile.domain.QBusinessProfile.*;
import static com.minibeit.businessprofile.domain.QBusinessProfileReview.businessProfileReview;


@RequiredArgsConstructor
public class BusinessProfileReviewRepositoryImpl implements BusinessProfileReviewRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<BusinessProfileReview> findAllByBusinessProfileId(Long businessProfileId, Pageable pageable) {
        QueryResults<BusinessProfileReview> results = queryFactory
                .selectFrom(businessProfileReview)
                .join(businessProfileReview.businessProfile, businessProfile)
                .where(businessProfile.id.eq(businessProfileId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(businessProfileReview.id.desc())
                .fetchResults();
        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }
}
