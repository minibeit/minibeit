package com.minibeit.businessprofile.web;

import com.minibeit.businessprofile.dto.BusinessProfileReviewResponse;
import com.minibeit.businessprofile.dto.BusinessProfilesReviewRequest;
import com.minibeit.businessprofile.service.BusinessProfileReviewService;
import com.minibeit.common.dto.ApiResult;
import com.minibeit.common.dto.PageDto;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BusinessProfileReviewController {
    private final BusinessProfileReviewService businessProfileReviewService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post/date/{postDoDateId}/review")
    public ResponseEntity<ApiResult<BusinessProfileReviewResponse.ReviewId>> create(@PathVariable Long postDoDateId, @Valid @RequestBody BusinessProfilesReviewRequest.Create request,
                                                                                    @CurrentUser CustomUserDetails customUserDetails) {
        BusinessProfileReviewResponse.ReviewId response = businessProfileReviewService.create(postDoDateId, request, LocalDateTime.now(), customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/post/review/" + response.getId())).body(ApiResult.build(HttpStatus.CREATED.value(), response));
    }

    @GetMapping("/business/profile/review/{businessProfileReviewId}")
    public ResponseEntity<ApiResult<BusinessProfileReviewResponse.GetOne>> getOne(@PathVariable Long businessProfileReviewId) {
        BusinessProfileReviewResponse.GetOne response = businessProfileReviewService.getOne(businessProfileReviewId);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/business/profile/{businessProfileId}/review/list")
    public ResponseEntity<ApiResult<Page<BusinessProfileReviewResponse.GetOne>>> getReviewList(@PathVariable Long businessProfileId,
                                                                                               PageDto pageDto) {
        Page<BusinessProfileReviewResponse.GetOne> response = businessProfileReviewService.getList(businessProfileId, pageDto);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @PutMapping("/business/profile/review/{businessProfileReviewId}")
    public ResponseEntity<ApiResult<BusinessProfileReviewResponse.ReviewId>> update(@PathVariable Long businessProfileReviewId,
                                                                                    @Valid @RequestBody BusinessProfilesReviewRequest.Update request,
                                                                                    @CurrentUser CustomUserDetails customUserDetails) {
        BusinessProfileReviewResponse.ReviewId response = businessProfileReviewService.update(businessProfileReviewId, request, LocalDateTime.now(), customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @DeleteMapping("/business/profile/review/{businessProfileReviewId}")
    public ResponseEntity<ApiResult<Void>> deleteOne(@PathVariable Long businessProfileReviewId,
                                                     @CurrentUser CustomUserDetails customUserDetails) {
        businessProfileReviewService.deleteOne(businessProfileReviewId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}