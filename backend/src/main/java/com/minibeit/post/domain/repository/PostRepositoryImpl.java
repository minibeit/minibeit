package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Objects;
import java.util.Optional;

import static com.minibeit.businessprofile.domain.QBusinessProfile.businessProfile;
import static com.minibeit.post.domain.QPost.post;
import static com.minibeit.post.domain.QPostDoDate.postDoDate;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Post> findAllBySchoolIdAndDoDate(Long schoolId, LocalDate doDate, Payment paymentType, Pageable pageable) {
        //TODO 이렇게 distinct를 사용한경우와 service layer에서 로직을 사용해서 구분하는 경우 뭐가 좋은지 성능 테스트 해보면 좋을 것 같음.
        JPAQuery<Post> query = queryFactory.selectFrom(post).distinct()
                .join(post.postDoDateList, postDoDate).on(postDoDate.doDate.year().eq(doDate.getYear())
                        .and(postDoDate.doDate.month().eq(doDate.getMonthValue()))
                        .and(postDoDate.doDate.dayOfMonth().eq(doDate.getDayOfMonth())))
                .join(post.businessProfile).fetchJoin()
                .where(post.school.id.eq(schoolId))
                .where(paymentTypeEq(paymentType))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());


        QueryResults<Post> results = query.fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }

    @Override
    public Optional<Post> findByIdWithBusinessProfile(Long postId) {
        return Optional.ofNullable(queryFactory.selectFrom(post)
                .join(post.school).fetchJoin()
                .join(post.businessProfile, businessProfile).fetchJoin()
                .where(post.id.eq(postId))
                .fetchOne());
    }

    private BooleanExpression paymentTypeEq(Payment paymentType) {
        if (Objects.nonNull(paymentType) && !paymentType.equals(Payment.ALL)) {
            return post.payment.eq(paymentType);
        }
        return null;
    }
}
