package com.minibeit.user.web;

import com.minibeit.MvcTest;
import com.minibeit.security.token.RefreshTokenService;
import com.minibeit.security.token.Token;
import com.minibeit.security.token.TokenProvider;
import com.minibeit.user.dto.UserResponse;
import com.minibeit.user.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import javax.servlet.http.Cookie;
import java.io.InputStream;
import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
class AuthControllerTest extends MvcTest {
    @MockBean
    private AuthService authService;
    @MockBean
    private TokenProvider tokenProvider;
    @MockBean
    private RefreshTokenService refreshTokenService;

    @Test
    @DisplayName("회원가입 문서화")
    public void signup() throws Exception {
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile avatar = new MockMultipartFile("avatar", "avatar.jpg", "image/jpg", is.readAllBytes());

        UserResponse.CreateOrUpdate response = UserResponse.CreateOrUpdate.builder().id(1L).nickname("동그라미").schoolId(1L).build();

        given(authService.signup(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(
                multipart("/api/user/signup")
                        .file(avatar)
                        .param("name", "실명")
                        .param("nickname", "동그라미")
                        .param("gender", "MALE")
                        .param("phoneNum", "010-1234-5678")
                        .param("job", "대학생")
                        .param("age", "23")
                        .param("schoolId", "1")
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .characterEncoding("UTF-8")
        );

        results.andExpect(status().isOk())
                .andDo(document("auth-signup",
                        requestParameters(
                                parameterWithName("name").description("실명"),
                                parameterWithName("nickname").description("닉네임"),
                                parameterWithName("gender").description("성별(MALE or FEMALE)"),
                                parameterWithName("phoneNum").description("전화번호"),
                                parameterWithName("job").description("직업"),
                                parameterWithName("age").description("나이"),
                                parameterWithName("schoolId").description("관심있는 학교 식별자")
                        ),
                        requestParts(
                                partWithName("avatar").description("사용자 프로필 이미지")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원가입한 유저 식별자"),
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("회원가입한 유저 닉네임"),
                                fieldWithPath("schoolId").type(JsonFieldType.NUMBER).description("관심 학교 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("refresh token 문서화")
    public void refreshToken() throws Exception {
        UserResponse.Login response = UserResponse.Login.build(1L, "테스터",
                Token.builder().token("accessToken").expiredAt(LocalDateTime.now()).build(),
                Token.builder().token("refreshToken").expiredAt(LocalDateTime.now().plusDays(10)).build());

        Cookie cookie = new Cookie("refresh_token", "refreshToken");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(14 * 24 * 60 * 60);

        given(refreshTokenService.createAccessToken(any())).willReturn(response);
        given(tokenProvider.isValidToken(any())).willReturn(true);

        ResultActions results = mvc.perform(post("/api/user/refreshtoken").cookie(cookie));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("auth-refresh-token",
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("로그인한 유저 식별자"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("로그인한 유저 이름"),
                                fieldWithPath("accessToken").type(JsonFieldType.STRING).description("accessToken")
                        )
                ));
    }

    @Test
    @DisplayName("logout 문서화")
    public void logout() throws Exception {
        ResultActions results = mvc.perform(post("/api/user/logout"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("auth-logout"));
    }
}