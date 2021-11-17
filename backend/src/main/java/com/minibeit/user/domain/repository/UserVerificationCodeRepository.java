package com.minibeit.user.domain.repository;

import com.minibeit.user.domain.UserVerificationCode;
import com.minibeit.user.domain.VerificationKinds;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserVerificationCodeRepository extends JpaRepository<UserVerificationCode, Long> {
    Optional<UserVerificationCode> findByUserIdAndVerificationKinds(Long userId, VerificationKinds kinds);
}
