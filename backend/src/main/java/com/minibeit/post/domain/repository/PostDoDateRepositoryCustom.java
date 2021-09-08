package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostDoDate;

import java.time.LocalDate;
import java.util.List;

public interface PostDoDateRepositoryCustom {
    List<PostDoDate> findAllByPostIdAndDoDate(Long postId, LocalDate doDate);
}
