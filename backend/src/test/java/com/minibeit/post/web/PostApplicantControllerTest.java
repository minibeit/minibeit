package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.post.service.PostApplicantService;
import com.minibeit.post.web.PostApplicantController;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("게시물 지원 by 유저 API 문서화")
@WebMvcTest(PostApplicantController.class)
class PostApplicantControllerTest extends MvcTest {
    @MockBean
    private PostApplicantService postApplicantService;

    @Test
    @DisplayName("게시물 지원 문서화")
    public void applyPost() throws Exception {
        ResultActions results = mvc.perform(post("/api/post/date/{postDoDateId}/apply", 1, 5)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-apply",
                        pathParameters(
                                parameterWithName("postDoDateId").description("게시물 참여가능 날짜 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 지원 취소 문서화")
    public void applyCancel() throws Exception {
        ResultActions results = mvc.perform(post("/api/post/date/{postDoDateId}/apply/cancel", 5)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-apply-cancel",
                        pathParameters(
                                parameterWithName("postDoDateId").description("게시물 참여가능 날짜 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("피실험자가 게시물 실험완료 활성화 문서화")
    public void applyMyFinish() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/date/{postDoDateId}/finish", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-apply-my-finish",
                        pathParameters(
                                parameterWithName("postDoDateId").description("게시물 참여날짜 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }
}