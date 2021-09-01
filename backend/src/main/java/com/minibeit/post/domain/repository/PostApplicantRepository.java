package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostApplicant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostApplicantRepository extends JpaRepository<PostApplicant, Long> {
}
