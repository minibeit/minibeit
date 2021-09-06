package com.minibeit.post.web;

import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.service.PostApplicantService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostApplicantController {
    private final PostApplicantService postApplicantService;

    @PostMapping("/{postId}/apply")
    public ResponseEntity<Void> applyPost(@PathVariable Long postId, @RequestBody PostRequest.Apply request, @CurrentUser CustomUserDetails customUserDetails) {
        postApplicantService.apply(postId, request, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/apply/check/{userId}")
    public ResponseEntity<Void> applyCheck(@PathVariable("postId") Long postId, @PathVariable("userId") Long userId, @RequestBody PostRequest.ApplyCheck request) {
        postApplicantService.applyCheck(postId, userId, request);
        return ResponseEntity.ok().build();
    }
}
