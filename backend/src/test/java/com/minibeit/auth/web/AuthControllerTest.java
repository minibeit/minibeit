package com.minibeit.auth.web;

import com.minibeit.MvcTest;
import com.minibeit.auth.service.RefreshTokenService;
import com.minibeit.auth.domain.token.Token;
import com.minibeit.auth.domain.TokenProvider;
import com.minibeit.user.service.dto.UserResponse;
import com.minibeit.auth.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import javax.servlet.http.Cookie;
import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("인증 API 문서화")
@WebMvcTest(AuthController.class)
class AuthControllerTest extends MvcTest {
    @MockBean
    private AuthService authService;
    @MockBean
    private TokenProvider tokenProvider;
    @MockBean
    private RefreshTokenService refreshTokenService;

    @Test
    @DisplayName("refresh token 문서화")
    public void refreshToken() throws Exception {
        UserResponse.Login response = UserResponse.Login.build(1L, "테스터",
                Token.builder().token("accessToken").expiredAt(LocalDateTime.now()).build(),
                Token.builder().token("refreshToken").expiredAt(LocalDateTime.now().plusDays(10)).build());

        Cookie cookie = new Cookie("refresh_token", "refreshToken");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(14 * 24 * 60 * 60);

        given(refreshTokenService.createAccessTokenAndRefreshToken(any())).willReturn(response);
        given(tokenProvider.isValidToken(any())).willReturn(true);

        ResultActions results = mvc.perform(post("/api/user/refreshtoken").cookie(cookie));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("auth-refresh-token",
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("로그인한 유저 식별자"),
                                fieldWithPath("data.name").type(JsonFieldType.STRING).description("로그인한 유저 이름"),
                                fieldWithPath("data.accessToken").type(JsonFieldType.STRING).description("accessToken")
                        )
                ));
    }

    @Test
    @DisplayName("logout 문서화")
    public void logout() throws Exception {
        ResultActions results = mvc.perform(post("/api/user/logout"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("auth-logout",
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }
}