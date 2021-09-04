package com.minibeit.businessprofile.web;

import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.BusinessProfileService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/business/profile")
public class UserBusinessProfileController {

    private final BusinessProfileService businessProfileService;

    @DeleteMapping("/{businessProfileId}/share")
    public ResponseEntity<Void> cancelShare(@PathVariable Long businessProfileId,
                                            @RequestBody BusinessProfileRequest.Share request,
                                            @CurrentUser CustomUserDetails customUserDetails){
        businessProfileService.cancelShare(businessProfileId, request, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{businessProfileId}/share")
    public ResponseEntity<List<BusinessProfileResponse.IdAndNickname>> getSharing(@PathVariable Long businessProfileId){
        List<BusinessProfileResponse.IdAndNickname> response = businessProfileService.getSharingList(businessProfileId);
        return ResponseEntity.ok().body(response);
    }
}
