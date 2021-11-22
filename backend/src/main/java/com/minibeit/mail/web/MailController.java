package com.minibeit.mail.web;

import com.minibeit.common.dto.ApiResult;
import com.minibeit.mail.dto.MailRequest;
import com.minibeit.mail.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mail")
public class MailController {
    private final MailService mailService;

    @PostMapping("/post")
    public ResponseEntity<ApiResult<Void>> sendMail(@RequestBody MailRequest.PostStatusMail request) {
        mailService.mailSend(request.getPostMailCondition(), request.getToEmailList());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @PostMapping("/user/{userId}/email/verification")
    public ResponseEntity<ApiResult<Void>> sendEmailVerificationCode(@PathVariable Long userId, @RequestBody MailRequest.EmailVerification request) throws MessagingException {
        mailService.sendVerificationCode(userId, request);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
