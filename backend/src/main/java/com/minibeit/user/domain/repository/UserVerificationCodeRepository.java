package com.minibeit.user.domain.repository;

import com.minibeit.user.domain.UserVerificationCode;
import com.minibeit.user.domain.VerificationKinds;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserVerificationCodeRepository extends JpaRepository<UserVerificationCode, Long> {
    @Query("select uv from UserVerificationCode uv join fetch uv.user where uv.user.id=:userId and uv.verificationKinds=:kinds")
    Optional<UserVerificationCode> findByUserIdAndVerificationKinds(@Param("userId") Long userId, @Param("kinds") VerificationKinds kinds);
}
