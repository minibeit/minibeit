package com.minibeit.auth.domain.handler;

import com.minibeit.auth.domain.TokenProvider;
import com.minibeit.auth.domain.token.Token;
import com.minibeit.common.utils.CookieUtils;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
    private final static Integer MAX_COOKIE_TIME_S = 7 * 24 * 60 * 60;
    private static final String REFRESH_TOKEN = "refresh_token";
    private static final String LOCALHOST = "localhost";
    @Value("${oauth2.success.redirect.local.url}")
    private String localUrl;
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
        Long schoolId = user.getSchoolId();

        //redirect url 한글깨짐 방지
        String nickname = user.getNickname();
        if (nickname != null) {
            nickname = URLEncoder.encode(nickname, StandardCharsets.UTF_8);
        }
        String avatar = null;
        if (user.getAvatar() != null) {
            avatar = user.getAvatar().getUrl().substring(8);
        }
        Token token = tokenProvider.generateAccessToken(user);
        Token refreshToken = tokenProvider.generateRefreshToken(user);

        CookieUtils.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), MAX_COOKIE_TIME_S);

        if (request.getServerName().equals(LOCALHOST)) {
            makeCallbackUrl(response, user, schoolId, nickname, avatar, token, localUrl);
        } else {
            makeCallbackUrl(response, user, schoolId, nickname, avatar, token, url);
        }
    }

    private void makeCallbackUrl(HttpServletResponse response, User user, Long schoolId, String nickname, String avatar, Token token, String url) throws IOException {
        if (user.getAvatar() != null) {
            response.sendRedirect(url + user.getId() + "/" + nickname + "/" + user.getEmail() + "/" + token.getToken() + "/" + schoolId + "/" + user.isSignupCheck() + "/" + avatar);
        } else {
            response.sendRedirect(url + user.getId() + "/" + nickname + "/" + user.getEmail() + "/" + token.getToken() + "/" + schoolId + "/" + user.isSignupCheck() + "/0/0/0");
        }
    }
}
