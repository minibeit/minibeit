package com.minibeit.post.web;

import com.minibeit.common.dto.ApiResult;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.service.dto.PostApplicantRequest;
import com.minibeit.post.service.dto.PostApplicantResponse;
import com.minibeit.post.service.PostApplicantByBusinessService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostApplicantByBusinessController {
    private final PostApplicantByBusinessService postApplicantByBusinessService;

    @PostMapping("/date/{postDoDateId}/apply/approve/{userId}")
    public ResponseEntity<ApiResult<Void>> applyApprove(@PathVariable Long postDoDateId, @PathVariable Long userId,
                                                        @CurrentUser CustomUserDetails customUserDetails) {
        postApplicantByBusinessService.applyApprove(postDoDateId, userId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @PostMapping("/date/{postDoDateId}/apply/approve/cancel/{userId}")
    public ResponseEntity<ApiResult<Void>> applyApproveCancel(@PathVariable Long postDoDateId, @PathVariable Long userId,
                                                              @CurrentUser CustomUserDetails customUserDetails) {
        postApplicantByBusinessService.applyApproveCancel(postDoDateId, userId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @PostMapping("/date/{postDoDateId}/apply/reject/{userId}")
    public ResponseEntity<ApiResult<Void>> applyReject(@PathVariable Long postDoDateId, @PathVariable Long userId,
                                                       @Valid @RequestBody PostApplicantRequest.ApplyReject request, @CurrentUser CustomUserDetails customUserDetails) {
        postApplicantByBusinessService.applyReject(postDoDateId, userId, request, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @PostMapping("/date/{postDoDateId}/attend/change/{userId}")
    public ResponseEntity<ApiResult<Void>> attendChange(@PathVariable Long postDoDateId, @PathVariable Long userId,
                                                        @RequestBody PostApplicantRequest.AttendChange request, @CurrentUser CustomUserDetails customUserDetails) {
        postApplicantByBusinessService.attendChange(postDoDateId, userId, request, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @GetMapping("/{postId}/applicants")
    public ResponseEntity<ApiResult<List<PostApplicantResponse.ApplicantInfo>>> applicantListByDate(@PathVariable Long postId,
                                                                                                    @RequestParam(name = "status") ApplyStatus applyStatus,
                                                                                                    @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate doDate) {
        List<PostApplicantResponse.ApplicantInfo> response = postApplicantByBusinessService.getApplicantListByDate(postId, applyStatus, doDate);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }
}
