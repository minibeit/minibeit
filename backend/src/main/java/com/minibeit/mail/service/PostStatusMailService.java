package com.minibeit.mail.service;

import com.minibeit.mail.dto.PostStatusMail;
import com.minibeit.mail.condition.MailCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostStatusMailService {
    private final JavaMailSender mailSender;
    private static final String FROM_ADDRESS = "YOUR_EMAIL_ADDRESS";

    public void mailSend(PostStatusMail postStatusMail) {
        MailCondition mailCondition = postStatusMail.getMailCondition();
        SimpleMailMessage message = mailCondition.makeSimpleMessage(postStatusMail.getAddress(), FROM_ADDRESS);

        mailSender.send(message);
    }
}
