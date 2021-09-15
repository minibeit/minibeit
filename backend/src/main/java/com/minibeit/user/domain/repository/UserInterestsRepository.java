package com.minibeit.user.domain.repository;

import com.minibeit.user.domain.UserInterests;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInterestsRepository extends JpaRepository<UserInterests, Long> {
}
