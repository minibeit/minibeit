package com.minibeit.postapplicant.service;

import com.minibeit.mail.service.MailService;
import com.minibeit.mail.service.dto.condition.MailCondition;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostLikeRepository;
import com.minibeit.post.service.exception.PostDoDateNotFoundException;
import com.minibeit.postapplicant.domain.ApplyStatus;
import com.minibeit.postapplicant.domain.PostApplicant;
import com.minibeit.postapplicant.domain.repository.PostApplicantRepository;
import com.minibeit.postapplicant.service.dto.PostApplicantResponse;
import com.minibeit.postapplicant.service.exception.PostApplicantNotFoundException;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostApplicantService {
    private final PostDoDateRepository postDoDateRepository;
    private final PostApplicantRepository postApplicantRepository;
    private final PostLikeRepository postLikeRepository;
    private final PostApplicantValidator postApplicantValidator;
    private final MailService mailService;

    public void apply(Long postDoDateId, User user) {
        PostDoDate postDoDate = postDoDateRepository.findByIdWithPostAndApplicant(postDoDateId).orElseThrow(PostDoDateNotFoundException::new);
        List<Long> postApplicantUserIdList = postDoDate.getPostApplicantList().stream().map(postApplicant -> postApplicant.getUser().getId()).collect(Collectors.toList());

        postApplicantValidator.applyValidate(postApplicantUserIdList, postDoDate, user);

        PostApplicant postApplicant = PostApplicant.create(postDoDate, user);

        postApplicantRepository.save(postApplicant);
        postLikeRepository.deleteByPostId(postDoDate.getPost().getId());
    }

    public void applyComplete(Long postDoDateId, LocalDateTime now, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(postDoDateId, user.getId()).orElseThrow(PostApplicantNotFoundException::new);
        PostDoDate postDoDate = postApplicant.getPostDoDate();
        Post post = postDoDate.getPost();

        postApplicantValidator.completeValidate(post, postDoDate, postApplicant, now);

        postApplicant.updateStatus(ApplyStatus.COMPLETE);
    }

    public void applyCancel(Long postDoDateId, User user) {
        PostApplicant postApplicant = postApplicantRepository.findByPostDoDateIdAndUserId(postDoDateId, user.getId()).orElseThrow(PostApplicantNotFoundException::new);

        postApplicantRepository.delete(postApplicant);

        if (postApplicant.getApplyStatus().equals(ApplyStatus.APPROVE)) {
            PostDoDate postDoDate = postDoDateRepository.findByIdWithPostAndBusinessProfile(postDoDateId).orElseThrow(PostDoDateNotFoundException::new);
            Post post = postDoDate.getPost();
            List<PostApplicant> approvedPostApplicant = postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(postDoDateId);
            postDoDate.updateFull(approvedPostApplicant);
            PostApplicantResponse.ApplicantCancelMail result = PostApplicantResponse.ApplicantCancelMail.build(user.getName(), user.getPhoneNum(), postDoDate.getDoDate(), post.getDoTime(), post.getTitle(), post.getBusinessProfile().getId());
            mailService.mailSend(MailCondition.APPLICANTCANCEL, Collections.singletonList(post.getBusinessProfile().getAdmin().getEmail()), result);
        }
    }
}
