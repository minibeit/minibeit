package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostApplicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PostApplicantRepository extends JpaRepository<PostApplicant, Long> {
    @Query("select pa from PostApplicant pa where pa.postDoDate.id=:postDoDateId and pa.postStatus='APPROVE'")
    List<PostApplicant> findAllByPostDoDateIdAndStatusIsApprove(Long postDoDateId);

    Optional<PostApplicant> findByPostDoDateIdAndUserId(Long postDoDateId, Long userId);

    void deleteByPostDoDateIdAndUserId(Long postDoDateId, Long userId);

    Optional<PostApplicant> findByUserIdAndPostDoDateId(Long userId, Long postDoDateId);
}
