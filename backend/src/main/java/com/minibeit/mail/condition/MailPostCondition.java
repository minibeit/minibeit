package com.minibeit.mail.condition;

import org.thymeleaf.TemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public interface MailPostCondition {
    <T> MimeMessage makeMimeMessage(MimeMessage mimeMessage, TemplateEngine templateEngine, String toEmail, T data) throws MessagingException;
}
