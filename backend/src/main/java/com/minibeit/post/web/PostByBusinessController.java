package com.minibeit.post.web;

import com.minibeit.common.dto.ApiResult;
import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.PostStatus;
import com.minibeit.post.service.dto.PostRequest;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.post.service.PostByBusinessService;
import com.minibeit.auth.domain.CurrentUser;
import com.minibeit.auth.domain.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostByBusinessController {
    private final PostByBusinessService postByBusinessService;

    @PostMapping("/post")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ApiResult<PostResponse.OnlyId>> createInfo(@Valid @RequestPart(value = "postInfo") PostRequest.CreateInfo request,
                                                                     @RequestPart(value = "files", required = false) List<MultipartFile> files,
                                                                     @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail,
                                                                     @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.OnlyId response = postByBusinessService.create(request, files, thumbnail, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/post/" + response.getId())).body(ApiResult.build(HttpStatus.CREATED.value(), response));
    }

    @PostMapping("/post/{postId}/completed")
    public ResponseEntity<ApiResult<Void>> recruitmentCompleted(@PathVariable Long postId, @Valid @RequestBody PostRequest.RejectComment request, @CurrentUser CustomUserDetails customUserDetails) {
        postByBusinessService.recruitmentCompleted(postId, request, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @GetMapping("/posts/business/profile/{businessProfileId}")
    public ResponseEntity<ApiResult<Page<PostResponse.GetListByBusinessProfile>>> getListByBusinessProfile(@PathVariable Long businessProfileId,
                                                                                                           @RequestParam(defaultValue = "RECRUIT", name = "status") PostStatus postStatus,
                                                                                                           PageDto pageDto) {
        Page<PostResponse.GetListByBusinessProfile> response = postByBusinessService.getListByBusinessProfile(businessProfileId, postStatus, LocalDateTime.now(), pageDto);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @PutMapping("/post/{postId}")
    public ResponseEntity<ApiResult<PostResponse.OnlyId>> updateContent(@PathVariable Long postId, @Valid @RequestBody PostRequest.UpdateContent request,
                                                                        @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.OnlyId response = postByBusinessService.updateContent(postId, request, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @DeleteMapping("/post/{postId}")
    public ResponseEntity<ApiResult<Void>> deleteOne(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        postByBusinessService.deleteOne(postId, LocalDateTime.now(), customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
