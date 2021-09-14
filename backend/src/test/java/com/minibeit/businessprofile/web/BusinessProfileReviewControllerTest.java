package com.minibeit.businessprofile.web;

import com.minibeit.MvcTest;
import com.minibeit.businessprofile.dto.BusinessProfileReviewResponse;
import com.minibeit.businessprofile.dto.BusinessProfilesReviewRequest;
import com.minibeit.businessprofile.service.BusinessProfileReviewService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BusinessProfileReviewController.class)
class BusinessProfileReviewControllerTest extends MvcTest {
    @MockBean
    private BusinessProfileReviewService businessProfileReviewService;

    @Test
    @DisplayName("게시물 후기 작성 문서화")
    public void createReview() throws Exception {
        BusinessProfilesReviewRequest.CreateReview request = BusinessProfilesReviewRequest.CreateReview.builder().postTitle("게시물 제목").content("게시물 후기 내용").doDate(LocalDateTime.of(2021, 9, 4, 9, 30)).build();
        BusinessProfileReviewResponse.ReviewId response = BusinessProfileReviewResponse.ReviewId.builder().id(1L).build();
        given(businessProfileReviewService.createReview(any(), any(), any(), any())).willReturn(response);

        ResultActions result = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/{postId}/review/{postDoDateId}", 1, 2)
                .content(objectMapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
        );

        result.andExpect(status().isCreated())
                .andDo(print())
                .andDo(document("business-review-create",
                        pathParameters(
                                parameterWithName("postId").description("후기 작성할 게시물 식별자"),
                                parameterWithName("postDoDateId").description("후기 작성할 게시물 시작 날짜 식별자")
                        ),
                        requestFields(
                                fieldWithPath("postTitle").type(JsonFieldType.STRING).description("후기 작성할 게시물 제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("후기 내용"),
                                fieldWithPath("doDate").type(JsonFieldType.STRING).description("후기 작성할 게시물 시작 날짜")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("작성한 게시물 후기 식별자")
                        )
                ));
    }
}