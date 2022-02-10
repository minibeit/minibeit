package com.minibeit.mail.domain;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class ApprovePostMail implements MailStrategy {
    @Override
    public String setTemplateEngine(MimeMessage mimeMailMessage, TemplateEngine templateEngine, Context context) throws MessagingException {
        mimeMailMessage.setSubject("[미니바이트] 고객님의 신청하신 참여 일정이 확정되어 안내해드립니다.");
        return templateEngine.process("applicantApprove", context);
    }
}
