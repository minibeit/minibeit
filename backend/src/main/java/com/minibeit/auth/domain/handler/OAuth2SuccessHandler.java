package com.minibeit.auth.domain.handler;

import com.minibeit.auth.domain.TokenProvider;
import com.minibeit.auth.domain.token.Token;
import com.minibeit.common.utils.CookieUtils;
import com.minibeit.user.domain.SignupProvider;
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
    @Value("${oauth2.success.redirect.url}")
    private String url;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        User user = findUser(oauth2User);
        Long schoolId = user.getSchoolId();
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

        if (user.getAvatar() != null) {
            response.sendRedirect(url + user.getId() + "/" + nickname + "/" + user.getEmail() + "/" + token.getToken() + "/" + schoolId + "/" + user.isSignupCheck() + "/" + avatar);
        } else {
            response.sendRedirect(url + user.getId() + "/" + nickname + "/" + user.getEmail() + "/" + token.getToken() + "/" + schoolId + "/" + user.isSignupCheck() + "/0/0/0");
        }
    }

    private User findUser(OAuth2User oauth2User) {
        if (oauth2User.getAttributes().get("sub") != null) {
            String oAuthId = String.valueOf(oauth2User.getAttributes().get("sub"));
            return userRepository.findBySocialProviderAndOauthIdWithAvatar(SignupProvider.GOOGLE, oAuthId).orElseThrow(UserNotFoundException::new);
        } else {
            String oAuthId = String.valueOf(oauth2User.getAttributes().get("id"));
            return userRepository.findBySocialProviderAndOauthIdWithAvatar(SignupProvider.KAKAO, oAuthId).orElseThrow(UserNotFoundException::new);
        }
    }
}
