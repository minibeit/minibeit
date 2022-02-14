package com.minibeit.auth.service.unit;

import com.minibeit.auth.domain.token.Token;

import java.time.LocalDateTime;

public class MockAuth {
    public static class MockAuth1 {
        public static final String STR_TOKEN = "token";

        public static final Token TOKEN = Token.builder()
                .token(STR_TOKEN)
                .expiredAt(LocalDateTime.of(2022, 2, 14, 0, 0))
                .build();
    }
}
