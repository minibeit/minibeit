package com.minibeit.post.web;

import com.minibeit.common.dto.ApiResult;
import com.minibeit.post.service.PostApplicantService;
import com.minibeit.auth.domain.CurrentUser;
import com.minibeit.auth.domain.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostApplicantController {
    private final PostApplicantService postApplicantService;

    @PostMapping("/date/{postDoDateId}/apply")
    public ResponseEntity<ApiResult<Void>> applyPost(@PathVariable Long postDoDateId, @CurrentUser CustomUserDetails customUserDetails) {
        postApplicantService.apply(postDoDateId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @PostMapping("/date/{postDoDateId}/finish")
    public ResponseEntity<ApiResult<Void>> applyMyFinish(@PathVariable Long postDoDateId, @CurrentUser CustomUserDetails customUserDetails) {
        postApplicantService.applyComplete(postDoDateId, LocalDateTime.now(), customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @PostMapping("/date/{postDoDateId}/apply/cancel")
    public ResponseEntity<ApiResult<Void>> applyCancel(@PathVariable Long postDoDateId, @CurrentUser CustomUserDetails customUserDetails) {
        postApplicantService.applyCancel(postDoDateId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
