package com.minibeit.businessprofile.service.integrate;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class BusinessProfileFinder implements BusinessProfiles {
    private final BusinessProfileRepository businessProfileRepository;

    @Override
    public BusinessProfile getOne(Long businessProfileId) {
        return businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
    }
}
