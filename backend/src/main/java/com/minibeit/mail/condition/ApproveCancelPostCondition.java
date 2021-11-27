package com.minibeit.mail.condition;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class ApproveCancelPostCondition implements MailPostCondition {
    @Override
    public <T> MimeMessage makeMimeMessage(MimeMessage mimeMailMessage, TemplateEngine templateEngine, String toEmail, T data) throws MessagingException {
        mimeMailMessage.addRecipients(MimeMessage.RecipientType.TO, toEmail);
        mimeMailMessage.setSubject("[미니바이트] 고객님의 확정되었던 참여 일정이 취소되어 안내해드립니다.");
        mimeMailMessage.setText(setContext(templateEngine, data), "utf-8", "html");
        return mimeMailMessage;
    }

    private <T> String setContext(TemplateEngine templateEngine, T data) {
        Context context = new Context();
        context.setVariable("result", data);
        return templateEngine.process("approveCancel", context);
    }
}
