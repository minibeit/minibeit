package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.BusinessProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessProfileRepository extends JpaRepository<BusinessProfile, Long>, BusinessProfileRepositoryCustom {
    List<BusinessProfile> findAllByAdminId(Long adminId);
}
