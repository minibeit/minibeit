package com.minibeit.post.service;

import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.domain.repository.RejectPostRepository;
import com.minibeit.post.dto.PostApplicantDto;
import com.minibeit.post.dto.PostApplicantRequest;
import com.minibeit.post.dto.PostApplicantResponse;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
import com.minibeit.post.service.exception.PostDoDateNotFoundException;
import com.minibeit.post.service.exception.PostDoDateIsFullException;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostApplicantByBusinessService {
    private final PostRepository postRepository;
    private final PostDoDateRepository postDoDateRepository;
    private final PostApplicantRepository postApplicantRepository;
    private final RejectPostRepository rejectPostRepository;
    private final PostPermissionCheck postPermissionCheck;

    public void applyApprove(Long postId, Long postDoDateId, Long userId, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        postPermissionCheck.userInBusinessProfileCheck(post.getBusinessProfile().getId(), user);

        PostDoDate postDoDate = postDoDateRepository.findById(postDoDateId).orElseThrow(PostDoDateNotFoundException::new);
        List<PostApplicant> postApplicants = postDoDate.getPostApplicantList();
        if (!postDoDate.applyIsPossible(postDoDate.getPost())) {
            throw new PostDoDateIsFullException();
        }

        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);

        postApplicant.updateStatus(ApplyStatus.APPROVE);

        List<PostApplicant> approvedPostApplicant = postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(postDoDateId);
        postDoDate.updateFull(approvedPostApplicant);
    }

    public void applyApproveCancel(Long postId, Long postDoDateId, Long userId, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        postPermissionCheck.userInBusinessProfileCheck(post.getBusinessProfile().getId(), user);

        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);
        postApplicant.updateStatus(ApplyStatus.WAIT);
    }

    public void applyReject(Long postId, Long postDoDateId, Long userId, PostApplicantRequest.ApplyReject request, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        postPermissionCheck.userInBusinessProfileCheck(post.getBusinessProfile().getId(), user);

        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);

        postApplicant.updateStatus(ApplyStatus.REJECT);

        RejectPost rejectPost = RejectPost.create(post.getTitle(), post.getPlace(), post.getContact(), post.getDoTime(), postApplicant.getPostDoDate().getDoDate(), request.getComment(), postApplicant.getUser());
        rejectPostRepository.save(rejectPost);
    }

    public void attendChange(Long postId, Long postDoDateId, Long userId, PostApplicantRequest.AttendChange request, User user) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        postPermissionCheck.userInBusinessProfileCheck(post.getBusinessProfile().getId(), user);

        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);

        postApplicant.changeBusinessFinish(request.getIsAttend());
    }

    @Transactional(readOnly = true)
    public List<PostApplicantResponse.ApplicantInfo> getApplicantListByDate(Long postId, ApplyStatus applyStatus, LocalDate doDate) {
        List<PostApplicantDto.UserInfo> userInfoList = postApplicantRepository.findAllByPostAndDoDate(postId, applyStatus, doDate);
        return PostApplicantResponse.ApplicantInfo.dtoToResponse(userInfoList);
    }
}
