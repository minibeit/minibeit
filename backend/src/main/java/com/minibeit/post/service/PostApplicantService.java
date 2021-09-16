package com.minibeit.post.service;

import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.PostStatus;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostApplicantRequest;
import com.minibeit.post.dto.PostApplicantResponse;
import com.minibeit.post.service.exception.*;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostApplicantService {
    private final PostRepository postRepository;
    private final PostDoDateRepository postDoDateRepository;
    private final PostApplicantRepository postApplicantRepository;
    private final UserBusinessProfileRepository userBusinessProfileRepository;

    public void apply(Long postId, Long postDoDateId, User user) {
        PostDoDate postDoDate = postDoDateRepository.findById(postDoDateId).orElseThrow(PostDoDateNotFoundException::new);
        if (postApplicantRepository.findByPostDoDateIdAndUserId(postDoDate.getId(), user.getId()).isPresent()) {
            throw new DuplicateApplyException();
        }
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        postDoDateFullCheck(post, postDoDate);

        PostApplicant postApplicant = PostApplicant.create(postDoDate, user);
        postApplicantRepository.save(postApplicant);
    }

    public void applyMyFinish(Long postDoDateId, User user) {
        PostDoDate postDoDate = postDoDateRepository.findByIdWithPost(postDoDateId).orElseThrow(PostDoDateNotFoundException::new);
        Post post = postDoDate.getPost();
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, user.getId()).orElseThrow(PostApplicantNotFoundException::new);
        if (!postDoDate.getDoDate().plusMinutes(post.getDoTime()).isBefore(LocalDateTime.now()) || !postApplicant.getPostStatus().equals(PostStatus.APPROVE)) {
            throw new PermissionException();
        }
        postApplicant.updateMyFinish();
    }

    public void applyApprove(Long postId, Long postDoDateId, Long userId, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        permissionCheck(user, post);
        PostDoDate postDoDate = postDoDateRepository.findById(postDoDateId).orElseThrow(PostDoDateNotFoundException::new);
        postDoDateFullCheck(post, postDoDate);

        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);

        postApplicant.updateStatusApprove();

        List<PostApplicant> approvedPostApplicant = postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(postDoDateId);
        postDoDate.updateFull(approvedPostApplicant);
    }

    public void applyReject(Long postId, Long postDoDateId, Long userId, PostApplicantRequest.ApplyReject request, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        permissionCheck(user, post);
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);

        postApplicant.updateStatusReject(request.getComment());
    }

    public void applyCancel(Long postDoDateId, User user) {
        postApplicantRepository.deleteByPostDoDateIdAndUserId(postDoDateId, user.getId());

        PostDoDate postDoDate = postDoDateRepository.findById(postDoDateId).orElseThrow(PostDoDateNotFoundException::new);

        List<PostApplicant> approvedPostApplicant = postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(postDoDateId);
        postDoDate.updateFull(approvedPostApplicant);
    }

    public List<PostApplicantResponse.UserInfo> getApplicantListByDate(Long postId, LocalDate doDate) {
        return postApplicantRepository.findAllByPostAndDoDate(postId, doDate);
    }

    private void permissionCheck(User user, Post post) {
        if (!userBusinessProfileRepository.existsByUserIdAndBusinessProfileId(user.getId(), post.getBusinessProfile().getId())) {
            throw new PermissionException();
        }
    }

    private void postDoDateFullCheck(Post post, PostDoDate postDoDate) {
        List<PostApplicant> postApplicants = postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(postDoDate.getId());
        if (!post.applyPossible(postApplicants)) {
            throw new PostIsFullException();
        }
    }
}
