package com.minibeit.user.domain.repository;

import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepositoryCustom {
    Optional<User> findBySocialProviderAndOauthIdWithAvatar(SignupProvider signupProvider, String oauthId);

    List<User> findAllInBusinessProfile(Long businessProfileId);

    Optional<User> findByIdWithAvatar(Long userId);

    Optional<User> findByIdWithUserBusinessProfileAndBusiness(Long userId);

    Boolean existsBusinessAdminUserById(Long id);
}
