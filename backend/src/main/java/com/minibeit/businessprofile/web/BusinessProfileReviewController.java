package com.minibeit.businessprofile.web;

import com.minibeit.businessprofile.dto.BusinessProfileReviewResponse;
import com.minibeit.businessprofile.dto.BusinessProfilesReviewRequest;
import com.minibeit.businessprofile.service.BusinessProfileReviewService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BusinessProfileReviewController {
    private final BusinessProfileReviewService businessProfileReviewService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/post/{postId}/review/{postDoDateId}")
    public ResponseEntity<BusinessProfileReviewResponse.ReviewId> create(@PathVariable Long postId,
                                                                         @PathVariable Long postDoDateId,
                                                                         @RequestBody BusinessProfilesReviewRequest.CreateReview request,
                                                                         @CurrentUser CustomUserDetails customUserDetails) {
        BusinessProfileReviewResponse.ReviewId response = businessProfileReviewService.createReview(postId, postDoDateId, request, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/post/review/" + response.getId())).body(response);
    }

    @GetMapping("/business/profile/review/{businessProfileReviewId}")
    public ResponseEntity<BusinessProfileReviewResponse.GetOne> getOne(@PathVariable Long businessProfileReviewId) {
        BusinessProfileReviewResponse.GetOne response = businessProfileReviewService.getOne(businessProfileReviewId);
        return ResponseEntity.ok().body(response);
    }
}
