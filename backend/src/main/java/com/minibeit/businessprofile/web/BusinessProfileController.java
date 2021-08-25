package com.minibeit.businessprofile.web;

import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.BusinessProfileService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/business/profile")
public class BusinessProfileController {
    private final BusinessProfileService businessProfileService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<BusinessProfileResponse.IdAndName> create(@RequestBody BusinessProfileRequest.Create request, @CurrentUser CustomUserDetails customUserDetails) {
        BusinessProfileResponse.IdAndName response = businessProfileService.create(request, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/business/profile/" + response.getId())).body(response);
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<BusinessProfileResponse.IdAndName>> getListIsMine(@PathVariable Long userId) {
        List<BusinessProfileResponse.IdAndName> response = businessProfileService.getListIsMine(userId);
        return ResponseEntity.ok().body(response);
    }
}
