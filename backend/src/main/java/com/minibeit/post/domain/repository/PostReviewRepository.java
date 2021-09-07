package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostReviewRepository extends JpaRepository<PostReview, Long> {
}
