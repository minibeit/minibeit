package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostStatus;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.post.dto.QPostResponse_GetMyApplyList;
import com.minibeit.user.domain.User;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

import static com.minibeit.post.domain.QPost.post;
import static com.minibeit.post.domain.QPostApplicant.postApplicant;
import static com.minibeit.post.domain.QPostDoDate.postDoDate;
import static com.minibeit.post.domain.QPostLike.postLike;

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
                .leftJoin(post.postLikeList).fetchJoin()
                .where(post.school.id.eq(schoolId)
                        .and(paymentTypeEq(paymentType)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());


        QueryResults<Post> results = query.fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }

    @Override
    public Optional<Post> findByIdWithBusinessProfile(Long postId) {
        return Optional.ofNullable(queryFactory.selectFrom(post)
                .join(post.school).fetchJoin()
                .join(post.businessProfile).fetchJoin()
                .where(post.id.eq(postId))
                .fetchOne());
    }

    @Override
    public Page<Post> findAllByBusinessProfileId(Long businessProfileId, PostStatus postStatus, Pageable pageable) {
        JPAQuery<Post> query = queryFactory.selectFrom(post)
                .join(post.businessProfile)
                .leftJoin(post.postLikeList).fetchJoin()
                .where(post.businessProfile.id.eq(businessProfileId)
                        .and(postStatusEq(postStatus)))
                .orderBy(post.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());
        QueryResults<Post> results = query.fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }

    private BooleanExpression postStatusEq(PostStatus postStatus) {
        if (Objects.nonNull(postStatus)) {
            return post.postStatus.eq(postStatus);
        }
        return null;
    }

    public Page<Post> findAllByLike(User user, Pageable pageable) {
        JPAQuery<Post> query = queryFactory.selectFrom(post)
                .join(post.postLikeList, postLike)
                .where(postLike.createdBy.eq(user))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        QueryResults<Post> results = query.fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }

    @Override
    public Page<PostResponse.GetMyApplyList> findByApplyIsApproveOrWait(User user, Pageable pageable) {
        JPAQuery<PostResponse.GetMyApplyList> query = queryFactory.select(new QPostResponse_GetMyApplyList(
                        post.id, post.title, post.doTime, post.contact, post.recruitCondition, postDoDate.id, postDoDate.doDate, postApplicant.applyStatus.stringValue()
                ))
                .from(post)
                .join(post.postDoDateList, postDoDate)
                .join(postDoDate.postApplicantList, postApplicant)
                .where(postApplicant.user.eq(user)
                        .and(postApplicant.applyStatus.eq(ApplyStatus.APPROVE).or(postApplicant.applyStatus.eq(ApplyStatus.WAIT))
                                .and(postDoDate.doDate.before(LocalDateTime.now()))))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        QueryResults<PostResponse.GetMyApplyList> results = query.fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }

    @Override
    public Page<PostResponse.GetMyApplyList> findByApplyAndFinishedWithoutReview(User user, Pageable pageable) {

        JPAQuery<PostResponse.GetMyApplyList> query = queryFactory.select(new QPostResponse_GetMyApplyList(
                        post.id, post.title, post.doTime, post.contact, post.recruitCondition, postDoDate.id, postDoDate.doDate, postApplicant.applyStatus.stringValue()
                ))
                .from(post)
                .join(post.postDoDateList, postDoDate)
                .join(postDoDate.postApplicantList, postApplicant)
                .where(postApplicant.user.eq(user)
                        .and(postApplicant.applyStatus.eq(ApplyStatus.APPROVE)
                                .and(postApplicant.myFinish.isTrue())
                                .and(postApplicant.businessFinish.isTrue())
                                .and(postApplicant.writeReview.isFalse())))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        QueryResults<PostResponse.GetMyApplyList> results = query.fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }

    private BooleanExpression paymentTypeEq(Payment paymentType) {
        if (Objects.nonNull(paymentType) && !paymentType.equals(Payment.ALL)) {
            return post.payment.eq(paymentType);
        }
        return null;
    }
}
