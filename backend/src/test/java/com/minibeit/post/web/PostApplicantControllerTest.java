package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.post.service.PostApplicantService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PostApplicantController.class)
class PostApplicantControllerTest extends MvcTest {
    @MockBean
    private PostApplicantService postApplicantService;

    @Test
    @DisplayName("게시물 지원 문서화")
    public void applyPost() throws Exception {
        ResultActions results = mvc.perform(post("/api/post/{postId}/date/{postDoDateId}/apply", 1, 5)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-apply",
                        pathParameters(
                                parameterWithName("postId").description("참여할 게시물 식별자"),
                                parameterWithName("postDoDateId").description("게시물 참여가능 날짜 식별자")
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
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스쪽에서 해당 지원자 게시물 참여 허가 문서화")
    public void applyApprove() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/{postId}/date/{postDoDateId}/apply/approve/{userId}", 1, 1, 2)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-apply-approve",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자"),
                                parameterWithName("postDoDateId").description("게시물 참여가능 날짜 식별자"),
                                parameterWithName("userId").description("유저(지원자) 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스쪽에서 해당 지원자 게시물 참여 거절 문서화")
    public void applyReject() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/{postId}/date/{postDoDateId}/apply/reject/{userId}", 1, 1, 2)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-apply-reject",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자"),
                                parameterWithName("postDoDateId").description("게시물 참여가능 날짜 식별자"),
                                parameterWithName("userId").description("유저(지원자) 식별자")
                        )
                ));
    }
}