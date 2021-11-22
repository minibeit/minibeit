package com.minibeit.mail.condition;

import org.thymeleaf.TemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public interface MailPostCondition {
    MimeMessage makeMimeMessage(MimeMessage mimeMessage, TemplateEngine templateEngine, String toEmail) throws MessagingException;
}
