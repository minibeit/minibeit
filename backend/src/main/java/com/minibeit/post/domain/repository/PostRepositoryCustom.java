package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostStatus;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;

public interface PostRepositoryCustom {
    Page<Post> findAllBySchoolIdAndDoDate(Long schoolId, LocalDate doDate, Payment paymentType, String category, LocalTime startTime, LocalTime endTime, Integer minPay, Integer doTime, Pageable pageable);

    Optional<Post> findByIdWithBusinessProfile(Long postId);

    Page<Post> findAllByBusinessProfileId(Long businessProfileId, PostStatus postStatus, LocalDateTime now, Pageable pageable);

    Page<Post> findAllByLike(User user, Pageable pageable);

    Page<PostResponse.GetMyApplyList> findAllByApplyStatus(ApplyStatus status, User user, LocalDateTime now, Pageable of);

    Optional<Post> findGetOneByPostId(Long postId);
}
