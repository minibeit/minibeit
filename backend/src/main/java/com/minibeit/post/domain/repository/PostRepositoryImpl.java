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
import java.time.LocalTime;
import java.util.Objects;
import java.util.Optional;

import static com.minibeit.businessprofile.domain.QBusinessProfile.businessProfile;
import static com.minibeit.post.domain.QPost.post;
import static com.minibeit.post.domain.QPostApplicant.postApplicant;
import static com.minibeit.post.domain.QPostDoDate.postDoDate;
import static com.minibeit.post.domain.QPostLike.postLike;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Post> findAllBySchoolIdAndDoDate(Long schoolId, LocalDate doDate, Payment paymentType, String category, LocalTime startTime, LocalTime endTime, Integer minPay, Integer doTime, Pageable pageable) {
        JPAQuery<Post> query = queryFactory.selectFrom(post).distinct()
                .join(post.postDoDateList, postDoDate)
                .join(post.businessProfile).fetchJoin()
                .where((postDoDate.doDate.year().eq(doDate.getYear())
                        .and(postDoDate.doDate.month().eq(doDate.getMonthValue()))
                        .and(postDoDate.doDate.dayOfMonth().eq(doDate.getDayOfMonth())))
                        .and(post.postStatus.eq(PostStatus.RECRUIT))
                        .and(paymentTypeEq(paymentType))
                        .and(categoryEq(category))
                        .and(minPayGoe(minPay))
                        .and(doTimeLoe(doTime))
                        .and(startEndTimeBetween(doDate, startTime, endTime))
                        .and(schoolIdEq(schoolId)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(post.id.desc());

        QueryResults<Post> results = query.fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }

    private BooleanExpression schoolIdEq(Long schoolId) {
        if (Objects.nonNull(schoolId) && !schoolId.equals(0L)) {
            return post.school.id.eq(schoolId);
        }
        return null;
    }

    private BooleanExpression paymentTypeEq(Payment paymentType) {
        if (Objects.nonNull(paymentType) && !paymentType.equals(Payment.ALL)) {
            return post.payment.eq(paymentType);
        }
        return null;
    }

    private BooleanExpression categoryEq(String category) {
        if (Objects.nonNull(category) && !category.equals("ALL")) {
            return post.category.eq(category);
        }
        return null;
    }

    private BooleanExpression startEndTimeBetween(LocalDate doDate, LocalTime startTime, LocalTime endTime) {
        if (Objects.nonNull(startTime) && Objects.nonNull(endTime)) {
            LocalDateTime startDateTime = LocalDateTime.of(doDate.getYear(), doDate.getMonthValue(), doDate.getDayOfMonth(), startTime.getHour(), startTime.getMinute());
            LocalDateTime endDateTime = LocalDateTime.of(doDate.getYear(), doDate.getMonthValue(), doDate.getDayOfMonth(), endTime.getHour(), endTime.getMinute());
            return postDoDate.doDate.goe(startDateTime).and(postDoDate.doDate.loe(endDateTime));
        }
        return null;
    }

    private BooleanExpression minPayGoe(Integer minPay) {
        if (Objects.nonNull(minPay) && post.paymentCache != null && minPay == 9999) {
            return post.paymentCache.lt(10000);
        }
        if (Objects.nonNull(minPay) && post.paymentCache != null) {
            return post.paymentCache.goe(minPay);
        }
        return null;
    }

    private BooleanExpression doTimeLoe(Integer doTime) {
        if (Objects.nonNull(doTime) && doTime == 181) {
            return post.doTime.goe(180);
        }
        if (Objects.nonNull(doTime)) {
            return post.doTime.loe(doTime);
        }
        return null;
    }

    @Override
    public Optional<Post> findByIdWithBusinessProfile(Long postId) {
        return Optional.ofNullable(queryFactory.selectFrom(post)
                .join(post.school).fetchJoin()
                .join(post.businessProfile, businessProfile).fetchJoin()
                .leftJoin(businessProfile.avatar).fetchJoin()
                .where(post.id.eq(postId))
                .fetchOne());
    }

    @Override
    public Page<Post> findAllByBusinessProfileId(Long businessProfileId, PostStatus postStatus, LocalDateTime now, Pageable pageable) {
        JPAQuery<Post> query = queryFactory.selectFrom(post)
                .join(post.businessProfile).fetchJoin()
                .where(post.businessProfile.id.eq(businessProfileId)
                        .and(postStatusEq(postStatus, now)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(post.id.desc());
        QueryResults<Post> results = query.fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }

    private BooleanExpression postStatusEq(PostStatus postStatus, LocalDateTime now) {
        if (postStatus.equals(PostStatus.RECRUIT)) {
            return post.postStatus.eq(postStatus).and(post.endDate.after(now));
        }
        if (postStatus.equals(PostStatus.COMPLETE)) {
            return post.postStatus.eq(postStatus).or(post.endDate.before(now));
        }
        return null;
    }

    @Override
    public Page<Post> findAllByLike(User user, Pageable pageable) {
        JPAQuery<Post> query = queryFactory.selectFrom(post)
                .join(post.postLikeList, postLike)
                .where(postLike.user.id.eq(user.getId()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(postLike.id.desc());

        QueryResults<Post> results = query.fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }

    @Override
    public Page<PostResponse.GetMyApplyList> findAllByApplyStatus(ApplyStatus status, User user, LocalDateTime now, Pageable pageable) {
        JPAQuery<PostResponse.GetMyApplyList> query = queryFactory.select(new QPostResponse_GetMyApplyList(
                        post.id, post.title, post.doTime, post.category, post.place, post.placeDetail, post.contact, post.thumbnail, post.recruitCondition, postDoDate.id, postDoDate.doDate, postApplicant.applyStatus.stringValue(), postApplicant.businessFinish, postApplicant.writeReview, businessProfile.id, businessProfile.name
                ))
                .from(post)
                .join(post.businessProfile, businessProfile)
                .join(post.postDoDateList, postDoDate)
                .join(postDoDate.postApplicantList, postApplicant)
                .where(postApplicant.user.eq(user)
                        .and(applyStatusEq(status, now)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        if (status.equals(ApplyStatus.APPROVE)) {
            query.orderBy(postDoDate.doDate.asc());
        }

        if (status.equals(ApplyStatus.WAIT)) {
            query.orderBy(postApplicant.id.desc());
        }

        QueryResults<PostResponse.GetMyApplyList> results = query.fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }

    private BooleanExpression applyStatusEq(ApplyStatus status, LocalDateTime now) {
        if (status.equals(ApplyStatus.WAIT)) {
            return postApplicant.applyStatus.eq(ApplyStatus.WAIT).and(postDoDate.doDate.goe(now));
        }
        if (status.equals(ApplyStatus.APPROVE)) {
            return postApplicant.applyStatus.eq(ApplyStatus.APPROVE);
        }
        if (status.equals(ApplyStatus.COMPLETE)) {
            return postApplicant.applyStatus.eq(ApplyStatus.COMPLETE).and(postApplicant.businessFinish.isTrue());
        }
        return null;
    }
}
