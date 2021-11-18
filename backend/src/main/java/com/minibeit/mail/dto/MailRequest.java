package com.minibeit.mail.dto;

import com.minibeit.mail.condition.PostMailCondition;
import lombok.*;

import java.util.List;

public class MailRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class PostStatusMail {
        private PostMailCondition postMailCondition;
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
