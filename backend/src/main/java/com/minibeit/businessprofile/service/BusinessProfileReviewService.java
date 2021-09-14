package com.minibeit.businessprofile.service;

import com.minibeit.businessprofile.domain.BusinessProfileReview;
import com.minibeit.businessprofile.domain.repository.BusinessProfileReviewRepository;
import com.minibeit.businessprofile.dto.BusinessProfileReviewResponse;
import com.minibeit.businessprofile.dto.BusinessProfilesReviewRequest;
import com.minibeit.businessprofile.service.exception.BusinessProfileReviewNotFoundException;
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

    public BusinessProfileReviewResponse.ReviewId create(Long postId, Long postDoDateId, BusinessProfilesReviewRequest.Create request, User user) {
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

    @Transactional(readOnly = true)
    public BusinessProfileReviewResponse.GetOne getOne(Long businessProfileReviewId) {
        BusinessProfileReview businessProfileReview = businessProfileReviewRepository.findById(businessProfileReviewId).orElseThrow(BusinessProfileReviewNotFoundException::new);
        return BusinessProfileReviewResponse.GetOne.build(businessProfileReview);
    }

    public BusinessProfileReviewResponse.ReviewId update(Long businessProfileReviewId, BusinessProfilesReviewRequest.Update request, User user) {
        BusinessProfileReview businessProfileReview = businessProfileReviewRepository.findById(businessProfileReviewId).orElseThrow(BusinessProfileReviewNotFoundException::new);
        permissionCheck(user, businessProfileReview);
        businessProfileReview.update(request.getContent());
        return BusinessProfileReviewResponse.ReviewId.build(businessProfileReview);
    }

    public void deleteOne(Long businessProfileReviewId, User user) {
        BusinessProfileReview businessProfileReview = businessProfileReviewRepository.findById(businessProfileReviewId).orElseThrow(BusinessProfileReviewNotFoundException::new);
        permissionCheck(user, businessProfileReview);
        businessProfileReviewRepository.delete(businessProfileReview);
    }

    private void permissionCheck(User user, BusinessProfileReview businessProfileReview) {
        if (!businessProfileReview.getCreatedBy().getId().equals(user.getId())) {
            throw new PermissionException();
        }
    }
}
