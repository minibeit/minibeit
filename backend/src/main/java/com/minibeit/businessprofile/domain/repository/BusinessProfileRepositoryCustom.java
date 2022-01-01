package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.BusinessProfile;

import java.util.List;
import java.util.Optional;

public interface BusinessProfileRepositoryCustom {
    List<BusinessProfile> findAllByUserId(Long userId);

    Optional<BusinessProfile> findByIdWithAdmin(Long businessProfileId);

    Boolean existsPostByBusinessProfileId(Long businessProfileId);
}
