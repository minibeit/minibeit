package com.minibeit.businessprofile.service.integrate;

import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class UserBusinessProfileFinder implements UserBusinessProfiles{
    private final UserBusinessProfileRepository userBusinessProfileRepository;

    @Override
    public Boolean existsByUserIdAndBusinessProfileId(Long businessProfileId, Long userId) {
        return userBusinessProfileRepository.existsByUserIdAndBusinessProfileId(userId, businessProfileId);
    }
}
