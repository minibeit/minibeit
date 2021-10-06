package com.minibeit.post.web;

import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.PostStatus;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.post.service.PostByBusinessService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.YearMonth;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostByBusinessController {
    private final PostByBusinessService postByBusinessService;

    @PostMapping("/info")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PostResponse.OnlyId> createInfo(@RequestBody PostRequest.CreateInfo request, @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.OnlyId response = postByBusinessService.createInfo(request, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/post/" + response.getId())).body(response);
    }

    @PostMapping("/{postId}/files")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PostResponse.OnlyId> addFiles(@PathVariable Long postId, PostRequest.AddFile request, @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.OnlyId response = postByBusinessService.addFiles(postId, request, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/post/" + response.getId())).body(response);
    }

    @PostMapping("/{postId}/completed")
    public ResponseEntity<Void> recruitmentCompleted(@PathVariable Long postId, @RequestBody PostRequest.RejectComment request, @CurrentUser CustomUserDetails customUserDetails) {
        postByBusinessService.recruitmentCompleted(postId, request, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/business/profile/{businessProfileId}/list")
    public ResponseEntity<Page<PostResponse.GetListByBusinessProfile>> getListByBusinessProfile(@PathVariable Long businessProfileId,
                                                                                                @RequestParam(defaultValue = "RECRUIT", name = "status") PostStatus postStatus,
                                                                                                PageDto pageDto) {
        Page<PostResponse.GetListByBusinessProfile> response = postByBusinessService.getListByBusinessProfile(businessProfileId, postStatus, LocalDateTime.now(), pageDto);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{postId}/exist/doDate/list")
    public ResponseEntity<PostResponse.DoDateList> getDoDateList(@PathVariable Long postId,
                                                                 @RequestParam(name = "yearMonth") @DateTimeFormat(pattern = "yyyy-MM") YearMonth yearMonth) {
        PostResponse.DoDateList response = postByBusinessService.getDoDateListByYearMonth(postId, yearMonth);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<PostResponse.OnlyId> updateContent(@PathVariable Long postId, @RequestBody PostRequest.UpdateContent request,
                                                             @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.OnlyId response = postByBusinessService.updateContent(postId, request, customUserDetails.getUser());
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deleteOne(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        postByBusinessService.deleteOne(postId, LocalDateTime.now(), customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }
}
