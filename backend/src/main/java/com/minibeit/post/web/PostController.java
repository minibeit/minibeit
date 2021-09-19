package com.minibeit.post.web;

import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostStatus;
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

    @PostMapping("/{postId}/like")
    public ResponseEntity<Void> like(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        postService.createOrDeletePostLike(postId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostResponse.GetOne> getOne(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.GetOne response = postService.getOne(postId, customUserDetails);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{postId}/start")
    public ResponseEntity<List<PostResponse.GetPostStartTime>> getPostStartTimeList(@PathVariable Long postId,
                                                                                    @RequestParam(name = "doDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate doDate) {
        List<PostResponse.GetPostStartTime> response = postService.getPostStartTimeList(postId, doDate);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/list/{schoolId}")
    public ResponseEntity<Page<PostResponse.GetList>> getList(@PathVariable Long schoolId,
                                                              @RequestParam(defaultValue = "ALL") Payment paymentType,
                                                              @RequestParam(name = "doDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate doDate,
                                                              PageDto pageDto, @CurrentUser CustomUserDetails customUserDetails) {
        Page<Post> posts = postService.getList(schoolId, doDate, pageDto, paymentType);
        List<PostResponse.GetList> response = posts.stream().map(post -> PostResponse.GetList.build(post, customUserDetails)).collect(Collectors.toList());
        return ResponseEntity.ok().body(new PageImpl<>(response, pageDto.of(), posts.getTotalElements()));
    }

    @GetMapping("/like/list")
    public ResponseEntity<Page<PostResponse.GetLikeList>> getListByLike(PageDto pageDto, @CurrentUser CustomUserDetails customUserDetails) {
        Page<Post> posts = postService.getListByLike(customUserDetails.getUser(), pageDto);
        List<PostResponse.GetLikeList> response = posts.stream().map(PostResponse.GetLikeList::build).collect(Collectors.toList());
        return ResponseEntity.ok().body(new PageImpl<>(response, pageDto.of(), posts.getTotalElements()));
    }

    @GetMapping("/apply/approve/list")
    public ResponseEntity<Page<PostResponse.GetMyApplyList>> getListByApplyIsApproveOrWait(PageDto pageDto, @CurrentUser CustomUserDetails customUserDetails) {
        Page<PostResponse.GetMyApplyList> response = postService.getListByApplyIsApproveOrWait(customUserDetails.getUser(), pageDto);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/writable/review/list")
    public ResponseEntity<Page<PostResponse.GetMyApplyList>> getListByApplyMyFinishedWithoutReview(PageDto pageDto, @CurrentUser CustomUserDetails customUserDetails) {
        Page<PostResponse.GetMyApplyList> response = postService.getListByApplyAndMyFinishedWithoutReview(customUserDetails.getUser(), pageDto);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/business/profile/{businessProfileId}/list")
    public ResponseEntity<Page<PostResponse.GetListByBusinessProfile>> getListByBusinessProfile(@PathVariable Long businessProfileId,
                                                                                                @RequestParam(defaultValue = "RECRUIT", name = "status") PostStatus postStatus,
                                                                                                PageDto pageDto) {
        Page<PostResponse.GetListByBusinessProfile> response = postService.getListByBusinessProfile(businessProfileId, postStatus, pageDto);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deleteOne(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        postService.deleteOne(postId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/completed")
    public ResponseEntity<Void> recruitmentCompleted(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        postService.recruitmentCompleted(postId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }
}
