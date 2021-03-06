package com.minibeit.post.web;

import com.minibeit.auth.domain.CurrentUser;
import com.minibeit.auth.domain.CustomUserDetails;
import com.minibeit.common.dto.ApiResult;
import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.service.PostService;
import com.minibeit.post.service.dto.PostResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostController {
    private final PostService postService;

    @PostMapping("/post/{postId}/like")
    public ResponseEntity<ApiResult<Void>> like(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        postService.createOrDeletePostLike(postId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<ApiResult<PostResponse.GetOne>> getOne(@PathVariable Long postId, @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.GetOne response = postService.getOne(postId, customUserDetails);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/post/{postId}/start")
    public ResponseEntity<ApiResult<List<PostResponse.GetPostStartTime>>> getPostStartTimeList(@PathVariable Long postId,
                                                                                               @RequestParam(name = "doDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate doDate) {
        List<PostResponse.GetPostStartTime> response = postService.getPostStartTimeList(postId, doDate);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/post/{postId}/dates")
    public ResponseEntity<ApiResult<PostResponse.DoDateList>> getDoDateList(@PathVariable Long postId,
                                                                            @RequestParam(name = "yearMonth") @DateTimeFormat(pattern = "yyyy-MM") YearMonth yearMonth) {
        PostResponse.DoDateList response = postService.getDoDateListByYearMonth(postId, yearMonth);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/posts/{schoolId}")
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

    @GetMapping("/posts/like")
    public ResponseEntity<ApiResult<Page<PostResponse.GetLikeList>>> getListByLike(PageDto pageDto, @CurrentUser CustomUserDetails customUserDetails) {
        Page<PostResponse.GetLikeList> response = postService.getListByLike(customUserDetails.getUser(), pageDto);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/posts/apply")
    public ResponseEntity<ApiResult<Page<PostResponse.GetMyApplyList>>> getListByApplyStatus(@RequestParam(name = "status") ApplyStatus applyStatus,
                                                                                             PageDto pageDto,
                                                                                             @CurrentUser CustomUserDetails customUserDetails) {
        Page<PostResponse.GetMyApplyList> response = postService.getListByApplyStatus(applyStatus, customUserDetails.getUser(), LocalDateTime.now(), pageDto);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/post/user/status")
    public ResponseEntity<ApiResult<PostResponse.GetMyCount>> getMyPostStatus(@RequestParam(name = "status") ApplyStatus status, @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.GetMyCount response = postService.getMyPostStatus(status, LocalDateTime.now(), customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @DeleteMapping("/post/likes")
    public ResponseEntity<ApiResult<Void>> deleteLikeOfCompletedPost(@CurrentUser CustomUserDetails customUserDetails) {
        postService.deleteLikeOfCompletedPost(customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
