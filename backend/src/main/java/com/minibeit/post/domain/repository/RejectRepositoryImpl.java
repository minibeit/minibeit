package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.RejectPost;
import com.minibeit.user.domain.User;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import static com.minibeit.post.domain.QRejectPost.rejectPost;

@RequiredArgsConstructor
public class RejectRepositoryImpl implements RejectPostRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<RejectPost> getListByUser(User user, Pageable pageable) {
        final JPAQuery<RejectPost> query = queryFactory.selectFrom(rejectPost)
                .where(rejectPost.user.id.eq(user.getId()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(rejectPost.id.desc());

        QueryResults<RejectPost> results = query.fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }
}
