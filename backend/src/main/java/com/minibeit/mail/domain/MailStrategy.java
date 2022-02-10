package com.minibeit.mail.domain;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public interface MailStrategy {
    String setTemplateEngine(MimeMessage mimeMailMessage, TemplateEngine templateEngine, Context context) throws MessagingException;
}
