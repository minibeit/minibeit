package com.minibeit.post.domain.repository;

import com.minibeit.post.dto.PostApplicantDto;

import java.time.LocalDate;
import java.util.List;

public interface PostApplicantRepositoryCustom {
    List<PostApplicantDto.UserInfo> findAllByPostAndDoDate(Long postId, LocalDate doDate);

    List<PostApplicantDto.UserInfo> findAllByPostAndDoDateAndApprove(Long postId, LocalDate doDate);
}
