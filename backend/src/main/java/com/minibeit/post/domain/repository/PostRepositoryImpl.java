package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.Post;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

import static com.minibeit.post.domain.QPost.post;
import static com.minibeit.post.domain.QPostDoDate.postDoDate;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Post> findAllBySchoolIdAndDoDate(Long schoolId, LocalDate doDate, Pageable pageable) {
        JPAQuery<Post> query = queryFactory.selectFrom(post)
                .join(post.postDoDateList, postDoDate).on(postDoDate.doDate.year().eq(doDate.getYear())
                        .and(postDoDate.doDate.month().eq(doDate.getMonthValue()))
                        .and(postDoDate.doDate.dayOfMonth().eq(doDate.getDayOfMonth())))
                .where(post.school.id.eq(schoolId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());


        QueryResults<Post> results = query.fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }
}
