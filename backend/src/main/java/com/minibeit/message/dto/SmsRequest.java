package com.minibeit.message.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SmsRequest {
    @NotBlank(message = "수신자 번호는 공백일 수 없습니다.")
    private String receiverPhoneNumber;
}
