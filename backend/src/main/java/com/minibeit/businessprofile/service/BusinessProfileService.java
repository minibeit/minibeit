package com.minibeit.businessprofile.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BusinessProfileService {
    private final BusinessProfileRepository businessProfileRepository;

    public BusinessProfileResponse.IdAndName create(BusinessProfileRequest.Create request, User user) {
        UserBusinessProfile userBusinessProfile = UserBusinessProfile.create(user);
        BusinessProfile businessProfile = BusinessProfile.create(request, userBusinessProfile);
        BusinessProfile savedBusinessProfile = businessProfileRepository.save(businessProfile);

        return BusinessProfileResponse.IdAndName.build(savedBusinessProfile);
    }

    @Transactional(readOnly = true)
    public List<BusinessProfileResponse.IdAndName> getListIsMine(Long userId) {
        List<BusinessProfile> businessProfileList = businessProfileRepository.findAllByUserId(userId);

        return businessProfileList.stream().map(BusinessProfileResponse.IdAndName::build).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BusinessProfileResponse.GetOne getOne(Long businessProfileId) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);

        return BusinessProfileResponse.GetOne.build(businessProfile);
    }
}
