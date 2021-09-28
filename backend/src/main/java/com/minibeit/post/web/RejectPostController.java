package com.minibeit.post.web;

import com.minibeit.post.service.RejectPostService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rejectPost")
public class RejectPostController {
    private final RejectPostService rejectPostService;

    @DeleteMapping("/{rejectPostId}")
    public ResponseEntity<Void> deleteOne(@PathVariable Long rejectPostId, @CurrentUser CustomUserDetails customUserDetails) {
        rejectPostService.deleteOne(rejectPostId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }
}
