package com.minibeit.post.scheduler;

import com.minibeit.mail.condition.PostMailCondition;
import com.minibeit.mail.dto.PostStatusMail;
import com.minibeit.mail.service.PostStatusMailService;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.RejectPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostRejectScheduler {
    private final static String REJECT_MSG = "모집이 마감되었습니다.";
    private final PostApplicantRepository postApplicantRepository;
    private final RejectPostRepository rejectPostRepository;
    private final PostStatusMailService postStatusMailService;

    @Scheduled(cron = "0 0 7 * * *", zone = "Asia/Seoul")
    public void rejectApplicantBeforeToday() {
        List<PostApplicant> postApplicantList = postApplicantRepository.findAllByDoDateBeforeToday(LocalDateTime.now());
        List<RejectPost> rejectPosts = new ArrayList<>();
        List<Long> postApplicantIds = new ArrayList<>();
        postApplicantList.forEach(postApplicant -> {
            PostDoDate postDoDate = postApplicant.getPostDoDate();
            Post post = postDoDate.getPost();
            RejectPost rejectPost = RejectPost.create(post.getTitle(), post.getPlace(), post.getContact(), post.getDoTime(), postDoDate.getDoDate(), REJECT_MSG, postApplicant.getUser());

            PostStatusMail postStatusMail = PostStatusMail.create(PostMailCondition.REJECT, postApplicant.getUser().getEmail());
            postStatusMailService.mailSend(postStatusMail);

            rejectPosts.add(rejectPost);
            postApplicantIds.add(postApplicant.getId());
        });
        rejectPostRepository.saveAll(rejectPosts);
        postApplicantRepository.updateReject(postApplicantIds, ApplyStatus.REJECT);
    }
}
