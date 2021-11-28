package com.minibeit.businessprofile.web;

import com.minibeit.businessprofile.domain.ReviewType;
import com.minibeit.businessprofile.dto.BusinessReviewResponse;
import com.minibeit.businessprofile.service.BusinessReviewService;
import com.minibeit.common.dto.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/business")
public class BusinessProfileReviewController {
    private final BusinessReviewService businessReviewService;

    @GetMapping("/reviews")
    public ResponseEntity<ApiResult<List<BusinessReviewResponse.IdAndName>>> getList(@RequestParam(name = "type") ReviewType type) {
        List<BusinessReviewResponse.IdAndName> response = businessReviewService.getList(type);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }
}