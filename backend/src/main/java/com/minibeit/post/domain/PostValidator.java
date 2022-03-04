package com.minibeit.post.domain;

import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.common.exception.InvalidOperationException;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class PostValidator {
        private final UserBusinessProfileRepository userBusinessProfileRepository;
        private final PostApplicantRepository postApplicantRepository;

        public void userInBusinessProfileValidate(Long businessProfileId, User user) {
            if (!userBusinessProfileRepository.existsByUserIdAndBusinessProfileId(user.getId(), businessProfileId)) {
            throw new PermissionException("권한이 없습니다.");
        }
    }

    public void deleteValidate(Long businessProfileId, Long postId, LocalDateTime now, User user) {
        userInBusinessProfileValidate(businessProfileId, user);
        if (postApplicantRepository.existsApproveAfterNow(postId, now)) {
            throw new InvalidOperationException("끝나지 않은 실험에 확정자가 남아있습니다.");
        }
    }
}
