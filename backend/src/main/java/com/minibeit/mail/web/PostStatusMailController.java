package com.minibeit.mail.web;

import com.minibeit.common.dto.ApiResult;
import com.minibeit.mail.dto.PostStatusMailRequest;
import com.minibeit.mail.service.PostStatusMailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostStatusMailController {
    private final PostStatusMailService postStatusMailService;

    @PostMapping("/post/mail")
    public ResponseEntity<ApiResult<Void>> sendMail(@RequestBody PostStatusMailRequest postStatusMailRequest) {
        postStatusMailService.mailSend(postStatusMailRequest.getPostMailCondition(), postStatusMailRequest.getToEmailList());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
