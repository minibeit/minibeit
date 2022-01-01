package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static com.minibeit.businessprofile.domain.QBusinessProfile.businessProfile;
import static com.minibeit.businessprofile.domain.QUserBusinessProfile.userBusinessProfile;
import static com.minibeit.post.domain.QPost.post;

@RequiredArgsConstructor
public class BusinessProfileRepositoryImpl implements BusinessProfileRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<BusinessProfile> findAllByUserId(Long userId) {
        return queryFactory.selectFrom(businessProfile)
                .join(businessProfile.userBusinessProfileList, userBusinessProfile)
                .leftJoin(businessProfile.avatar).fetchJoin()
                .where(userBusinessProfile.user.id.eq(userId))
                .fetch();
    }

    @Override
    public Optional<BusinessProfile> findByIdWithAdmin(Long businessProfileId) {
        return Optional.ofNullable(
                queryFactory.selectFrom(businessProfile)
                        .join(businessProfile.admin).fetchJoin()
                        .leftJoin(businessProfile.avatar).fetchJoin()
                        .where(businessProfile.id.eq(businessProfileId))
                        .fetchOne()
        );
    }

    @Override
    public Boolean existsPostByBusinessProfileId(Long businessProfileId) {
        Integer fetchOne = queryFactory.selectOne()
                .from(post)
                .where(post.businessProfile.id.eq(businessProfileId))
                .fetchFirst();

        return fetchOne != null;
    }
}
