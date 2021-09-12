package com.minibeit.user.domain.repository;

import com.minibeit.user.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepositoryCustom {
    List<User> findAllInBusinessProfile(Long businessProfileId);

    Optional<User> findByIdWithSchool(Long userId);
}
