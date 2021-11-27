package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.PostDoDate;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

public interface PostDoDateRepositoryCustom {
    List<PostDoDate> findAllByPostIdAndDoDate(Long postId, LocalDate doDate);

    List<PostDoDate> findAllByPostIdAndYearMonth(Long postId, YearMonth yearMonth);

    Optional<PostDoDate> findByIdWithPostAndApplicant(Long postDoDateId);

    Optional<PostDoDate> findByIdWithPostAndBusinessProfile(Long postDoDateId);
}
