package com.minibeit.post.web;

import com.minibeit.common.dto.ApiResult;
import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.PostStatus;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostController {
    private final PostService postService;

    @PostMapping("/{postId}/like")
    public ResponseEntity<ApiResult<Void>> like(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        postService.createOrDeletePostLike(postId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<ApiResult<PostResponse.GetOne>> getOne(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.GetOne response = postService.getOne(postId, customUserDetails);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/{postId}/start")
    public ResponseEntity<ApiResult<List<PostResponse.GetPostStartTime>>> getPostStartTimeList(@PathVariable Long postId,
                                                                                               @RequestParam(name = "doDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate doDate) {
        List<PostResponse.GetPostStartTime> response = postService.getPostStartTimeList(postId, doDate);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/list/{schoolId}")
    public ResponseEntity<ApiResult<Page<PostResponse.GetList>>> getList(@PathVariable Long schoolId,
                                                                         @RequestParam(defaultValue = "ALL") Payment paymentType,
                                                                         @RequestParam(name = "doDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate doDate,
                                                                         @RequestParam(defaultValue = "ALL", name = "category") String category,
                                                                         @RequestParam(name = "minPay", required = false) Integer minPay,
                                                                         @RequestParam(name = "doTime", required = false) Integer doTime,
                                                                         @RequestParam(name = "startTime", required = false) @DateTimeFormat(pattern = "HH:mm") LocalTime startTime,
                                                                         @RequestParam(name = "endTime", required = false) @DateTimeFormat(pattern = "HH:mm") LocalTime endTime,
                                                                         PageDto pageDto, @CurrentUser CustomUserDetails customUserDetails) {
        Page<PostResponse.GetList> response = postService.getList(schoolId, doDate, category, pageDto, paymentType, startTime, endTime, minPay, doTime, customUserDetails);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/like/list")
    public ResponseEntity<ApiResult<Page<PostResponse.GetLikeList>>> getListByLike(PostStatus postStatus, PageDto pageDto, @CurrentUser CustomUserDetails customUserDetails) {
        Page<PostResponse.GetLikeList> response = postService.getListByLike(postStatus, customUserDetails.getUser(), pageDto);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/apply/list")
    public ResponseEntity<ApiResult<Page<PostResponse.GetMyApplyList>>> getListByApplyStatus(@RequestParam(name = "status") ApplyStatus applyStatus,
                                                                                             PageDto pageDto,
                                                                                             @CurrentUser CustomUserDetails customUserDetails) {
        Page<PostResponse.GetMyApplyList> response = postService.getListByApplyStatus(applyStatus, customUserDetails.getUser(), LocalDateTime.now(), pageDto);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/myComplete/list")
    public ResponseEntity<ApiResult<Page<PostResponse.GetMyCompletedList>>> getListByMyCompleteList(PageDto pageDto, @CurrentUser CustomUserDetails customUserDetails) {
        Page<PostResponse.GetMyCompletedList> response = postService.getListByMyCompleteList(customUserDetails.getUser(), pageDto);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @DeleteMapping("/likes")
    public ResponseEntity<ApiResult<Void>> deleteLikes(@CurrentUser CustomUserDetails customUserDetails){
        postService.deleteLikes(customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
