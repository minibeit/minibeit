package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostLike;
import com.minibeit.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    Optional<PostLike> findByPostIdAndCreatedBy(Long postId, User user);
}
