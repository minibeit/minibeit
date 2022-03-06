package com.minibeit.user.service.integrate;

import com.minibeit.user.domain.User;
import com.minibeit.user.domain.UserVerificationCode;
import com.minibeit.user.domain.VerificationKinds;
import com.minibeit.user.domain.repository.UserVerificationCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
class UserVerificationsManager implements UserVerificationCodes {
    private final UserVerificationCodeRepository userVerificationCodeRepository;

    @Override
    public UserVerificationCode create(User user, VerificationKinds verificationKinds) {
        UserVerificationCode userVerificationCode = UserVerificationCode.create(user, VerificationKinds.PHONE);
        Optional<UserVerificationCode> optionalUserVerificationCode = userVerificationCodeRepository.findByUserIdAndVerificationKinds(user.getId(), VerificationKinds.PHONE);

        if (optionalUserVerificationCode.isPresent()) {
            return optionalUserVerificationCode.get().update(userVerificationCode);
        }
        return userVerificationCodeRepository.save(userVerificationCode);
    }
}
