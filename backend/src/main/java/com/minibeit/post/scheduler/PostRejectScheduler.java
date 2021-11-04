package com.minibeit.post.scheduler;

import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.RejectPostRepository;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
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

    @Scheduled(cron = "0 0 5 * * *", zone = "Asia/Seoul")
    public void rejectApplicantBeforeToday() {
        List<PostApplicant> postApplicantList = postApplicantRepository.findAllByDoDateBeforeToday(LocalDateTime.now());
        List<RejectPost> rejectPosts = new ArrayList<>();
        List<Long> postApplicantIds = new ArrayList<>();
        postApplicantList.forEach(postApplicant -> {
            PostDoDate postDoDate = postApplicant.getPostDoDate();
            Post post = postDoDate.getPost();
            RejectPost rejectPost = RejectPost.create(post.getTitle(), post.getPlace(), post.getContact(), post.getDoTime(), postDoDate.getDoDate(), REJECT_MSG, postApplicant.getUser());
            rejectPosts.add(rejectPost);
            postApplicantIds.add(postApplicant.getId());
        });
        rejectPostRepository.saveAll(rejectPosts);
        postApplicantRepository.updateReject(postApplicantIds, ApplyStatus.REJECT);
    }
}
