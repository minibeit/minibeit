package com.minibeit.auth.service.unit;

import com.minibeit.auth.domain.TokenProvider;
import com.minibeit.auth.service.RefreshTokenService;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import com.minibeit.user.service.unit.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("RefreshTokenService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class RefreshTokenServiceUnitTest {
    @Mock
    UserRepository userRepository;
    @Mock
    TokenProvider tokenProvider;
    @InjectMocks
    RefreshTokenService refreshTokenService;

    @Test
    @DisplayName("access,refresh token 생성 성공")
    public void createAccessTokenAndRefreshToken() {
        given(tokenProvider.getUserIdFromRefreshToken(any())).willReturn(MockUser.MockUser1.ID);
        given(userRepository.findById(any())).willReturn(Optional.of(MockUser.MockUser1.USER));
        given(tokenProvider.generateAccessToken(any())).willReturn(MockAuth.MockAuth1.TOKEN);
        given(tokenProvider.generateRefreshToken(any())).willReturn(MockAuth.MockAuth1.TOKEN);

        refreshTokenService.createAccessTokenAndRefreshToken("refresh_token");

        verify(tokenProvider).getUserIdFromRefreshToken(any());
        verify(tokenProvider).generateAccessToken(any());
        verify(tokenProvider).generateRefreshToken(any());
    }

    @Test
    @DisplayName("access,refresh token 생성 실패 (해당 유저가 없는 경우)")
    public void createAccessTokenAndRefreshTokenFail() {
        given(tokenProvider.getUserIdFromRefreshToken(any())).willReturn(MockUser.MockUser1.ID);
        given(userRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> refreshTokenService.createAccessTokenAndRefreshToken("refresh_token"));
    }
}
