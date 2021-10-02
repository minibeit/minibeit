package com.minibeit.post.service;

import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.service.exception.*;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostApplicantService {
    private final PostRepository postRepository;
    private final PostDoDateRepository postDoDateRepository;
    private final PostApplicantRepository postApplicantRepository;

    public void apply(Long postId, Long postDoDateId, User user) {
        PostDoDate postDoDate = postDoDateRepository.findById(postDoDateId).orElseThrow(PostDoDateNotFoundException::new);
        if (postApplicantRepository.findByPostDoDateIdAndUserId(postDoDate.getId(), user.getId()).isPresent()) {
            throw new DuplicateApplyException();
        }
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        List<PostApplicant> postApplicants = postDoDate.getPostApplicantList();
        if (!post.applyPossible(postApplicants)) {
            throw new PostIsFullException();
        }

        PostApplicant postApplicant = PostApplicant.create(postDoDate, user);
        postApplicantRepository.save(postApplicant);
    }

    public void applyMyFinish(Long postDoDateId, User user) {
        PostDoDate postDoDate = postDoDateRepository.findByIdWithPost(postDoDateId).orElseThrow(PostDoDateNotFoundException::new);
        Post post = postDoDate.getPost();
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, user.getId()).orElseThrow(PostApplicantNotFoundException::new);
        if (!postDoDate.getDoDate().plusMinutes(post.getDoTime()).isBefore(LocalDateTime.now()) || !postApplicant.getApplyStatus().equals(ApplyStatus.APPROVE)) {
            throw new PermissionException();
        }
        postApplicant.updateMyFinish();
    }

    public void applyCancel(Long postDoDateId, User user) {
        postApplicantRepository.deleteByPostDoDateIdAndUserId(postDoDateId, user.getId());

        PostDoDate postDoDate = postDoDateRepository.findById(postDoDateId).orElseThrow(PostDoDateNotFoundException::new);

        List<PostApplicant> approvedPostApplicant = postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(postDoDateId);
        postDoDate.updateFull(approvedPostApplicant);
    }
}
