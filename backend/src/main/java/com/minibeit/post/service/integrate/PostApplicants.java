package com.minibeit.post.service.integrate;

import com.minibeit.post.domain.PostApplicant;

public interface PostApplicants {
    PostApplicant getPostDoDateIdAndUserId(Long postDoDateId, Long userId);

    PostApplicant writeBusinessReview(Long postDoDateId, Long userId);

    PostApplicant writeUserReview(Long postDoDateId, Long userId);
}
