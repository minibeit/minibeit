package com.minibeit.post.domain;

import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.common.exception.DuplicateException;
import com.minibeit.common.exception.InvalidOperationException;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PostApplicantValidator {
    private final UserBusinessProfileRepository userBusinessProfileRepository;

    public void applyValidate(List<Long> postApplicantUserIdList, PostDoDate postDoDate, User user) {
        if (postApplicantUserIdList.contains(user.getId())) {
            throw new DuplicateException("중복 지원 할 수 없습니다.");
        }

        if (!postDoDate.applyIsPossible(postDoDate.getPost())) {
            throw new InvalidOperationException("모집인원을 초과했습니다.");
        }
    }

    public void completeValidate(Post post, PostDoDate postDoDate, PostApplicant postApplicant, LocalDateTime now) {
        if (!postDoDate.getDoDate().plusMinutes(post.getDoTime()).isBefore(now) || !postApplicant.getApplyStatus().equals(ApplyStatus.APPROVE)) {
            throw new PermissionException("완료할 수 있는 조건에 맞지 않습니다.");
        }
    }

    public void applyApproveValidate(Post post, PostDoDate postDoDate, List<PostDoDate> approvedDateByUser, PostApplicant postApplicant, User loginUser) {
        userInBusinessProfileValidate(post.getBusinessProfile().getId(), loginUser);
        if (postApplicant.duplicatedApply(approvedDateByUser, postDoDate.getDoDate(), post.getDoTime())) {
            throw new InvalidOperationException("지원자의 확정된 모집중 시간이 겹치는 모집이 있습니다.");
        }

        if (!postDoDate.applyIsPossible(postDoDate.getPost())) {
            throw new InvalidOperationException("모집인원을 초과하였습니다.");
        }
    }

    public void userInBusinessProfileValidate(Long businessProfileId, User user) {
        if (!userBusinessProfileRepository.existsByUserIdAndBusinessProfileId(user.getId(), businessProfileId)) {
            throw new PermissionException("비즈니스 프로필에 소속된 유저가 아닙니다.");
        }
    }
}
