package com.minibeit.post.web;

import com.minibeit.post.service.PostApplicantService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostApplicantController {
    private final PostApplicantService postApplicantService;

    @PostMapping("/{postId}/date/{postDoDateId}/apply")
    public ResponseEntity<Void> applyPost(@PathVariable Long postId, @PathVariable Long postDoDateId, @CurrentUser CustomUserDetails customUserDetails) {
        postApplicantService.apply(postId, postDoDateId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/date/{postDoDateId}/finish")
    public ResponseEntity<Void> applyMyFinish(@PathVariable Long postDoDateId, @CurrentUser CustomUserDetails customUserDetails) {
        postApplicantService.applyMyFinish(postDoDateId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/date/{postDoDateId}/apply/cancel")
    public ResponseEntity<Void> applyCancel(@PathVariable Long postDoDateId, @CurrentUser CustomUserDetails customUserDetails) {
        postApplicantService.applyCancel(postDoDateId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/date/{postDoDateId}/apply/approve/{userId}")
    public ResponseEntity<Void> applyApprove(@PathVariable Long postId, @PathVariable Long postDoDateId, @PathVariable Long userId, @CurrentUser CustomUserDetails customUserDetails) {
        postApplicantService.applyApprove(postId, postDoDateId, userId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/date/{postDoDateId}/apply/reject/{userId}")
    public ResponseEntity<Void> applyReject(@PathVariable Long postId, @PathVariable Long postDoDateId, @PathVariable Long userId, @CurrentUser CustomUserDetails customUserDetails) {
        postApplicantService.applyReject(postId, postDoDateId, userId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }
}
