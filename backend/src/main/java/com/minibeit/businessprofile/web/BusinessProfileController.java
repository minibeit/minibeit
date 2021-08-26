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
    public ResponseEntity<BusinessProfileResponse.IdAndName> create(@RequestBody BusinessProfileRequest.CreateAndUpdate request, @CurrentUser CustomUserDetails customUserDetails) {
        BusinessProfileResponse.IdAndName response = businessProfileService.create(request, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/business/profile/" + response.getId())).body(response);
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<BusinessProfileResponse.IdAndName>> getListIsMine(@PathVariable Long userId) {
        List<BusinessProfileResponse.IdAndName> response = businessProfileService.getListIsMine(userId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{businessProfileId}")
    public ResponseEntity<BusinessProfileResponse.GetOne> getOne(@PathVariable Long businessProfileId) {
        BusinessProfileResponse.GetOne response = businessProfileService.getOne(businessProfileId);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{businessProfileId}")
    public ResponseEntity<BusinessProfileResponse.IdAndName> update(@PathVariable Long businessProfileId, @RequestBody BusinessProfileRequest.CreateAndUpdate request) {
        BusinessProfileResponse.IdAndName response = businessProfileService.update(businessProfileId, request);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{businessProfileId}")
    public ResponseEntity<Void> delete(@PathVariable Long businessProfileId) {
        businessProfileService.delete(businessProfileId);
        return ResponseEntity.ok().build();
    }
}
