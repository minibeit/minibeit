package com.minibeit.user.web;

import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import com.minibeit.user.dto.AuthRequest;
import com.minibeit.user.dto.UserRequest;
import com.minibeit.user.dto.UserResponse;
import com.minibeit.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponse.CreateOrUpdate> signup(AuthRequest.Signup request, @CurrentUser CustomUserDetails customUserDetails) {
        UserResponse.CreateOrUpdate response = userService.signup(request, customUserDetails.getUser());
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/update")
    public ResponseEntity<UserResponse.CreateOrUpdate> update(UserRequest.Update request, @CurrentUser CustomUserDetails customUserDetails) {
        return ResponseEntity.ok().body(userService.update(request, customUserDetails.getUser()));
    }

    @PostMapping("/nickname/check")
    public ResponseEntity<Void> nicknameCheck(@RequestBody UserRequest.Nickname request) {
        userService.nickNameCheck(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/alarm")
    public ResponseEntity<UserResponse.Alaram> getNews(@CurrentUser CustomUserDetails customUserDetails){
        UserResponse.Alaram response = userService.getNews(customUserDetails.getUser());
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse.GetOne> getMe(@CurrentUser CustomUserDetails customUserDetails) {
        UserResponse.GetOne response = userService.getMe(customUserDetails.getUser());

        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserResponse.IdAndNickname>> searchByNickname(@RequestParam("nickname") String nickname) {
        List<UserResponse.IdAndNickname> response = userService.searchByNickname(nickname);

        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/list/business/profile/{businessProfileId}")
    public ResponseEntity<List<UserResponse.IdAndNickname>> getListInBusinessProfile(@PathVariable Long businessProfileId) {
        List<UserResponse.IdAndNickname> response = userService.getListInBusinessProfile(businessProfileId);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteOne(@CurrentUser CustomUserDetails customUserDetails) {
        userService.deleteOne(customUserDetails.getUser());
        return ResponseEntity.ok().build();
    }
}
