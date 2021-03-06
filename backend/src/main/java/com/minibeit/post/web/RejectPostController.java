package com.minibeit.post.web;

import com.minibeit.common.dto.ApiResult;
import com.minibeit.common.dto.PageDto;
import com.minibeit.post.service.dto.RejectPostResponse;
import com.minibeit.post.service.RejectPostService;
import com.minibeit.auth.domain.CurrentUser;
import com.minibeit.auth.domain.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RejectPostController {
    private final RejectPostService rejectPostService;

    @GetMapping("/rejected-posts")
    public ResponseEntity<ApiResult<Page<RejectPostResponse.GetList>>> getList(PageDto pageDto, @CurrentUser CustomUserDetails customUserDetails) {
        Page<RejectPostResponse.GetList> response = rejectPostService.getList(pageDto, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @DeleteMapping("/rejected-post/{rejectPostId}")
    public ResponseEntity<ApiResult<Void>> deleteOne(@PathVariable Long rejectPostId, @CurrentUser CustomUserDetails customUserDetails) {
        rejectPostService.deleteOne(rejectPostId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
