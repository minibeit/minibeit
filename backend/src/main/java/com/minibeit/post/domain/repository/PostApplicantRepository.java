package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostApplicant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostApplicantRepository extends JpaRepository<PostApplicant, Long> {
    Optional<PostApplicant> findByPostIdAndUserId(Long postId, Long userId);
}
