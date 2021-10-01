package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.RejectPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RejectPostRepository extends JpaRepository<RejectPost, Long>, RejectPostRepositoryCustom {
    void deleteByIdAndUserId(Long rejectPostId, Long id);
}
