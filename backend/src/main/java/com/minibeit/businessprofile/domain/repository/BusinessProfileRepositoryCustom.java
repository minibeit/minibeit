package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.BusinessProfile;

import java.util.List;

public interface BusinessProfileRepositoryCustom {
    List<BusinessProfile> findAllByUserId(Long userId);
}
