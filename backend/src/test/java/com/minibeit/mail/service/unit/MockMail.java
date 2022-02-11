package com.minibeit.mail.service.unit;

import com.minibeit.mail.domain.MailCondition;
import com.minibeit.mail.service.dto.MailRequest;

import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

public class MockMail {
    public static class MockMail1 {
        public static final String TO_MAIL = "test@test.com";
        public static final Properties prop = new Properties();
        public static final List<String> TO_MAIL_LIST = Collections.singletonList("test@test.com");
        public static final MailCondition MAIL_CONDITION=MailCondition.APPROVE;

        public static final Session session = Session.getDefaultInstance(prop, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("test@test.com", "1234");
            }
        });

        public static final MimeMessage MIME_MESSAGE = new MimeMessage(session);

        public static final MailRequest.EmailVerification EMAIL_VERIFICATION_REQUEST = MailRequest.EmailVerification.builder()
                .toEmail(TO_MAIL)
                .build();
    }
}