package com.minibeit.mail.condition;

import org.springframework.mail.SimpleMailMessage;

public interface MailCondition {
    SimpleMailMessage makeSimpleMessage(String toEmail, String fromEmail);
}
