package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.UserBusinessProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserBusinessProfileRepository extends JpaRepository<UserBusinessProfile, Long> {

    Optional<UserBusinessProfile> findByBusinessProfileIdAndUserId(Long businessProfileId, Long UserId);
}
