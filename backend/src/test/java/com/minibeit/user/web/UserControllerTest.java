package com.minibeit.user.web;

import com.minibeit.MvcTest;
import com.minibeit.security.token.RefreshTokenService;
import com.minibeit.security.token.Token;
import com.minibeit.security.token.TokenProvider;
import com.minibeit.user.domain.Gender;
import com.minibeit.user.domain.User;
import com.minibeit.user.dto.UserRequest;
import com.minibeit.user.dto.UserResponse;
import com.minibeit.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import javax.servlet.http.Cookie;
import java.time.LocalDateTime;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest extends MvcTest {
    @MockBean
    private UserService userService;
    @MockBean
    private TokenProvider tokenProvider;
    @MockBean
    private RefreshTokenService refreshTokenService;

    private User user;

    @BeforeEach
    public void setup() {
        user = User.builder()
                .id(1L)
                .name("테스터 실명")
                .nickname("동그라미")
                .gender(Gender.MALE)
                .age(30)
                .job("개발자")
                .phoneNum("010-1234-1234")
                .build();
    }

    @Test
    @DisplayName("회원가입 문서화")
    public void signup() throws Exception {
        UserRequest.Signup request = UserRequest.Signup.builder()
                .name("test@test.com")
                .nickname("테스터")
                .nicknameChanged(true)
                .gender(Gender.MALE)
                .phoneNum("010-1234-7890")
                .job("개발자")
                .age(28)
                .schoolIdList(Collections.singletonList(1L))
                .build();
        UserResponse.Create response = UserResponse.Create.builder().id(1L).nickname("동그라미").schoolId(1L).build();

        given(userService.signup(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(
                post("/api/user/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isOk())
                .andDo(document("user-signup",
                        requestFields(
                                fieldWithPath("name").type(JsonFieldType.STRING).description("실명"),
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임"),
                                fieldWithPath("nicknameChanged").type(JsonFieldType.BOOLEAN).description("기존 닉네임과 다르다면 true, 닉네임이 수정되지 않았다면 false"),
                                fieldWithPath("gender").type(JsonFieldType.STRING).description("성별(MALE or FEMALE)"),
                                fieldWithPath("phoneNum").type(JsonFieldType.STRING).description("전화번호"),
                                fieldWithPath("job").type(JsonFieldType.STRING).description("직업"),
                                fieldWithPath("age").type(JsonFieldType.NUMBER).description("나이"),
                                fieldWithPath("schoolIdList").type(JsonFieldType.ARRAY).description("관심있는 학교 식별자 배열")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원가입한 유저 식별자"),
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("회원가입한 유저 닉네임"),
                                fieldWithPath("schoolId").type(JsonFieldType.NUMBER).description("관심 학교 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("내 정보 조회 문서화")
    public void getMe() throws Exception {
        UserResponse.GetOne response = UserResponse.GetOne.build(user);

        given(userService.getMe(any())).willReturn(response);

        ResultActions results = mvc.perform(get("/api/user/me"));

        results.andExpect(status().isOk())
                .andDo(document("user-getMe",
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원가입한 유저 식별자"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("실명"),
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임"),
                                fieldWithPath("gender").type(JsonFieldType.STRING).description("성별(MALE or FEMALE)"),
                                fieldWithPath("phoneNum").type(JsonFieldType.STRING).description("전화번호"),
                                fieldWithPath("job").type(JsonFieldType.STRING).description("직업"),
                                fieldWithPath("age").type(JsonFieldType.NUMBER).description("나이")
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
                .andDo(document("user-refresh-token",
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
                .andDo(document("user-logout"));
    }
}