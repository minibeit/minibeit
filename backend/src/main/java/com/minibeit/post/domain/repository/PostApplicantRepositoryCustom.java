package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.dto.PostApplicantDto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PostApplicantRepositoryCustom {
    List<PostApplicantDto.UserInfo> findAllByPostAndDoDate(Long postId, ApplyStatus applyStatus, LocalDate doDate);

    List<PostApplicant> findAllByPostIdAndApplyStatus(Long postId, ApplyStatus applyStatus);

    Optional<PostApplicant> findByPostDoDateIdAndUserIdWithPostDoDateAndPost(Long postDoDateId, Long userId);

    List<PostApplicant> findAllByDoDateBeforeToday(LocalDateTime now);

    boolean existsApproveAfterNow(Long postId, LocalDateTime now);
}
