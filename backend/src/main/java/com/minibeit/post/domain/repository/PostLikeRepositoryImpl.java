package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostLike;
import com.minibeit.post.domain.PostStatus;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.minibeit.post.domain.QPost.post;
import static com.minibeit.post.domain.QPostLike.postLike;

@RequiredArgsConstructor
public class PostLikeRepositoryImpl implements PostLikeRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<PostLike> findAllByUserIdWithCompletedPost(Long userId) {
        return queryFactory.selectFrom(postLike)
                .join(postLike.post, post).fetchJoin()
                .where(post.postStatus.eq(PostStatus.COMPLETE)
                        .and(postLike.user.id.eq(userId)))
                .fetch();
    }
}
