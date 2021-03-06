package com.minibeit.auth.service;

import com.minibeit.auth.domain.TokenProvider;
import com.minibeit.auth.domain.token.Token;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.dto.AuthRequest;
import com.minibeit.user.service.dto.UserResponse;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;

    //테스트용
    public UserResponse.Login login(AuthRequest.Login request) {
        User user = userRepository.findByTestId(request.getId()).orElseThrow(UserNotFoundException::new);
        Token refreshToken = tokenProvider.generateRefreshToken(user);

        return UserResponse.Login.build(user.getId(), user.getName(), tokenProvider.generateAccessToken(user), refreshToken);
    }
}
