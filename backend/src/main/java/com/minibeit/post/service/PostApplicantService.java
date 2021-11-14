package com.minibeit.post.service;

import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostLikeRepository;
import com.minibeit.post.service.exception.*;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostApplicantService {
    private final PostDoDateRepository postDoDateRepository;
    private final PostApplicantRepository postApplicantRepository;
    private final PostLikeRepository postLikeRepository;

    public void apply(Long postDoDateId, User user) {
        PostDoDate postDoDate = postDoDateRepository.findByIdWithPostAndApplicant(postDoDateId).orElseThrow(PostDoDateNotFoundException::new);
        List<Long> postApplicantUserIdList = postDoDate.getPostApplicantList().stream().map(postApplicant -> postApplicant.getUser().getId()).collect(Collectors.toList());

        if (postApplicantUserIdList.contains(user.getId())) {
            throw new DuplicateApplyException();
        }
        if (!postDoDate.applyIsPossible(postDoDate.getPost())) {
            throw new PostDoDateIsFullException();
        }

        PostApplicant postApplicant = PostApplicant.create(postDoDate, user);
        postApplicantRepository.save(postApplicant);

        postLikeRepository.deleteByPostId(postDoDate.getPost().getId());
    }

    public void applyMyFinish(Long postDoDateId, LocalDateTime now, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(postDoDateId, user.getId()).orElseThrow(PostApplicantNotFoundException::new);
        PostDoDate postDoDate = postApplicant.getPostDoDate();
        Post post = postDoDate.getPost();
        if (!postDoDate.getDoDate().plusMinutes(post.getDoTime()).isBefore(now) || !postApplicant.getApplyStatus().equals(ApplyStatus.APPROVE)) {
            throw new PermissionException();
        }
        postApplicant.updateMyFinish();
    }

    public void applyCancel(Long postDoDateId, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, user.getId()).orElseThrow(PostApplicantNotFoundException::new);

        postApplicantRepository.deleteByPostDoDateIdAndUserId(postDoDateId, user.getId());

        if (postApplicant.getApplyStatus().equals(ApplyStatus.APPROVE)) {
            PostDoDate postDoDate = postDoDateRepository.findById(postDoDateId).orElseThrow(PostDoDateNotFoundException::new);

            List<PostApplicant> approvedPostApplicant = postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(postDoDateId);
            postDoDate.updateFull(approvedPostApplicant);
        }
    }
}
