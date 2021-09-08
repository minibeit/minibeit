package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostDoDate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostDoDateRepository extends JpaRepository<PostDoDate, Long>, PostDoDateRepositoryCustom {
    Optional<PostDoDate> findByIdAndPostId(Long postDoDateId, Long postId);
}
