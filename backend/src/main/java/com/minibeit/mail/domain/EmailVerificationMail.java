package com.minibeit.mail.domain;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class EmailVerificationMail implements MailStrategy {
    @Override
    public String setTemplateEngine(MimeMessage mimeMailMessage, TemplateEngine templateEngine, Context context) throws MessagingException {
        mimeMailMessage.setSubject("[미니바이트] 인증번호를 안내해드립니다.");
        return templateEngine.process("emailVerification", context);
    }
}
