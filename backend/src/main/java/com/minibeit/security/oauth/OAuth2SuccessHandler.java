package com.minibeit.security.oauth;

import com.minibeit.school.domain.School;
import com.minibeit.security.token.RefreshTokenService;
import com.minibeit.security.token.Token;
import com.minibeit.security.token.TokenProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@Transactional
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    @Value("${oauth2.success.redirect.url}")
    private String url;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String oAuthId = null;
        if (oauth2User.getAttributes().get("sub") != null) {
            oAuthId = String.valueOf(oauth2User.getAttributes().get("sub"));
        } else {
            oAuthId = String.valueOf(oauth2User.getAttributes().get("id"));
        }
        User user = userRepository.findByOauthIdWithAvatar(oAuthId).orElseThrow(UserNotFoundException::new);
        //관심있는 학교 하나 default로 주기
        Long schoolId = null;
        School school = user.getSchool();
        if (school != null) {
            schoolId = school.getId();
        }
        //redirect url 한글깨짐 방지
        String nickname = user.getNickname();
        if (nickname != null) {
            nickname = URLEncoder.encode(nickname, StandardCharsets.UTF_8);
        }
        String avatar = null;
        if (user.getAvatar() != null) {
            avatar = user.getAvatar().getUrl();
        }
        Token token = tokenProvider.generateAccessToken(user);
        Token refreshToken = refreshTokenService.createOrUpdateRefreshToken(user);

        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken.getToken())
                .httpOnly(true)
                .path("/")
                .maxAge(14 * 24 * 60 * 60)
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
        if (user.getAvatar() != null) {
            response.sendRedirect(url + user.getId() + "/" + nickname + "/" + token.getToken() + "/" + schoolId + "/" + user.isSignupCheck() + "/" + avatar);
        } else {
            response.sendRedirect(url + user.getId() + "/" + nickname + "/" + token.getToken() + "/" + schoolId + "/" + user.isSignupCheck() + "/0/0/0");
        }
    }
}
