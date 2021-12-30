package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostFileRepository extends JpaRepository<PostFile, Long> {
}
