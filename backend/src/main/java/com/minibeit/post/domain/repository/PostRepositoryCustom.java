package com.minibeit.post.domain.repository;

import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PostRepositoryCustom {
    Page<Post> findAllBySchoolIdAndDoDate(Long schoolId, LocalDate doDate, Payment paymentType, Pageable pageable);

    Optional<Post> findByIdWithBusinessProfile(Long postId);

    List<Post> findAllByBusinessProfileId(Long businessProfileId, String sort);

    Page<Post> findAllByLike(User user, Pageable pageable);

    Page<PostResponse.GetMyApplyList> findByApplyIsApproveOrWait(User user, Pageable pageable);

    Page<PostResponse.GetMyApplyList> findByApplyAndFinishedWithoutReview(User user, Pageable of);
}
