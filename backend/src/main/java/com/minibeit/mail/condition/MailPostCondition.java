package com.minibeit.mail.condition;

import org.springframework.mail.SimpleMailMessage;

public interface MailPostCondition {
    SimpleMailMessage makeSimpleMessage(String toEmail, String fromEmail);
}
