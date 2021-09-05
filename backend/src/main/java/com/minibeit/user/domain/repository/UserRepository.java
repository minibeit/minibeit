package com.minibeit.user.domain.repository;

import com.minibeit.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> , UserRepositoryCustom{
    Optional<User> findByNickname(String nickname);

    Optional<User> findByOauthId(String oauthId);
}
