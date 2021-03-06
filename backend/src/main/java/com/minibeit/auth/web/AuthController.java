package com.minibeit.auth.web;

import com.minibeit.auth.service.AuthService;
import com.minibeit.auth.service.RefreshTokenService;
import com.minibeit.common.dto.ApiResult;
import com.minibeit.common.utils.CookieUtils;
import com.minibeit.user.service.dto.AuthRequest;
import com.minibeit.user.service.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/user")
public class AuthController {
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    private static final String REFRESH_TOKEN = "refresh_token";
    private final static Integer MAX_COOKIE_TIME_S = 7 * 24 * 60 * 60;

    //테스트용
    @PostMapping("/login/test")
    public ResponseEntity<UserResponse.Login> login(@RequestBody AuthRequest.Login request, HttpServletResponse response) {
        UserResponse.Login loginResponse = authService.login(request);
        CookieUtils.addCookie(response, REFRESH_TOKEN, loginResponse.getRefreshToken(), MAX_COOKIE_TIME_S);
        return ResponseEntity.ok().body(loginResponse);
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<ApiResult<UserResponse.Login>> refreshToken(@CookieValue(REFRESH_TOKEN) String refreshToken, HttpServletResponse response) {
        UserResponse.Login loginResponse = refreshTokenService.createAccessTokenAndRefreshToken(refreshToken);

        CookieUtils.addCookie(response, REFRESH_TOKEN, loginResponse.getRefreshToken(), MAX_COOKIE_TIME_S);

        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), loginResponse));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResult<Void>> logout(HttpServletResponse response) {
        CookieUtils.deleteCookie(response, REFRESH_TOKEN);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
