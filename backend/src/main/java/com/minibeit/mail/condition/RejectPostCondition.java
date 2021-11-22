package com.minibeit.mail.condition;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class RejectPostCondition implements MailPostCondition {
    @Override
    public MimeMessage makeMimeMessage(MimeMessage mimeMailMessage, TemplateEngine templateEngine, String toEmail) throws MessagingException {
        mimeMailMessage.addRecipients(MimeMessage.RecipientType.TO, toEmail);
        mimeMailMessage.setSubject("[미니바이트] 신청하신 참여 일정의 반려를 안내해드립니다.");
        mimeMailMessage.setText(setContext(templateEngine), "utf-8", "html");
        return mimeMailMessage;
    }

    private String setContext(TemplateEngine templateEngine) {
        Context context = new Context();

        return templateEngine.process("applicantReject", context);
    }
}
