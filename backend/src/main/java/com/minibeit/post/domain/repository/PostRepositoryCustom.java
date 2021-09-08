package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Optional;

public interface PostRepositoryCustom {
    Page<Post> findAllBySchoolIdAndDoDate(Long schoolId, LocalDate doDate, Pageable pageable);

    Optional<Post> findByIdWithBusinessProfile(Long postId);
}
