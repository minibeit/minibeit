package com.minibeit.mail.service;

import com.minibeit.mail.domain.MailCondition;
import com.minibeit.mail.service.dto.MailRequest;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.UserVerificationCode;
import com.minibeit.user.domain.VerificationKinds;
import com.minibeit.user.service.integrate.UserVerificationCodes;
import com.minibeit.user.service.integrate.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@Transactional
public class MailService {
    private final Users users;
    private final UserVerificationCodes userVerificationCodes;
    private final CustomMailSender customMailSender;

    public void sendVerificationCode(Long userId, MailRequest.EmailVerification request) {
        User user = users.getOne(userId);
        UserVerificationCode userVerificationCode = userVerificationCodes.create(user, VerificationKinds.EMAIL);

        customMailSender.mailSend(MailCondition.VERIFICATION, Collections.singletonList(request.getToEmail()), userVerificationCode);
    }
}
