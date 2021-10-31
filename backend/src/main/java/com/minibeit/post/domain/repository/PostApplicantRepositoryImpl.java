package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.dto.PostApplicantDto;
import com.minibeit.post.dto.QPostApplicantDto_UserInfo;
import com.querydsl.core.types.dsl.BooleanExpression;
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
    public List<PostApplicantDto.UserInfo> findAllByPostAndDoDate(Long postId, ApplyStatus applyStatus, LocalDate doDate) {
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
                        .and(byApplyStatus(applyStatus)))
                .orderBy(postDoDate.doDate.asc(), postApplicant.createdAt.asc())
                .fetch();
    }

    private BooleanExpression byApplyStatus(ApplyStatus applyStatus) {
        if (applyStatus.equals(ApplyStatus.WAIT)) {
            return postApplicant.applyStatus.ne(ApplyStatus.REJECT);
        }
        if (applyStatus.equals(ApplyStatus.APPROVE)) {
            return postApplicant.applyStatus.eq(ApplyStatus.APPROVE);
        }
        return null;
    }

    @Override
    public List<PostApplicant> findAllByApplyStatus(Long postId, ApplyStatus applyStatus) {
        return queryFactory.selectFrom(postApplicant)
                .join(postApplicant.postDoDate, postDoDate).fetchJoin()
                .where(postDoDate.post.id.eq(postId)
                        .and(postApplicant.applyStatus.eq(applyStatus)))
                .fetch();
    }

    @Override
    public Optional<PostApplicant> findByPostDoDateIdAndUserIdWithPostDoDateAndPost(Long postDoDateId, Long userId) {
        return Optional.ofNullable(
                queryFactory.selectFrom(postApplicant)
                        .join(postApplicant.postDoDate, postDoDate).fetchJoin()
                        .join(postDoDate.post).fetchJoin()
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

    @Override
    public boolean existsApproveAfterNow(Long postId, LocalDateTime now) {
        Integer fetchOne = queryFactory.selectOne()
                .from(postApplicant)
                .join(postApplicant.postDoDate, postDoDate)
                .where(postDoDate.post.id.eq(postId)
                        .and(postApplicant.applyStatus.eq(ApplyStatus.APPROVE).and(postDoDate.doDate.after(now))))
                .fetchFirst();
        return fetchOne != null;
    }
}
