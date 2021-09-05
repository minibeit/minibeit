package com.minibeit.post.web;

import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.Post;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.post.service.PostService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostController {
    private final PostService postService;

    @PostMapping("/info")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PostResponse.OnlyId> createInfo(PostRequest.CreateInfo request, @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.OnlyId response = postService.createInfo(request, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/post/" + response.getId())).body(response);
    }

    @PostMapping("/{postId}/info/date")
    public ResponseEntity<PostResponse.OnlyId> createDateRule(@PathVariable Long postId, @RequestBody PostRequest.CreateDateRule request, @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.OnlyId response = postService.createDateRule(postId, request, customUserDetails.getUser());
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostResponse.GetOne> getOne(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.GetOne response = postService.getOne(postId, customUserDetails.getUser());
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deleteOne(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        postService.deleteOne(postId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/apply")
    public ResponseEntity<Void> applyPost(@PathVariable Long postId, @RequestBody PostRequest.Apply request, @CurrentUser CustomUserDetails customUserDetails) {
        postService.apply(postId, request, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/apply/check/{userId}")
    public ResponseEntity<Void> applyCheck(@PathVariable("postId") Long postId, @PathVariable("userId") Long userId, @RequestBody PostRequest.ApplyCheck request) {
        postService.applyCheck(postId, userId, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/list/{schoolId}")
    public ResponseEntity<Page<PostResponse.GetList>> getList(@PathVariable Long schoolId,
                                                              @RequestParam(name = "doDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate doDate,
                                                              PageDto pageDto) {
        Page<Post> posts = postService.getList(schoolId, doDate, pageDto);
        List<PostResponse.GetList> response = posts.stream().map(post -> PostResponse.GetList.build(post, doDate)).collect(Collectors.toList());
        return ResponseEntity.ok().body(new PageImpl<>(response, pageDto.of(), posts.getTotalElements()));
    }
}
