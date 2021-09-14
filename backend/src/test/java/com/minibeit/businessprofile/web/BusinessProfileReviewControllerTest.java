package com.minibeit.businessprofile.web;

import com.minibeit.MvcTest;
import com.minibeit.businessprofile.domain.BusinessProfileReview;
import com.minibeit.businessprofile.dto.BusinessProfileReviewResponse;
import com.minibeit.businessprofile.dto.BusinessProfilesReviewRequest;
import com.minibeit.businessprofile.service.BusinessProfileReviewService;
import org.junit.jupiter.api.BeforeEach;
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

    private BusinessProfileReview businessProfileReview;

    @BeforeEach
    public void setup() {
        businessProfileReview = BusinessProfileReview.builder()
                .id(1L)
                .postTitle("실험 주제")
                .content("실험실이 좋았습니다")
                .time(60)
                .doDate(LocalDateTime.of(2021, 9, 15, 9, 30))
                .build();
    }

    @Test
    @DisplayName("비즈니스프로필 후기 작성 문서화")
    public void create() throws Exception {
        BusinessProfilesReviewRequest.Create request = BusinessProfilesReviewRequest.Create.builder().postTitle("게시물 제목").content("게시물 후기 내용").time(60).doDate(LocalDateTime.of(2021, 9, 4, 9, 30)).build();
        BusinessProfileReviewResponse.ReviewId response = BusinessProfileReviewResponse.ReviewId.builder().id(1L).build();
        given(businessProfileReviewService.create(any(), any(), any(), any())).willReturn(response);

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
                                fieldWithPath("doDate").type(JsonFieldType.STRING).description("후기 작성할 게시물 시작 날짜"),
                                fieldWithPath("time").type(JsonFieldType.NUMBER).description("후기 작성할 게시물 실험 소요 시간")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("작성한 게시물 후기 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스프로필 후기 단건 조회")
    public void getOne() throws Exception {
        BusinessProfileReviewResponse.GetOne response = BusinessProfileReviewResponse.GetOne.build(businessProfileReview);
        given(businessProfileReviewService.getOne(any())).willReturn(response);

        ResultActions result = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/business/profile/review/{businessProfileReviewId}", 1)
        );

        result.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-review-getOne",
                        pathParameters(
                                parameterWithName("businessProfileReviewId").description("조회할 리뷰 식별자")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("후기 식별자"),
                                fieldWithPath("postTitle").type(JsonFieldType.STRING).description("게시물 제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("후기 내용"),
                                fieldWithPath("doDate").type(JsonFieldType.STRING).description("실험 참가 날짜"),
                                fieldWithPath("startTime").type(JsonFieldType.STRING).description("실험 시작 시간"),
                                fieldWithPath("endTime").type(JsonFieldType.STRING).description("실험 마친 시간")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스프로필 후기 수정 문서화")
    public void update() throws Exception {
        BusinessProfilesReviewRequest.Update request = BusinessProfilesReviewRequest.Update.builder().content("게시물 후기 수정된 내욜").build();
        BusinessProfileReviewResponse.ReviewId response = BusinessProfileReviewResponse.ReviewId.builder().id(1L).build();
        given(businessProfileReviewService.update(any(), any(), any())).willReturn(response);

        ResultActions result = mvc.perform(RestDocumentationRequestBuilders
                .put("/api/business/profile/review/{businessProfileReviewId}", 1)
                .content(objectMapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
        );

        result.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-review-update",
                        pathParameters(
                                parameterWithName("businessProfileReviewId").description("후기 식별자")
                        ),
                        requestFields(
                                fieldWithPath("content").type(JsonFieldType.STRING).description("수정할 후기 내용")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("수정한 게시물 후기 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스프로필 후기 삭제 문서화")
    public void deleteOne() throws Exception {
        ResultActions result = mvc.perform(RestDocumentationRequestBuilders
                .delete("/api/business/profile/review/{businessProfileReviewId}", 1)
        );

        result.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-review-deleteOne",
                        pathParameters(
                                parameterWithName("businessProfileReviewId").description("후기 식별자")
                        )
                ));
    }
}