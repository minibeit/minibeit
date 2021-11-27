package com.minibeit.mail.condition;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class ApplicantCancelPostCondition implements MailPostCondition {
    @Override
    public <T> MimeMessage makeMimeMessage(MimeMessage mimeMailMessage, TemplateEngine templateEngine, String toEmail, T data) throws MessagingException {
        mimeMailMessage.addRecipients(MimeMessage.RecipientType.TO, toEmail);
        mimeMailMessage.setSubject("[미니바이트] 고객님의 모집 일정 내 참여확정자가 신청을 취소하여 안내해드립니다.");
        mimeMailMessage.setText(setContext(templateEngine, data), "utf-8", "html");
        return mimeMailMessage;
    }

    private <T> String setContext(TemplateEngine templateEngine, T data) {
        Context context = new Context();
        context.setVariable("result", data);
        return templateEngine.process("applicantCancel", context);
    }
}
