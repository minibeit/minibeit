package com.minibeit.postapplicant.domain.repository;

import com.minibeit.postapplicant.domain.ApplyStatus;
import com.minibeit.postapplicant.domain.PostApplicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostApplicantRepository extends JpaRepository<PostApplicant, Long>, PostApplicantRepositoryCustom {
    @Query("select pa from PostApplicant pa where pa.postDoDate.id=:postDoDateId and pa.applyStatus='APPROVE'")
    List<PostApplicant> findAllByPostDoDateIdAndStatusIsApprove(@Param("postDoDateId")Long postDoDateId);

    @Modifying
    @Query("update PostApplicant pa set pa.applyStatus=:status where pa.id in :applicantIdList")
    void updateReject(@Param("applicantIdList") List<Long> applicantIdList,@Param("status") ApplyStatus status);

    Optional<PostApplicant> findByPostDoDateIdAndUserId(Long postDoDateId, Long userId);
}
