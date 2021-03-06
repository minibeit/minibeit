package com.minibeit.post.scheduler;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.mail.domain.MailCondition;
import com.minibeit.mail.service.CustomMailSender;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.RejectPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostRejectScheduler {
    private final static String REJECT_MSG = "모집이 마감되었습니다.";
    private final PostApplicantRepository postApplicantRepository;
    private final RejectPostRepository rejectPostRepository;
    private final CustomMailSender customMailSender;

    @Scheduled(cron = "0 0 7 * * *", zone = "Asia/Seoul")
    public void rejectApplicantBeforeToday() {
        List<PostApplicant> postApplicantList = postApplicantRepository.findAllByDoDateBeforeToday(LocalDateTime.now());
        List<RejectPost> rejectPosts = new ArrayList<>();
        List<Long> postApplicantIds = new ArrayList<>();

        postApplicantList.forEach(postApplicant -> {
            PostDoDate postDoDate = postApplicant.getPostDoDate();
            Post post = postDoDate.getPost();
            BusinessProfile businessProfile = post.getBusinessProfile();
            RejectPost rejectPost = RejectPost.create(post, postDoDate, businessProfile, postApplicant.getUser(), REJECT_MSG);

            rejectPosts.add(rejectPost);
            postApplicantIds.add(postApplicant.getId());
            customMailSender.mailSend(MailCondition.REJECT, Collections.singletonList(postApplicant.getUser().getEmail()), rejectPost);
        });

        rejectPostRepository.saveAll(rejectPosts);
        postApplicantRepository.updateReject(postApplicantIds, ApplyStatus.REJECT);
    }
}
