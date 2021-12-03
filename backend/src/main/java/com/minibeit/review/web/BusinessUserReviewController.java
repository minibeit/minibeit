package com.minibeit.review.web;

import com.minibeit.common.dto.ApiResult;
import com.minibeit.review.domain.BusinessUserReviewEvalType;
import com.minibeit.review.domain.BusinessUserReviewType;
import com.minibeit.review.dto.BusinessUserReviewResponse;
import com.minibeit.review.service.BusinessUserReviewService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BusinessUserReviewController {
    private final BusinessUserReviewService businessUserReviewService;

    @PostMapping("/business/{businessProfileId}/date/{postDoDateId}/review/{reviewDetailId}")
    public ResponseEntity<ApiResult<Void>> createBusinessReview(@PathVariable Long businessProfileId, @PathVariable Long postDoDateId,
                                                                @PathVariable Long reviewDetailId, @CurrentUser CustomUserDetails customUserDetails) {
        businessUserReviewService.createBusinessReview(businessProfileId, postDoDateId, reviewDetailId, LocalDateTime.now(), customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @PostMapping("/business/{businessProfileId}/user/{userId}/date/{postDoDateId}/review/{reviewDetailId}")
    public ResponseEntity<ApiResult<Void>> createUserReview(@PathVariable Long businessProfileId, @PathVariable Long userId, @PathVariable Long postDoDateId,
                                                            @PathVariable Long reviewDetailId, @CurrentUser CustomUserDetails customUserDetails) {
        businessUserReviewService.createUserReview(businessProfileId, userId, postDoDateId, reviewDetailId, LocalDateTime.now(), customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @GetMapping("/business/user/reviews")
    public ResponseEntity<ApiResult<List<BusinessUserReviewResponse.IdAndName>>> getList(@RequestParam(name = "reviewType") BusinessUserReviewType type, @RequestParam(name = "evalType") BusinessUserReviewEvalType evalType) {
        List<BusinessUserReviewResponse.IdAndName> response = businessUserReviewService.getList(type, evalType);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/business/{businessProfileId}/good-reviews")
    public ResponseEntity<ApiResult<List<BusinessUserReviewResponse.CountsByReviews>>> getGoodReviewsWithCount(@PathVariable Long businessProfileId) {
        List<BusinessUserReviewResponse.CountsByReviews> response = businessUserReviewService.getGoodReviewsWithCount(businessProfileId);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }
}