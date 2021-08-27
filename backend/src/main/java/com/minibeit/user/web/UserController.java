package com.minibeit.user.web;

import com.minibeit.security.token.RefreshTokenService;
import com.minibeit.security.userdetails.CurrentUser;
import com.minibeit.security.userdetails.CustomUserDetails;
import com.minibeit.user.dto.UserRequest;
import com.minibeit.user.dto.UserResponse;
import com.minibeit.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/user")
public class UserController {
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private static final String REFRESH_TOKEN = "refresh_token";

    //테스트용
    @PostMapping("/login")
    public ResponseEntity<UserResponse.Login> login(@RequestBody UserRequest.Login request, HttpServletResponse response) {
        UserResponse.Login loginResponse = userService.login(request);
        createCookie(response, loginResponse.getRefreshToken());

        return ResponseEntity.ok().body(loginResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse.Create> signup(@RequestBody UserRequest.Signup request, @CurrentUser CustomUserDetails customUserDetails) {
        UserResponse.Create response = userService.signup(request, customUserDetails.getUser());

        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<UserResponse.Login> refreshToken(@CookieValue("refresh_token") String refreshToken, HttpServletResponse response) {
        UserResponse.Login loginResponse = refreshTokenService.createAccessToken(refreshToken);
        createCookie(response, loginResponse.getRefreshToken());

        return ResponseEntity.ok().body(loginResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@CurrentUser CustomUserDetails customUserDetails, HttpServletResponse response) {
        userService.logout(customUserDetails.getUser());
        deleteCookie(response);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse.GetOne> getMe(@CurrentUser CustomUserDetails customUserDetails) {
        UserResponse.GetOne response = userService.getMe(customUserDetails.getUser());

        return ResponseEntity.ok().body(response);
    }

    private void createCookie(HttpServletResponse response, String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN, refreshToken)
                .httpOnly(true)
                .path("/")
                .maxAge(14 * 24 * 60 * 60)
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
    }

    private void deleteCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN, "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
    }
}
