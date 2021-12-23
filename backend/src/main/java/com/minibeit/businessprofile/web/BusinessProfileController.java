package com.minibeit.businessprofile.web;

import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.BusinessProfileService;
import com.minibeit.common.dto.ApiResult;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BusinessProfileController {
    private final BusinessProfileService businessProfileService;

    @PostMapping("/business-profile")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ApiResult<BusinessProfileResponse.IdAndName>> create(@Valid BusinessProfileRequest.Create request,
                                                                               @CurrentUser CustomUserDetails customUserDetails) {
        BusinessProfileResponse.IdAndName response = businessProfileService.create(request, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/business/profile/" + response.getId())).body(ApiResult.build(HttpStatus.CREATED.value(), response));
    }

    @PostMapping("/business-profile/{businessProfileId}")
    public ResponseEntity<ApiResult<BusinessProfileResponse.IdAndName>> update(@PathVariable Long businessProfileId,
                                                                               @Valid BusinessProfileRequest.Update request,
                                                                               @CurrentUser CustomUserDetails customUserDetails) {
        BusinessProfileResponse.IdAndName response = businessProfileService.update(businessProfileId, request, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @PostMapping("/business-profile/{businessProfileId}/share/{userId}")
    public ResponseEntity<ApiResult<Void>> shareBusinessProfile(@PathVariable Long businessProfileId,
                                                                @PathVariable Long userId,
                                                                @CurrentUser CustomUserDetails customUserDetails) {
        businessProfileService.shareBusinessProfile(businessProfileId, userId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @PostMapping("/business-profile/{businessProfileId}/change/{userId}")
    public ResponseEntity<ApiResult<Void>> changeAdmin(@PathVariable Long businessProfileId,
                                                       @PathVariable Long userId,
                                                       @CurrentUser CustomUserDetails customUserDetails) {
        businessProfileService.changeAdmin(businessProfileId, userId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @GetMapping("/business-profiles/mine")
    public ResponseEntity<ApiResult<List<BusinessProfileResponse.GetList>>> getListIsMine(@CurrentUser CustomUserDetails customUserDetails) {
        List<BusinessProfileResponse.GetList> response = businessProfileService.getListIsMine(customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/business-profile/{businessProfileId}")
    public ResponseEntity<ApiResult<BusinessProfileResponse.GetOne>> getOne(@PathVariable Long businessProfileId, @CurrentUser CustomUserDetails customUserDetails) {
        BusinessProfileResponse.GetOne response = businessProfileService.getOne(businessProfileId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @DeleteMapping("/business-profile/{businessProfileId}/user/{userId}")
    public ResponseEntity<ApiResult<Void>> expelUser(@PathVariable Long businessProfileId,
                                                     @PathVariable Long userId,
                                                     @CurrentUser CustomUserDetails customUserDetails) {
        businessProfileService.cancelShare(businessProfileId, userId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @DeleteMapping("/business-profile/{businessProfileId}/user")
    public ResponseEntity<ApiResult<Void>> goOutBusinessProfile(@PathVariable Long businessProfileId,
                                                                @CurrentUser CustomUserDetails customUserDetails) {
        businessProfileService.leaveBusinessProfile(businessProfileId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @DeleteMapping("/business-profile/{businessProfileId}")
    public ResponseEntity<ApiResult<Void>> delete(@PathVariable Long businessProfileId,
                                                  @CurrentUser CustomUserDetails customUserDetails) {
        businessProfileService.delete(businessProfileId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
