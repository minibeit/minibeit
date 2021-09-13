package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostDoDate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostDoDateRepository extends JpaRepository<PostDoDate, Long>, PostDoDateRepositoryCustom {
}
