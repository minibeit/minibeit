package com.minibeit.post.service;

import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.service.exception.*;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostApplicantService {
    private final PostRepository postRepository;
    private final PostDoDateRepository postDoDateRepository;
    private final PostApplicantRepository postApplicantRepository;
    private final UserBusinessProfileRepository userBusinessProfileRepository;

    public void apply(Long postId, PostRequest.Apply request, User user) {
        PostDoDate postDoDate = postDoDateRepository.findByPostIdAndDoDate(postId, request.getDoDate()).orElseThrow(PostDoDateNotFoundException::new);
        if (postApplicantRepository.findByPostDoDateIdAndUserId(postDoDate.getId(), user.getId()).isPresent()) {
            throw new DuplicateApplyException();
        }
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        postDoDateFullCheck(post, postDoDate);

        PostApplicant postApplicant = PostApplicant.create(postDoDate, user);
        postApplicantRepository.save(postApplicant);
    }

    public void applyApprove(Long postId, Long postDoDateId, Long userId, User user) {
        //TODO post fetchjoin으로 businessProfile 같이 가져오기
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        if (!userBusinessProfileRepository.existsByUserIdAndBusinessProfileId(user.getId(), post.getBusinessProfile().getId())) {
            throw new PermissionException();
        }
        PostDoDate postDoDate = postDoDateRepository.findById(postDoDateId).orElseThrow(PostDoDateNotFoundException::new);
        postDoDateFullCheck(post, postDoDate);

        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);

        postApplicant.updateStatusApprove();
    }

    private void postDoDateFullCheck(Post post, PostDoDate postDoDate) {
        List<PostApplicant> postApplicants = postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(postDoDate.getId());
        if (!post.applyPossible(postApplicants)) {
            throw new PostIsFullException();
        }
    }
}
