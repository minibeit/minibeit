package com.minibeit.post.service;

import com.minibeit.mail.condition.MailCondition;
import com.minibeit.mail.service.MailService;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.RejectPostRepository;
import com.minibeit.post.dto.PostApplicantDto;
import com.minibeit.post.dto.PostApplicantRequest;
import com.minibeit.post.dto.PostApplicantResponse;
import com.minibeit.post.service.exception.ExistedApplySameTimeException;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
import com.minibeit.post.service.exception.PostDoDateIsFullException;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostApplicantByBusinessService {
    private final PostApplicantRepository postApplicantRepository;
    private final RejectPostRepository rejectPostRepository;
    private final PostPermissionCheck postPermissionCheck;
    private final MailService mailService;

    public void applyApprove(Long postDoDateId, Long userId, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);
        User applicant = postApplicant.getUser();
        PostDoDate postDoDate = postApplicant.getPostDoDate();
        Post post = postDoDate.getPost();
        postPermissionCheck.userInBusinessProfileCheck(post.getBusinessProfile().getId(), user);

        List<PostDoDate> approvedDateByUser = postApplicantRepository.findAllByUserIdAndDoDateAndStatusIsApprove(userId, postDoDate.getDoDate())
                .stream().map(PostApplicant::getPostDoDate).collect(Collectors.toList());
        if (postApplicant.duplicatedApply(approvedDateByUser, postDoDate.getDoDate(), post.getDoTime())) {
            throw new ExistedApplySameTimeException();
        }

        if (!postDoDate.applyIsPossible(postDoDate.getPost())) {
            throw new PostDoDateIsFullException();
        }

        postApplicant.updateStatus(ApplyStatus.APPROVE);

        List<PostApplicant> approvedPostApplicant = postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(postDoDateId);
        postDoDate.updateFull(approvedPostApplicant);
//        PostResponse.GetMyApplyList getMyApplyList = new PostResponse.GetMyApplyList(post.getId(), post.getTitle(), post.getDoTime(), post.getContact(), post.isRecruitCondition(), postDoDateId, postDoDate.getDoDate(), postApplicant.getApplyStatus().name(), postApplicant.isBusinessFinish(), post.getBusinessProfile().getId());
//
//        mailService.mailSend(MailCondition.APPROVE, Collections.singletonList(applicant.getEmail()), getMyApplyList);
    }

    public void applyApproveCancel(Long postDoDateId, Long userId, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);
        User applicant = postApplicant.getUser();
        PostDoDate postDoDate = postApplicant.getPostDoDate();
        Post post = postDoDate.getPost();
        postPermissionCheck.userInBusinessProfileCheck(post.getBusinessProfile().getId(), user);

        postApplicant.updateStatus(ApplyStatus.WAIT);

        List<PostApplicant> approvedPostApplicant = postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(postDoDateId);
        postDoDate.updateFull(approvedPostApplicant);

//        PostResponse.GetMyApplyList getMyApplyList = new PostResponse.GetMyApplyList(post.getId(), post.getTitle(), post.getDoTime(), post.getContact(), post.isRecruitCondition(), postDoDateId, postDoDate.getDoDate(), postApplicant.getApplyStatus().name(), postApplicant.isBusinessFinish(), post.getBusinessProfile().getId());
//
//        mailService.mailSend(MailCondition.APPROVECANCEL, Collections.singletonList(applicant.getEmail()), getMyApplyList);
    }

    public void applyReject(Long postDoDateId, Long userId, PostApplicantRequest.ApplyReject request, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);
        User applicant = postApplicant.getUser();
        Post post = postApplicant.getPostDoDate().getPost();
        postPermissionCheck.userInBusinessProfileCheck(post.getBusinessProfile().getId(), user);

        postApplicant.updateStatus(ApplyStatus.REJECT);

        RejectPost rejectPost = RejectPost.create(post.getTitle(), post.getPlace(), post.getPlaceDetail(), post.getContact(), post.isRecruitCondition(), post.getDoTime(), postApplicant.getPostDoDate().getDoDate(), request.getComment(), postApplicant.getUser(), post.getBusinessProfile().getName());
        rejectPostRepository.save(rejectPost);

        mailService.mailSend(MailCondition.REJECT, Collections.singletonList(applicant.getEmail()), rejectPost);
    }

    public void attendChange(Long postDoDateId, Long userId, PostApplicantRequest.AttendChange request, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);
        Post post = postApplicant.getPostDoDate().getPost();
        postPermissionCheck.userInBusinessProfileCheck(post.getBusinessProfile().getId(), user);

        postApplicant.changeBusinessFinish(request.getIsAttend());
    }

    @Transactional(readOnly = true)
    public List<PostApplicantResponse.ApplicantInfo> getApplicantListByDate(Long postId, ApplyStatus applyStatus, LocalDate doDate) {
        List<PostApplicantDto.UserInfo> userInfoList = postApplicantRepository.findAllByPostAndDoDate(postId, applyStatus, doDate);
        return PostApplicantResponse.ApplicantInfo.dtoToResponse(userInfoList);
    }
}
