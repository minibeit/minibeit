package com.minibeit.businessprofile.web;

import com.minibeit.businessprofile.domain.ReviewType;
import com.minibeit.businessprofile.dto.BusinessReviewResponse;
import com.minibeit.businessprofile.service.BusinessReviewService;
import com.minibeit.common.dto.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/business")
public class BusinessProfileReviewController {
    private final BusinessReviewService businessReviewService;

    @PostMapping("/{businessProfileId}/review/{reviewDetailId}")
    public ResponseEntity<ApiResult<Void>> create(@PathVariable Long businessProfileId, @PathVariable Long reviewDetailId) {
        businessReviewService.create(businessProfileId, reviewDetailId);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @GetMapping("/reviews")
    public ResponseEntity<ApiResult<List<BusinessReviewResponse.IdAndName>>> getList(@RequestParam(name = "type") ReviewType type) {
        List<BusinessReviewResponse.IdAndName> response = businessReviewService.getList(type);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }
}