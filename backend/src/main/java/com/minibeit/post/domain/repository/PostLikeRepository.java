package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostLike;
import com.minibeit.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    Optional<PostLike> findByPostIdAndUserId(Long postId, Long id);

    void deleteByPostId(Long postId);

    List<PostLike> findAllByUserId(Long userId);
}
