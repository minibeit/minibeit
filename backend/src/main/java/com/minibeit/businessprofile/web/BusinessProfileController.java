package com.minibeit.businessprofile.web;

import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.BusinessProfileService;
import com.minibeit.common.dto.PageDto;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<BusinessProfileResponse.IdAndName> create(BusinessProfileRequest.Create request,
                                                                    @CurrentUser CustomUserDetails customUserDetails) {
        BusinessProfileResponse.IdAndName response = businessProfileService.create(request, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/business/profile/" + response.getId())).body(response);
    }

    @PostMapping("/{businessProfileId}")
    public ResponseEntity<BusinessProfileResponse.IdAndName> update(@PathVariable Long businessProfileId,
                                                                    BusinessProfileRequest.Update request,
                                                                    @CurrentUser CustomUserDetails customUserDetails) {
        BusinessProfileResponse.IdAndName response = businessProfileService.update(businessProfileId, request, customUserDetails.getUser());
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/{businessProfileId}/share")
    public ResponseEntity<Void> shareBusinessProfile(@PathVariable Long businessProfileId,
                                                     @RequestBody BusinessProfileRequest.ShareOrExpel request,
                                                     @CurrentUser CustomUserDetails customUserDetails) {
        businessProfileService.shareBusinessProfile(businessProfileId, request, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{businessProfileId}/change/{userId}")
    public ResponseEntity<Void> changeAdmin(@PathVariable Long businessProfileId,
                                            @PathVariable Long userId,
                                            @CurrentUser CustomUserDetails customUserDetails) {
        businessProfileService.transferOfAuthority(businessProfileId, userId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{businessProfileId}/expel")
    public ResponseEntity<Void> cancelShare(@PathVariable Long businessProfileId,
                                            @RequestBody BusinessProfileRequest.ShareOrExpel request,
                                            @CurrentUser CustomUserDetails customUserDetails) {
        businessProfileService.cancelShare(businessProfileId, request, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<BusinessProfileResponse.GetList>> getListIsMine(@PathVariable Long userId) {
        List<BusinessProfileResponse.GetList> response = businessProfileService.getListIsMine(userId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{businessProfileId}")
    public ResponseEntity<BusinessProfileResponse.GetOne> getOne(@PathVariable Long businessProfileId,
                                                                 @CurrentUser CustomUserDetails customUserDetails) {
        BusinessProfileResponse.GetOne response = businessProfileService.getOne(businessProfileId, customUserDetails.getUser());
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{businessProfileId}")
    public ResponseEntity<Void> delete(@PathVariable Long businessProfileId,
                                       @CurrentUser CustomUserDetails customUserDetails) {
        businessProfileService.delete(businessProfileId, customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{businessProfileId}/posts")
    public ResponseEntity<Page<BusinessProfileResponse.PostList>> postList(@PathVariable Long businessProfileId,
                                                                           PageDto pageDto){
        Page<BusinessProfileResponse.PostList> postLists = businessProfileService.getPostList(businessProfileId, pageDto);

        return ResponseEntity.ok().body(postLists);
    }
}
