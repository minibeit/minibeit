package com.minibeit.mail.service;

import com.minibeit.mail.condition.MailPostCondition;
import com.minibeit.mail.condition.PostMailCondition;
import com.minibeit.mail.dto.MailRequest;
import com.minibeit.mail.dto.PostStatusMail;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.UserEmailCode;
import com.minibeit.user.domain.repository.UserEmailCodeRepository;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final UserEmailCodeRepository userEmailCodeRepository;
    private static final String FROM_ADDRESS = "YOUR_EMAIL_ADDRESS";

    public void mailSend(PostMailCondition postMailCondition, List<String> toMailList) {
        toMailList.stream().map(mail -> PostStatusMail.create(postMailCondition, mail))
                .forEach(postStatusMail -> {
                    MailPostCondition mailCondition = postStatusMail.getMailCondition();
                    SimpleMailMessage message = mailCondition.makeSimpleMessage(postStatusMail.getAddress(), FROM_ADDRESS);
                    mailSender.send(message);
                });
    }

    @Transactional
    public void sendVerificationCode(Long userId, MailRequest.EmailVerification request) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        UserEmailCode userEmailCode = UserEmailCode.create(user);
        Optional<UserEmailCode> optionalUserEmailCode = userEmailCodeRepository.findByUserId(userId);
        if (optionalUserEmailCode.isPresent()) {
            optionalUserEmailCode.get().update(userEmailCode);
        } else {
            userEmailCodeRepository.save(userEmailCode);
        }

        SimpleMailMessage message = userEmailCode.makeMessage(request.getToEmail(), FROM_ADDRESS, userEmailCode.getCode());
        mailSender.send(message);
    }
}
