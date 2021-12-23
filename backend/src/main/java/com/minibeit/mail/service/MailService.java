package com.minibeit.mail.service;

import com.minibeit.mail.condition.MailCondition;
import com.minibeit.mail.condition.MailPostCondition;
import com.minibeit.mail.dto.MailRequest;
import com.minibeit.mail.dto.PostStatusMail;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.UserVerificationCode;
import com.minibeit.user.domain.VerificationKinds;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.domain.repository.UserVerificationCodeRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final UserVerificationCodeRepository userVerificationCodeRepository;
    private final SpringTemplateEngine templateEngine;

    @Async
    public <T> void mailSend(MailCondition postMailCondition, List<String> toMailList, T data) {
        toMailList.stream().map(mail -> PostStatusMail.create(postMailCondition, mail))
                .forEach(postStatusMail -> {
                    MimeMessage mimeMessage = mailSender.createMimeMessage();
                    MailPostCondition mailCondition = postStatusMail.getMailCondition();
                    MimeMessage message = null;
                    try {
                        message = mailCondition.makeMimeMessage(mimeMessage, templateEngine, postStatusMail.getAddress(), data);
                    } catch (MessagingException e) {
                        e.printStackTrace();
                    }
                    mailSender.send(message);
                });
    }

    @Transactional
    public void sendVerificationCode(Long userId, MailRequest.EmailVerification request) throws MessagingException {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        UserVerificationCode userVerificationCode = UserVerificationCode.create(user, VerificationKinds.EMAIL);
        Optional<UserVerificationCode> optionalUserEmailCode = userVerificationCodeRepository.findByUserIdAndVerificationKinds(userId, VerificationKinds.EMAIL);
        if (optionalUserEmailCode.isPresent()) {
            optionalUserEmailCode.get().update(userVerificationCode);
        } else {
            userVerificationCodeRepository.save(userVerificationCode);
        }
        MimeMessage message = mailSender.createMimeMessage();

        PostStatusMail postStatusMail = PostStatusMail.create(MailCondition.VERIFICATION, request.getToEmail());
        postStatusMail.getMailCondition().makeMimeMessage(message, templateEngine, request.getToEmail(), userVerificationCode);

        mailSender.send(message);
    }
}
