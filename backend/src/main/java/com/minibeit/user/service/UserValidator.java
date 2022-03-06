package com.minibeit.user.service;

import com.minibeit.common.exception.DuplicateException;
import com.minibeit.common.exception.InvalidOperationException;
import com.minibeit.common.exception.InvalidValueException;
import com.minibeit.user.domain.UserVerificationCode;
import com.minibeit.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class UserValidator {
    private final UserRepository userRepository;

    public void nicknameValidate(String nickname) {
        if (userRepository.existsByNickname(nickname)) {
            throw new DuplicateException("증복된 닉네임입니다.");
        }
    }

    public void updateValidate(String nickname, Boolean nicknameChanged) {
        if (nicknameChanged) {
            if (userRepository.existsByNickname(nickname)) {
                throw new DuplicateException("증복된 닉네임입니다.");
            }
        }
    }

    public void verificationCodeValidate(UserVerificationCode myCode, String verificationCode, LocalDateTime now) {
        if (!verificationCode.equals(myCode.getCode()) || myCode.getExpirationDate().isBefore(now)) {
            throw new InvalidValueException("잘못된 코드입니다.");
        }
    }

    public void deleteValidate(Long userId) {
        if (userRepository.existsBusinessAdminUserById(userId)) {
            throw new InvalidOperationException("관리자로 있는 비즈니스 프로필이 존재합니다.");
        }
    }
}
