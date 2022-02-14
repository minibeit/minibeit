package com.minibeit.mail.domain;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class ApproveCancelMail implements MailStrategy {
    @Override
    public String setTemplateEngine(MimeMessage mimeMailMessage, TemplateEngine templateEngine, Context context) throws MessagingException {
        mimeMailMessage.setSubject("[미니바이트] 고객님의 확정되었던 참여 일정이 취소되어 안내해드립니다.");
        return templateEngine.process("approveCancel", context);
    }
}
