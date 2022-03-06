package com.minibeit.post.service.integrate;

import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class PostApplicantReviewProcessing implements PostApplicants {
    private final PostApplicantRepository postApplicantRepository;

    @Override
    public PostApplicant getPostDoDateIdAndUserId(Long postDoDateId, Long userId) {
        return postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);
    }

    @Override
    public PostApplicant writeBusinessReview(Long postDoDateId, Long userId) {
        PostApplicant postApplicant = getPostDoDateIdAndUserId(postDoDateId, userId);
        postApplicant.updateWriteReview();
        return postApplicant;
    }

    @Override
    public PostApplicant writeUserReview(Long postDoDateId, Long userId) {
        PostApplicant postApplicant = getPostDoDateIdAndUserId(postDoDateId, userId);
        postApplicant.evaluated();
        return postApplicant;
    }
}
