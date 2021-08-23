package com.minibeit.user.service;

import com.minibeit.security.token.RefreshTokenService;
import com.minibeit.security.token.Token;
import com.minibeit.security.token.TokenProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.dto.UserRequest;
import com.minibeit.user.dto.UserResponse;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    private final TokenProvider tokenProvider;

    //테스트용
    public UserResponse.Login login(UserRequest.Login request) {
        User user = userRepository.findByOauthId(request.getId()).orElseThrow(UserNotFoundException::new);

        Token refreshToken = refreshTokenService.createOrUpdateRefreshToken(user);
        return UserResponse.Login.build(user.getId(), user.getName(), tokenProvider.generateAccessToken(user), refreshToken);
    }

    public void logout(User user) {
        refreshTokenService.deleteRefreshTokenByUser(user);
    }
}
