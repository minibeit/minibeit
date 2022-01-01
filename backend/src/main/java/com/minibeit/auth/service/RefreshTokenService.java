package com.minibeit.auth.service;

import com.minibeit.auth.domain.token.Token;
import com.minibeit.auth.service.TokenProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.dto.UserResponse;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RefreshTokenService {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;

    public UserResponse.Login createAccessTokenAndRefreshToken(String refreshToken) {
        //refresh token 유효성 검사와 userId 가져오기
        Long userId = tokenProvider.getUserIdFromRefreshToken(refreshToken);

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Token createdRefreshToken = tokenProvider.generateRefreshToken(user);

        return UserResponse.Login.build(user.getId(), user.getName(), tokenProvider.generateAccessToken(user), createdRefreshToken);
    }
}
