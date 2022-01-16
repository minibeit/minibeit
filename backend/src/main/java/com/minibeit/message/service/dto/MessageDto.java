package com.minibeit.message.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private String to;
    private String content;

    public static List<MessageDto> build(String to, String content) {
        MessageDto messageDto = MessageDto.builder().to(to).content(content).build();
        return Collections.singletonList(messageDto);
    }
}
