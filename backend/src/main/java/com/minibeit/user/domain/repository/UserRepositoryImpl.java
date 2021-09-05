package com.minibeit.user.domain.repository;

import com.minibeit.user.domain.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.minibeit.businessprofile.domain.QUserBusinessProfile.userBusinessProfile;
import static com.minibeit.user.domain.QUser.user;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<User> findAllInBusinessProfile(Long businessProfileId) {
        return queryFactory.selectFrom(user)
                .join(user.userBusinessProfileList, userBusinessProfile).on(userBusinessProfile.businessProfile.id.eq(businessProfileId))
                .fetch();
    }
}
