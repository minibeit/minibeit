package com.minibeit.message.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.minibeit.common.dto.ApiResult;
import com.minibeit.message.dto.SmsRequest;
import com.minibeit.message.dto.SmsResponse;
import com.minibeit.message.service.SmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class SmsController {
    private final SmsService smsService;

    @PostMapping("/user/{userId}/sms")
    public ResponseEntity<ApiResult<SmsResponse>> sendSmsVerificationCode(@PathVariable Long userId, @RequestBody SmsRequest smsRequest) throws NoSuchAlgorithmException, URISyntaxException, UnsupportedEncodingException, InvalidKeyException, JsonProcessingException {
        SmsResponse response = smsService.sendSmsVerificationCode(smsRequest.getReceiverPhoneNumber(), userId);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }
}
