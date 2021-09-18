package com.minibeit.post.domain.repository;

import com.minibeit.post.dto.PostApplicantResponse;

import java.time.LocalDate;
import java.util.List;

public interface PostApplicantRepositoryCustom {
    List<PostApplicantResponse.UserInfo> findAllByPostAndDoDate(Long postId, LocalDate doDate);
}
