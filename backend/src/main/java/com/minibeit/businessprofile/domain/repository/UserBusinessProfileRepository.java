package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.UserBusinessProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBusinessProfileRepository extends JpaRepository<UserBusinessProfile, Long> {
}
