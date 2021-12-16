package com.minibeit.message.dto;

import lombok.*;

import java.util.List;


@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SmsMessageRequest {
    private String type;
    private String contentType;
    private String countryCode;
    private String from;
    private String content;
    private List<MessageDto> messages;

    public static SmsMessageRequest makeSmsRequest(String from, List<MessageDto> messages) {
        return SmsMessageRequest.builder()
                .type("SMS")
                .contentType("COMM")
                .countryCode("82")
                .from(String.join("", from.split("-")))
                .content("내용")
                .messages(messages)
                .build();
    }
}
