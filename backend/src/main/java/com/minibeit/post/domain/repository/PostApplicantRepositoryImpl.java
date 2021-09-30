package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.dto.PostApplicantDto;
import com.minibeit.post.dto.QPostApplicantDto_UserInfo;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.minibeit.post.domain.QPost.post;
import static com.minibeit.post.domain.QPostApplicant.postApplicant;
import static com.minibeit.post.domain.QPostDoDate.postDoDate;
import static com.minibeit.user.domain.QUser.user;

@RequiredArgsConstructor
public class PostApplicantRepositoryImpl implements PostApplicantRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<PostApplicantDto.UserInfo> findAllByPostAndDoDate(Long postId, LocalDate doDate) {
        return queryFactory.select(new QPostApplicantDto_UserInfo(
                        user.id, user.name, user.birth, user.gender, user.phoneNum, user.job, post.doTime, postApplicant.applyStatus, postApplicant.businessFinish, postDoDate.id, postDoDate.doDate
                ))
                .from(postApplicant)
                .join(postApplicant.user, user)
                .join(postApplicant.postDoDate, postDoDate)
                .join(postDoDate.post, post)
                .where(post.id.eq(postId)
                        .and(postDoDate.doDate.year().eq(doDate.getYear())
                                .and(postDoDate.doDate.month().eq(doDate.getMonthValue()))
                                .and(postDoDate.doDate.dayOfMonth().eq(doDate.getDayOfMonth())))
                        .and(postApplicant.applyStatus.ne(ApplyStatus.REJECT)))
                .orderBy(postDoDate.doDate.asc())
                .fetch();
    }

    @Override
    public List<PostApplicantDto.UserInfo> findAllByPostAndDoDateAndApprove(Long postId, LocalDate doDate) {
        return queryFactory.select(new QPostApplicantDto_UserInfo(
                        user.id, user.name, user.birth, user.gender, user.phoneNum, user.job, post.doTime, postApplicant.applyStatus, postApplicant.businessFinish, postDoDate.id, postDoDate.doDate
                ))
                .from(postApplicant)
                .join(postApplicant.user, user)
                .join(postApplicant.postDoDate, postDoDate)
                .join(postDoDate.post, post)
                .where(post.id.eq(postId)
                        .and(postDoDate.doDate.year().eq(doDate.getYear())
                                .and(postDoDate.doDate.month().eq(doDate.getMonthValue()))
                                .and(postDoDate.doDate.dayOfMonth().eq(doDate.getDayOfMonth())))
                        .and(postApplicant.applyStatus.eq(ApplyStatus.APPROVE)))
                .orderBy(postDoDate.doDate.asc())
                .fetch();
    }

    @Override
    public List<PostApplicant> findAllByApplyStatusIsWait(Long postId) {
        return queryFactory.selectFrom(postApplicant)
                .join(postApplicant.postDoDate, postDoDate)
                .where(postDoDate.post.id.eq(postId)
                        .and(postApplicant.applyStatus.eq(ApplyStatus.WAIT)))
                .fetch();
    }

    @Override
    public Optional<PostApplicant> findByPostDoDateIdAndUserIdWithPostDoDate(Long postDoDateId, Long userId) {
        return Optional.ofNullable(
                queryFactory.selectFrom(postApplicant)
                        .join(postApplicant.postDoDate, postDoDate).fetchJoin()
                        .where(postDoDate.id.eq(postDoDateId).and(postApplicant.user.id.eq(userId)))
                        .fetchOne()
        );
    }

    @Override
    public List<PostApplicant> findAllByDoDateBeforeToday(LocalDateTime now) {
        return queryFactory.selectFrom(postApplicant)
                .join(postApplicant.postDoDate, postDoDate).fetchJoin()
                .join(postDoDate.post).fetchJoin()
                .where(postDoDate.doDate.lt(now).and(postApplicant.applyStatus.eq(ApplyStatus.WAIT)))
                .fetch();
    }
}
