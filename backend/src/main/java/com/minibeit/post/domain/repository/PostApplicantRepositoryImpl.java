package com.minibeit.post.domain.repository;

import com.minibeit.post.dto.PostApplicantResponse;
import com.minibeit.post.dto.QPostApplicantResponse_UserInfo;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

import static com.minibeit.post.domain.QPost.post;
import static com.minibeit.post.domain.QPostApplicant.postApplicant;
import static com.minibeit.post.domain.QPostDoDate.postDoDate;
import static com.minibeit.user.domain.QUser.user;

@RequiredArgsConstructor
public class PostApplicantRepositoryImpl implements PostApplicantRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<PostApplicantResponse.UserInfo> findAllByPostAndDoDate(Long postId, LocalDate doDate) {
        return queryFactory.select(new QPostApplicantResponse_UserInfo(
                        user.id, user.name, user.birth, user.gender, user.phoneNum, user.job, post.doTime, postApplicant.applyStatus, postDoDate.doDate
                ))
                .from(postApplicant)
                .join(postApplicant.user, user)
                .join(postApplicant.postDoDate, postDoDate)
                .join(postDoDate.post, post)
                .where(post.id.eq(postId).and(postDoDate.doDate.year().eq(doDate.getYear())
                        .and(postDoDate.doDate.month().eq(doDate.getMonthValue()))
                        .and(postDoDate.doDate.dayOfMonth().eq(doDate.getDayOfMonth()))))
                .fetch();
    }
}
