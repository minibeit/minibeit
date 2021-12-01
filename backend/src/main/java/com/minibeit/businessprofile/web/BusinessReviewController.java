package com.minibeit.businessprofile.web;

import com.minibeit.businessprofile.domain.ReviewType;
import com.minibeit.businessprofile.dto.BusinessReviewResponse;
import com.minibeit.businessprofile.service.BusinessReviewService;
import com.minibeit.common.dto.ApiResult;
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
@RequestMapping("/api/business")
public class BusinessReviewController {
    private final BusinessReviewService businessReviewService;

    @PostMapping("/{businessProfileId}/date/{postDoDateId}/review/{reviewDetailId}")
    public ResponseEntity<ApiResult<Void>> create(@PathVariable Long businessProfileId, @PathVariable Long postDoDateId,
                                                  @PathVariable Long reviewDetailId, @CurrentUser CustomUserDetails customUserDetails) {
        businessReviewService.create(businessProfileId, postDoDateId, reviewDetailId, LocalDateTime.now(), customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @GetMapping("/reviews")
    public ResponseEntity<ApiResult<List<BusinessReviewResponse.IdAndName>>> getList(@RequestParam(name = "type") ReviewType type) {
        List<BusinessReviewResponse.IdAndName> response = businessReviewService.getList(type);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/{businessProfileId}/good-reviews")
    public ResponseEntity<ApiResult<List<BusinessReviewResponse.CountsByReviews>>> getGoodReviewsWithCount(@PathVariable Long businessProfileId) {
        List<BusinessReviewResponse.CountsByReviews> response = businessReviewService.getGoodReviewsWithCount(businessProfileId);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }
}