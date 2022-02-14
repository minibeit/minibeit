package com.minibeit.mail.service;

import com.minibeit.mail.domain.MailCondition;
import com.minibeit.mail.domain.MailContext;
import com.minibeit.mail.domain.MailFactory;
import com.minibeit.mail.domain.MailStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CustomMailSender {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Async
    public <T> void mailSend(MailCondition postMailCondition, List<String> toMailAddressList, T data) {
        toMailAddressList.stream().map(mail -> MailFactory.create(postMailCondition, mail))
                .forEach(mailFactory -> {
                    MimeMessage mimeMessage = mailSender.createMimeMessage();
                    MailStrategy mailStrategy = mailFactory.getMail();
                    MailContext mailContext = new MailContext(mailStrategy);
                    MimeMessage message = null;
                    try {
                        message = mailContext.makeMimeMessage(mimeMessage, templateEngine, mailFactory.getAddress(), data);
                    } catch (MessagingException e) {
                        e.printStackTrace();
                    }
                    mailSender.send(message);
                });
    }
}
