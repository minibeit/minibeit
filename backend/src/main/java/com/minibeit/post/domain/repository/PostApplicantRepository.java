package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.PostApplicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostApplicantRepository extends JpaRepository<PostApplicant, Long>, PostApplicantRepositoryCustom {
    @Query("select pa from PostApplicant pa where pa.postDoDate.id=:postDoDateId and pa.applyStatus='APPROVE'")
    List<PostApplicant> findAllByPostDoDateIdAndStatusIsApprove(Long postDoDateId);

    void deleteByPostDoDateIdAndUserId(Long postDoDateId, Long userId);

    @Modifying
    @Query("update PostApplicant pa set pa.applyStatus=:status where pa.id in :applicantIdList")
    void updateReject(List<Long> applicantIdList, ApplyStatus status);
}
