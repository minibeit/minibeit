package com.minibeit.user.web;

import com.minibeit.MvcTest;
import com.minibeit.security.token.RefreshTokenService;
import com.minibeit.security.token.TokenProvider;
import com.minibeit.user.domain.Gender;
import com.minibeit.user.dto.UserRequest;
import com.minibeit.user.dto.UserResponse;
import com.minibeit.user.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest extends MvcTest {
    @MockBean
    private UserService userService;
    @MockBean
    private TokenProvider tokenProvider;
    @MockBean
    private RefreshTokenService refreshTokenService;

    @Test
    @DisplayName("회원가입 문서화")
    public void signup() throws Exception {
        UserRequest.Signup request = UserRequest.Signup.builder()
                .name("test@test.com")
                .nickname("테스터")
                .gender(Gender.MALE)
                .phoneNum("010-1234-7890")
                .job("개발자")
                .age(28)
                .schoolIdList(Collections.singletonList(1L))
                .build();
        UserResponse.OnlyId response = UserResponse.OnlyId.builder().id(1L).build();

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
                                fieldWithPath("gender").type(JsonFieldType.STRING).description("성별(MALE or FEMALE)"),
                                fieldWithPath("phoneNum").type(JsonFieldType.STRING).description("전화번호"),
                                fieldWithPath("job").type(JsonFieldType.STRING).description("직업"),
                                fieldWithPath("age").type(JsonFieldType.NUMBER).description("나이"),
                                fieldWithPath("schoolIdList").type(JsonFieldType.ARRAY).description("관심있는 학교 식별자 배열")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원가입한 유저 식별자")
                        )
                ));
    }

}