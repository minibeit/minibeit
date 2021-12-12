package com.minibeit.mail.dto;

import com.minibeit.mail.condition.MailCondition;
import lombok.*;

import java.util.List;

public class MailRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class PostStatusMail {
        private MailCondition mailCondition;
        private List<String> toEmailList;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class EmailVerification {
        private String toEmail;
    }
}
