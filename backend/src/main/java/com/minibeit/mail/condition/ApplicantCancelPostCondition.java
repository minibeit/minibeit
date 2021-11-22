package com.minibeit.mail.condition;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class ApplicantCancelPostCondition implements MailPostCondition {
    @Override
    public MimeMessage makeMimeMessage(MimeMessage mimeMailMessage, TemplateEngine templateEngine, String toEmail) throws MessagingException {
        mimeMailMessage.addRecipients(MimeMessage.RecipientType.TO, toEmail);
        mimeMailMessage.setSubject("[미니바이트] 참여확정자의 신청 취소를 안내해드립니다.");
        mimeMailMessage.setText(setContext(templateEngine), "utf-8", "html");
        return mimeMailMessage;
    }

    private String setContext(TemplateEngine templateEngine) {
        Context context = new Context();

        return templateEngine.process("applicantCancel", context);
    }
}
