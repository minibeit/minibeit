package com.minibeit.user.domain.repository;

import com.minibeit.user.domain.User;

import java.util.List;

public interface UserRepositoryCustom {
    List<User> findAllInBusinessProfile(Long businessProfileId);
}
