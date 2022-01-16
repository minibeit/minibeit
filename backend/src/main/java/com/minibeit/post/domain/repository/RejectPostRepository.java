package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.RejectPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RejectPostRepository extends JpaRepository<RejectPost, Long> {
    void deleteByIdAndUserId(Long rejectPostId, Long id);

    Page<RejectPost> findAllByUserId(Long userId, Pageable pageable);
}
