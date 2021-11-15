package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostLike;

import java.util.List;

public interface PostLikeRepositoryCustom {
    List<PostLike> findAllByUserIdWithCompletedPost(Long userId);
}
