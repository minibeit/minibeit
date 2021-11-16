package com.minibeit.user.domain.repository;

import com.minibeit.user.domain.UserEmailCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserEmailCodeRepository extends JpaRepository<UserEmailCode, Long> {
    Optional<UserEmailCode> findByUserId(Long userId);
}
