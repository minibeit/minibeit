package com.minibeit.review.domain.repository;

import com.minibeit.review.domain.BusinessUserReviewEvalType;
import com.minibeit.review.domain.BusinessUserReviewType;
import com.minibeit.review.dto.BusinessUserReviewResponse;
import com.minibeit.review.dto.QBusinessUserReviewResponse_CountsByReviews;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.minibeit.review.domain.QBusinessUserReview.businessUserReview;
import static com.minibeit.review.domain.QBusinessUserReviewDetail.businessUserReviewDetail;

@RequiredArgsConstructor
public class BusinessUserReviewDetailRepositoryImpl implements BusinessUserReviewDetailRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<BusinessUserReviewResponse.CountsByReviews> findCountByBusinessProfileId(Long businessProfileId) {
        return queryFactory
                .select(new QBusinessUserReviewResponse_CountsByReviews(businessUserReviewDetail.id, businessUserReviewDetail.content, businessUserReview.count()))
                .from(businessUserReviewDetail)
                .leftJoin(businessUserReviewDetail.businessUserReviewList, businessUserReview).on(businessUserReview.businessProfile.id.eq(businessProfileId))
                .where(businessUserReviewDetail.type.eq(BusinessUserReviewType.B)
                        .and(businessUserReviewDetail.evalType.eq(BusinessUserReviewEvalType.GOOD))
                        .and(businessUserReviewDetail.id.ne(5L)))
                .groupBy(businessUserReviewDetail.id)
                .fetch();
    }
}
