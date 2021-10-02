package com.minibeit.post.service;

import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class PostPermissionCheck {
    private final UserBusinessProfileRepository userBusinessProfileRepository;

    public void userInBusinessProfileCheck(Long businessProfileId, User user) {
        if (!userBusinessProfileRepository.existsByUserIdAndBusinessProfileId(user.getId(), businessProfileId)) {
            throw new PermissionException();
        }
    }
}
