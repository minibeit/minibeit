package com.minibeit.businessprofile.service.integrate;

public interface UserBusinessProfiles {
    Boolean existsByUserIdAndBusinessProfileId(Long businessProfileId, Long userId);
}
