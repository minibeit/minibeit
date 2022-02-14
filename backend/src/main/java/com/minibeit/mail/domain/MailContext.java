package com.minibeit.mail.domain;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class MailContext {
    private final MailStrategy mailStrategy;

    public MailContext(MailStrategy mailStrategy) {
        this.mailStrategy = mailStrategy;
    }

    public <T> MimeMessage makeMimeMessage(MimeMessage mimeMailMessage, TemplateEngine templateEngine, String toEmail, T data) throws MessagingException {
        Context context = new Context();
        context.setVariable("result", data);

        mimeMailMessage.addRecipients(MimeMessage.RecipientType.TO, toEmail);
        String process = mailStrategy.setTemplateEngine(mimeMailMessage, templateEngine, context);
        mimeMailMessage.setText(process, "utf-8", "html");

        return mimeMailMessage;
    }
}
