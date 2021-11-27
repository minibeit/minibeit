package com.minibeit.mail.condition;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class RejectPostCondition implements MailPostCondition {
    @Override
    public <T> MimeMessage makeMimeMessage(MimeMessage mimeMailMessage, TemplateEngine templateEngine, String toEmail, T data) throws MessagingException {
        mimeMailMessage.addRecipients(MimeMessage.RecipientType.TO, toEmail);
        mimeMailMessage.setSubject("[미니바이트] 신청하신 참여 일정의 반려를 안내해드립니다.");
        mimeMailMessage.setText(setContext(templateEngine, data), "utf-8", "html");
        return mimeMailMessage;
    }

    private String setContext(TemplateEngine templateEngine, Object data) {
        Context context = new Context();
        context.setVariable("result", data);
        return templateEngine.process("applicantReject", context);
    }
}
