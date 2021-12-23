package com.minibeit.user.domain.repository;

import com.minibeit.user.domain.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static com.minibeit.businessprofile.domain.QUserBusinessProfile.userBusinessProfile;
import static com.minibeit.user.domain.QUser.user;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<User> findByOauthIdWithAvatar(String oauthId) {
        return Optional.ofNullable(
                queryFactory.selectFrom(user)
                        .leftJoin(user.avatar).fetchJoin()
                        .where(user.oauthId.eq(oauthId))
                        .fetchOne()
        );
    }

    @Override
    public List<User> findAllInBusinessProfile(Long businessProfileId) {
        return queryFactory.selectFrom(user)
                .join(user.userBusinessProfileList, userBusinessProfile)
                .where(userBusinessProfile.businessProfile.id.eq(businessProfileId))
                .fetch();
    }

    @Override
    public Optional<User> findByIdWithSchool(Long userId) {
        return Optional.ofNullable(queryFactory.selectFrom(user)
                .join(user.school).fetchJoin()
                .where(user.id.eq(userId))
                .fetchOne());
    }

    @Override
    public Optional<User> findByIdWithAvatar(Long userId) {
        return Optional.ofNullable(
                queryFactory.selectFrom(user)
                        .leftJoin(user.avatar).fetchJoin()
                        .where(user.id.eq(userId))
                        .fetchOne()
        );
    }

    @Override
    public Optional<User> findByIdWithUserBusinessProfile(Long userId) {
        return Optional.ofNullable(
                queryFactory.selectFrom(user)
                        .leftJoin(user.userBusinessProfileList).fetchJoin()
                        .where(user.id.eq(userId))
                        .fetchOne());
    }
}
