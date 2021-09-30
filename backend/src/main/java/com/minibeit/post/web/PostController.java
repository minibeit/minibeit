package com.minibeit.post.web;

import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.PostStatus;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.post.service.PostService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostController {
    private final PostService postService;

    @PostMapping("/info")
    public ResponseEntity<PostResponse.OnlyId> createInfo(@RequestBody PostRequest.CreateInfo request, @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.OnlyId response = postService.createInfo(request, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/post/" + response.getId())).body(response);
    }

    @PostMapping("/{postId}/files")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PostResponse.OnlyId> addFiles(@PathVariable Long postId, PostRequest.AddFile request, @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.OnlyId response = postService.addFiles(postId, request, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/post/" + response.getId())).body(response);
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<Void> like(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        postService.createOrDeletePostLike(postId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/completed")
    public ResponseEntity<Void> recruitmentCompleted(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        postService.recruitmentCompleted(postId, customUserDetails.getUser());
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
                                                              @RequestParam(defaultValue = "ALL", name = "category") String category,
                                                              @RequestParam(name = "minPay", required = false) Integer minPay,
                                                              @RequestParam(name = "doTime", required = false) Integer doTime,
                                                              @RequestParam(name = "startTime", required = false) @DateTimeFormat(pattern = "HH:mm") LocalTime startTime,
                                                              @RequestParam(name = "endTime", required = false) @DateTimeFormat(pattern = "HH:mm") LocalTime endTime,
                                                              PageDto pageDto, @CurrentUser CustomUserDetails customUserDetails) {
        Page<PostResponse.GetList> response = postService.getList(schoolId, doDate, category, pageDto, paymentType, startTime, endTime, minPay, doTime, customUserDetails);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/like/list")
    public ResponseEntity<Page<PostResponse.GetLikeList>> getListByLike(PageDto pageDto, @CurrentUser CustomUserDetails customUserDetails) {
        Page<PostResponse.GetLikeList> response = postService.getListByLike(customUserDetails.getUser(), pageDto);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/myComplete/list")
    public ResponseEntity<Page<PostResponse.GetMyCompletedList>> getListByMyCompleteList(PageDto pageDto, @CurrentUser CustomUserDetails customUserDetails) {
        Page<PostResponse.GetMyCompletedList> response = postService.getListByMyCompleteList(customUserDetails.getUser(), pageDto);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/apply/list")
    public ResponseEntity<Page<PostResponse.GetMyApplyList>> getListByApplyStatus(@RequestParam(name = "status") ApplyStatus applyStatus,
                                                                                  PageDto pageDto,
                                                                                  @CurrentUser CustomUserDetails customUserDetails) {
        Page<PostResponse.GetMyApplyList> response = postService.getListByApplyStatus(applyStatus, customUserDetails.getUser(), pageDto);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/business/profile/{businessProfileId}/list")
    public ResponseEntity<Page<PostResponse.GetListByBusinessProfile>> getListByBusinessProfile(@PathVariable Long businessProfileId,
                                                                                                @RequestParam(defaultValue = "RECRUIT", name = "status") PostStatus postStatus,
                                                                                                PageDto pageDto) {
        Page<PostResponse.GetListByBusinessProfile> response = postService.getListByBusinessProfile(businessProfileId, postStatus, pageDto);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{postId}/exist/doDate/list")
    public ResponseEntity<PostResponse.DoDateList> getDoDateList(@PathVariable Long postId,
                                                                 @RequestParam(name = "yearMonth") @DateTimeFormat(pattern = "yyyy-MM") YearMonth yearMonth) {
        PostResponse.DoDateList response = postService.getDoDateListByYearMonth(postId, yearMonth);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<PostResponse.OnlyId> updateContent(@PathVariable Long postId, @RequestBody PostRequest.UpdateContent request,
                                                             @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.OnlyId response = postService.updateContent(postId, request, customUserDetails.getUser());
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deleteOne(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        postService.deleteOne(postId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }
}
