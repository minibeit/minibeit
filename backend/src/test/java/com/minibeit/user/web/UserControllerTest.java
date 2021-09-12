package com.minibeit.user.web;

import com.minibeit.MvcTest;
import com.minibeit.avatar.domain.Avatar;
import com.minibeit.school.domain.School;
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
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest extends MvcTest {
    @MockBean
    private UserService userService;

    private User user;

    @BeforeEach
    public void setup() {
        user = User.builder()
                .id(1L)
                .name("테스터 실명")
                .nickname("동그라미")
                .gender(Gender.MALE)
                .birth(LocalDate.of(1997,3,6))
                .job("개발자")
                .phoneNum("010-1234-1234")
                .avatar(Avatar.builder().id(1L).url("profile image url").build())
                .school(School.builder().id(1L).name("고려대학교").build())
                .build();
    }

    @Test
    @DisplayName("닉네임 중복체크 문서화")
    public void createDateRule() throws Exception {
        UserRequest.Nickname request = UserRequest.Nickname.builder()
                .nickname("별")
                .build();

        ResultActions results = mvc.perform(post("/api/user/nickname/check")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isOk())
                .andDo(document("user-nickname-check",
                        requestFields(
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("중복체크할 닉네임")
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
                .andDo(print())
                .andDo(document("user-getMe",
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("회원가입한 유저 식별자"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("실명"),
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임"),
                                fieldWithPath("gender").type(JsonFieldType.STRING).description("성별(MALE or FEMALE)"),
                                fieldWithPath("phoneNum").type(JsonFieldType.STRING).description("전화번호"),
                                fieldWithPath("job").type(JsonFieldType.STRING).description("직업"),
                                fieldWithPath("birth").type(JsonFieldType.STRING).description("생년월일"),
                                fieldWithPath("schoolName").type(JsonFieldType.NUMBER).description("관심학교 이름"),
                                fieldWithPath("avatar").type(JsonFieldType.STRING).description("프로필 이미지 url(프로필 이미지가 없다면 null)")
                        )
                ));
    }

    @Test
    @DisplayName("내 정보 수정 문서화")
    public void update() throws Exception {
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile avatar = new MockMultipartFile("avatar", "avatar.jpg", "image/jpg", is.readAllBytes());

        UserResponse.CreateOrUpdate response = UserResponse.CreateOrUpdate.builder().id(1L).nickname("별").schoolId(2L).build();

        given(userService.update(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(
                multipart("/api/user/update")
                        .file(avatar)
                        .param("name", "수정된이름")
                        .param("nickname", "별")
                        .param("nicknameChanged", "true")
                        .param("gender", "MALE")
                        .param("phoneNum", "010-1234-5678")
                        .param("job", "개발자")
                        .param("birth","2000-11-11")
                        .param("schoolId", "2")
                        .param("avatarChanged", "true")
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .characterEncoding("UTF-8")
        );

        results.andExpect(status().isOk())
                .andDo(document("user-update",
                        requestParameters(
                                parameterWithName("name").description("실명"),
                                parameterWithName("nicknameChanged").description("닉네임 수정여부(수정했다면 true 안했다면 false)"),
                                parameterWithName("nickname").description("닉네임"),
                                parameterWithName("gender").description("성별(MALE or FEMALE)"),
                                parameterWithName("phoneNum").description("전화번호"),
                                parameterWithName("job").description("직업"),
                                parameterWithName("birth").description("생년월일(2000-11-11)"),
                                parameterWithName("schoolId").description("관심있는 학교 식별자"),
                                parameterWithName("avatarChanged").description("개인 프로필 이미지 수정여부(수정했다면 true 안했다면 false)")
                        ),
                        requestParts(
                                partWithName("avatar").description("사용자 프로필 이미지")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("유저 식별자"),
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("유저 닉네임"),
                                fieldWithPath("schoolId").type(JsonFieldType.NUMBER).description("관심 학교 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스 프로필을 가지고 있는 유저 목록 조회")
    public void getListInBusinessProfile() throws Exception {
        List<UserResponse.IdAndNickname> response = new ArrayList<>();
        response.add(UserResponse.IdAndNickname.builder().id(1L).nickname("테스터").build());
        given(userService.getListInBusinessProfile(any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.get("/api/user/list/business/profile/{businessProfileId}", 1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("user-list-in-businessprofile",
                        pathParameters(
                                parameterWithName("businessProfileId").description("비즈니스 프로필 식별자")
                        ),
                        responseFields(
                                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("공유된 유저의 식별자"),
                                fieldWithPath("[].nickname").type(JsonFieldType.STRING).description("공유된 유저의 닉네임")
                        )
                ));
    }
}