package com.minibeit.mail.domain;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class ApplicantCancelMail implements MailStrategy {
    @Override
    public String setTemplateEngine(MimeMessage mimeMailMessage, TemplateEngine templateEngine, Context context) throws MessagingException {
        mimeMailMessage.setSubject("[미니바이트] 고객님의 모집 일정 내 참여확정자가 신청을 취소하여 안내해드립니다.");
        return templateEngine.process("applicantCancel", context);
    }
}
