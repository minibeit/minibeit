package com.minibeit.businessprofile.web;

import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.BusinessProfileService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import com.minibeit.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/business/profile")
public class UserBusinessProfileController {

    private final BusinessProfileService businessProfileService;

    @DeleteMapping("/{businessProfileId}/expel/{userId}")
    public ResponseEntity<Void> cancelShare(@PathVariable Long businessProfileId,
                                            @PathVariable Long userId,
                                            @CurrentUser CustomUserDetails customUserDetails){
        businessProfileService.cancelShare(businessProfileId, userId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }
}
