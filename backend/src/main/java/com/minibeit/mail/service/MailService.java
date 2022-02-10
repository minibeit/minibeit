package com.minibeit.mail.service;

import com.minibeit.mail.domain.MailCondition;
import com.minibeit.mail.service.dto.MailRequest;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.UserVerificationCode;
import com.minibeit.user.domain.VerificationKinds;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.domain.repository.UserVerificationCodeRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MailService {
    private final UserRepository userRepository;
    private final UserVerificationCodeRepository userVerificationCodeRepository;
    private final CustomMailSender customMailSender;

    @Transactional
    public void sendVerificationCode(Long userId, MailRequest.EmailVerification request) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        UserVerificationCode userVerificationCode = UserVerificationCode.create(user, VerificationKinds.EMAIL);
        Optional<UserVerificationCode> optionalUserEmailCode = userVerificationCodeRepository.findByUserIdAndVerificationKinds(userId, VerificationKinds.EMAIL);
        if (optionalUserEmailCode.isPresent()) {
            optionalUserEmailCode.get().update(userVerificationCode);
        } else {
            userVerificationCodeRepository.save(userVerificationCode);
        }
        customMailSender.mailSend(MailCondition.VERIFICATION, Collections.singletonList(request.getToEmail()), userVerificationCode);
    }
}
