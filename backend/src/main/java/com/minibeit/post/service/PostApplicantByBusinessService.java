package com.minibeit.post.service;

import com.minibeit.mail.domain.MailCondition;
import com.minibeit.mail.service.CustomMailSender;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.RejectPostRepository;
import com.minibeit.post.service.dto.PostApplicantRequest;
import com.minibeit.post.service.dto.PostApplicantResponse;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
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
    private final PostApplicantValidator postApplicantValidator;
    private final CustomMailSender mailSender;

    public void applyApprove(Long postDoDateId, Long userId, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);
        User applicant = postApplicant.getUser();
        PostDoDate postDoDate = postApplicant.getPostDoDate();
        Post post = postDoDate.getPost();
        List<PostDoDate> approvedDateByUser = postApplicantRepository.findAllByUserIdAndDoDateAndStatusIsApprove(userId, postDoDate.getDoDate())
                .stream().map(PostApplicant::getPostDoDate).collect(Collectors.toList());

        postApplicantValidator.applyApproveValidate(post, postDoDate, approvedDateByUser, postApplicant, user);

        postApplicant.updateStatus(ApplyStatus.APPROVE);

        List<PostApplicant> approvedPostApplicant = postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(postDoDateId);
        postDoDate.updateFull(approvedPostApplicant);

        PostResponse.ApproveAndApproveCancelTemplate templateResponse = PostResponse.ApproveAndApproveCancelTemplate.build(post.getTitle(), postDoDate.getDoDate(), post.getDoTime(), post.getBusinessProfile().getAdmin().getPhoneNum());
        mailSender.mailSend(MailCondition.APPROVE, Collections.singletonList(applicant.getEmail()), templateResponse);
    }

    public void applyApproveCancel(Long postDoDateId, Long userId, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);
        User applicant = postApplicant.getUser();
        PostDoDate postDoDate = postApplicant.getPostDoDate();
        Post post = postDoDate.getPost();
        postApplicantValidator.userInBusinessProfileValidate(post.getBusinessProfile().getId(), user);

        postApplicant.updateStatus(ApplyStatus.WAIT);

        List<PostApplicant> approvedPostApplicant = postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(postDoDateId);
        postDoDate.updateFull(approvedPostApplicant);

        PostResponse.ApproveAndApproveCancelTemplate templateResponse = PostResponse.ApproveAndApproveCancelTemplate.build(post.getTitle(), postDoDate.getDoDate(), post.getDoTime(), post.getContact());
        mailSender.mailSend(MailCondition.APPROVECANCEL, Collections.singletonList(applicant.getEmail()), templateResponse);
    }

    public void applyReject(Long postDoDateId, Long userId, PostApplicantRequest.ApplyReject request, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);
        User applicant = postApplicant.getUser();
        Post post = postApplicant.getPostDoDate().getPost();
        postApplicantValidator.userInBusinessProfileValidate(post.getBusinessProfile().getId(), user);

        postApplicant.updateStatus(ApplyStatus.REJECT);

        RejectPost rejectPost = RejectPost.create(post, postApplicant.getPostDoDate(), post.getBusinessProfile(), postApplicant.getUser(), request.getComment());
        rejectPostRepository.save(rejectPost);

        mailSender.mailSend(MailCondition.REJECT, Collections.singletonList(applicant.getEmail()), rejectPost);
    }

    public void attendChange(Long postDoDateId, Long userId, PostApplicantRequest.AttendChange request, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(postDoDateId, userId).orElseThrow(PostApplicantNotFoundException::new);
        Post post = postApplicant.getPostDoDate().getPost();
        postApplicantValidator.userInBusinessProfileValidate(post.getBusinessProfile().getId(), user);

        postApplicant.changeBusinessFinish(request.getIsAttend());
    }

    @Transactional(readOnly = true)
    public List<PostApplicantResponse.ApplicantInfo> getApplicantListByDate(Long postId, ApplyStatus applyStatus, LocalDate doDate) {
        return postApplicantRepository.findAllByPostAndDoDate(postId, applyStatus, doDate);
    }
}
