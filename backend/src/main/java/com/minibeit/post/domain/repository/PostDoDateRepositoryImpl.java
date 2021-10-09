package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostDoDate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

import static com.minibeit.post.domain.QPost.post;
import static com.minibeit.post.domain.QPostDoDate.postDoDate;

@RequiredArgsConstructor
public class PostDoDateRepositoryImpl implements PostDoDateRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<PostDoDate> findAllByPostIdAndDoDate(Long postId, LocalDate doDate) {
        return queryFactory.selectFrom(postDoDate)
                .join(postDoDate.post, post).fetchJoin()
                .where(post.id.eq(postId)
                        .and(postDoDate.doDate.year().eq(doDate.getYear())
                                .and(postDoDate.doDate.month().eq(doDate.getMonthValue()))
                                .and(postDoDate.doDate.dayOfMonth().eq(doDate.getDayOfMonth()))))
                .fetch();
    }

    @Override
    public List<PostDoDate> findAllByPostIdAndYearMonth(Long postId, YearMonth yearMonth) {
        return queryFactory.selectFrom(postDoDate)
                .where(postDoDate.post.id.eq(postId)
                        .and(postDoDate.doDate.year().eq(yearMonth.getYear())
                                .and(postDoDate.doDate.month().eq(yearMonth.getMonthValue()))))
                .fetch();
    }

    @Override
    public Optional<PostDoDate> findByIdWithPostAndApplicant(Long postDoDateId) {
        return Optional.ofNullable(
                queryFactory.selectFrom(postDoDate).distinct()
                        .join(postDoDate.post).fetchJoin()
                        .leftJoin(postDoDate.postApplicantList).fetchJoin()
                        .where(postDoDate.id.eq(postDoDateId))
                        .fetchOne());
    }
}
