package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.ReviewType;
import com.minibeit.businessprofile.dto.BusinessReviewResponse;
import com.minibeit.businessprofile.dto.QBusinessReviewResponse_CountsByReviews;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.minibeit.businessprofile.domain.QBusinessReview.businessReview;
import static com.minibeit.businessprofile.domain.QBusinessReviewDetail.businessReviewDetail;

@RequiredArgsConstructor
public class BusinessReviewDetailRepositoryImpl implements BusinessReviewDetailRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<BusinessReviewResponse.CountsByReviews> findCountByBusinessProfileId(Long businessProfileId) {
        return queryFactory
                .select(new QBusinessReviewResponse_CountsByReviews(businessReviewDetail.id, businessReviewDetail.content, businessReview.count()))
                .from(businessReviewDetail)
                .leftJoin(businessReviewDetail.businessReviewList, businessReview).on(businessReview.businessProfile.id.eq(businessProfileId))
                .where(businessReviewDetail.type.eq(ReviewType.GOOD).and(businessReviewDetail.id.ne(5L)))
                .groupBy(businessReviewDetail.id)
                .fetch();
    }
}
