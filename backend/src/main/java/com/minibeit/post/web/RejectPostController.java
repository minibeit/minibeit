package com.minibeit.post.web;

import com.minibeit.common.dto.PageDto;
import com.minibeit.post.dto.RejectPostResponse;
import com.minibeit.post.service.RejectPostService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rejectPost")
public class RejectPostController {
    private final RejectPostService rejectPostService;

    @GetMapping("/list")
    public ResponseEntity<Page<RejectPostResponse.GetList>> getList(PageDto pageDto, @CurrentUser CustomUserDetails customUserDetails) {
        Page<RejectPostResponse.GetList> response = rejectPostService.getList(pageDto, customUserDetails.getUser());

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{rejectPostId}")
    public ResponseEntity<Void> deleteOne(@PathVariable Long rejectPostId, @CurrentUser CustomUserDetails customUserDetails) {
        rejectPostService.deleteOne(rejectPostId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }
}
