package com.minibeit.businessprofile.service;

import com.minibeit.businessprofile.domain.BusinessProfileReview;
import com.minibeit.businessprofile.domain.repository.BusinessProfileReviewRepository;
import com.minibeit.businessprofile.dto.BusinessProfileReviewResponse;
import com.minibeit.businessprofile.dto.BusinessProfilesReviewRequest;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BusinessProfileReviewService {
    private final PostRepository postRepository;
    private final PostApplicantRepository postApplicantRepository;
    private final BusinessProfileReviewRepository businessProfileReviewRepository;

    public BusinessProfileReviewResponse.ReviewId createReview(Long postId, Long postDoDateId, BusinessProfilesReviewRequest.CreateReview request, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        PostApplicant postApplicant = postApplicantRepository.findByUserIdAndPostDoDateId(user.getId(), postDoDateId).orElseThrow(PostApplicantNotFoundException::new);
        if (!postApplicant.writeReviewIsPossible()) {
            throw new PermissionException();
        }
        postApplicant.updateWriteReview();
        BusinessProfileReview businessProfileReview = BusinessProfileReview.create(post.getBusinessProfile(), request);
        BusinessProfileReview savedReview = businessProfileReviewRepository.save(businessProfileReview);
        return BusinessProfileReviewResponse.ReviewId.build(savedReview);
    }
}
