package com.minibeit.user.web;

import com.minibeit.common.dto.ApiResult;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import com.minibeit.user.dto.UserRequest;
import com.minibeit.user.dto.UserResponse;
import com.minibeit.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api")
public class UserController {
    private final UserService userService;

    @PostMapping("/user/signup")
    public ResponseEntity<ApiResult<UserResponse.CreateOrUpdate>> signup(@Valid UserRequest.Signup request, @CurrentUser CustomUserDetails customUserDetails) {
        UserResponse.CreateOrUpdate response = userService.signup(request, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @PostMapping("/user/update")
    public ResponseEntity<ApiResult<UserResponse.CreateOrUpdate>> update(@Valid UserRequest.Update request, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), userService.update(request, customUserDetails.getUser())));
    }

    @PostMapping("/user/nickname/check")
    public ResponseEntity<ApiResult<Void>> nicknameCheck(@Valid @RequestBody UserRequest.Nickname request) {
        userService.nickNameCheck(request);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @PostMapping("/user/{userId}/verification")
    public ResponseEntity<ApiResult<UserResponse.Verification>> codeVerification(@PathVariable Long userId, @Valid @RequestBody UserRequest.Verification request) {
        UserResponse.Verification response = userService.codeVerification(userId, request);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/user/me")
    public ResponseEntity<ApiResult<UserResponse.GetOne>> getMe(@CurrentUser CustomUserDetails customUserDetails) {
        UserResponse.GetOne response = userService.getMe(customUserDetails.getUser());

        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/user/search")
    public ResponseEntity<ApiResult<List<UserResponse.IdAndNickname>>> searchByNickname(@RequestParam("nickname") String nickname) {
        List<UserResponse.IdAndNickname> response = userService.searchByNickname(nickname);

        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/users/business-profile/{businessProfileId}")
    public ResponseEntity<ApiResult<List<UserResponse.IdAndNickname>>> getListInBusinessProfile(@PathVariable Long businessProfileId) {
        List<UserResponse.IdAndNickname> response = userService.getListInBusinessProfile(businessProfileId);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @DeleteMapping("/user")
    public ResponseEntity<ApiResult<Void>> deleteOne(@CurrentUser CustomUserDetails customUserDetails) {
        userService.deleteOne(customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
