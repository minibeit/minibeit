package com.minibeit.businessprofile.web;

import com.minibeit.MvcTest;
import com.minibeit.businessprofile.domain.BusinessReviewDetail;
import com.minibeit.businessprofile.domain.ReviewType;
import com.minibeit.businessprofile.dto.BusinessReviewResponse;
import com.minibeit.businessprofile.service.BusinessReviewService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("비즈니스 프로필 리뷰 API 문서화")
@WebMvcTest(BusinessReviewController.class)
class BusinessReviewControllerTest extends MvcTest {
    @MockBean
    private BusinessReviewService businessReviewService;

    private BusinessReviewDetail businessReviewDetail1;
    private BusinessReviewDetail businessReviewDetail2;
    private BusinessReviewDetail businessReviewDetail3;

    @BeforeEach
    public void setup() {
        businessReviewDetail1 = BusinessReviewDetail.builder().id(1L).content("실험이 좋았어요").type(ReviewType.GOOD).build();
        businessReviewDetail2 = BusinessReviewDetail.builder().id(2L).content("친절했어요").type(ReviewType.GOOD).build();
        businessReviewDetail3 = BusinessReviewDetail.builder().id(3L).content("GOOD").type(ReviewType.GOOD).build();
    }

    @Test
    @DisplayName("비즈니스 리뷰 생성 문서화")
    public void create() throws Exception {
        ResultActions results = mvc.perform(post("/api/business/{businessProfileId}/date/{postDoDateId}/review/{reviewDetailId}", 1, 1, 1)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-review-create",
                        pathParameters(
                                parameterWithName("businessProfileId").description("비즈니스 프로필 식별자"),
                                parameterWithName("postDoDateId").description("모집 날짜 식별자"),
                                parameterWithName("reviewDetailId").description("상세 후기 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }


    @Test
    @DisplayName("비즈니스 리뷰 만족 불만족 리스트 조회")
    public void getList() throws Exception {
        List<BusinessReviewResponse.IdAndName> response = new ArrayList<>();
        BusinessReviewResponse.IdAndName response1 = BusinessReviewResponse.IdAndName.build(businessReviewDetail1);
        BusinessReviewResponse.IdAndName response2 = BusinessReviewResponse.IdAndName.build(businessReviewDetail2);
        BusinessReviewResponse.IdAndName response3 = BusinessReviewResponse.IdAndName.build(businessReviewDetail3);
        response.add(response1);
        response.add(response2);
        response.add(response3);

        given(businessReviewService.getList(any())).willReturn(response);

        ResultActions results = mvc.perform(
                get("/api/business/reviews")
                        .param("type", "GOOD")
        );

        results.andExpect(status().isOk())
                .andDo(document("business-review-list",
                        requestParameters(
                                parameterWithName("type").description("만족한 리뷰라면 GOOD 불만족한 리뷰라면 BAD")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].id").type(JsonFieldType.NUMBER).description("리뷰 상세 식별자"),
                                fieldWithPath("data.[].content").type(JsonFieldType.STRING).description("리뷰 상세 내용")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스 리뷰 개수와 목록 조회")
    public void getGoodReviewsWithCount() throws Exception {
        List<BusinessReviewResponse.CountsByReviews> response = new ArrayList<>();
        BusinessReviewResponse.CountsByReviews response1 = BusinessReviewResponse.CountsByReviews.builder().id(1L).content("예상보다 소요 시간이 적었어요").count(23L).build();
        BusinessReviewResponse.CountsByReviews response2 = BusinessReviewResponse.CountsByReviews.builder().id(2L).content("참여 경험이 흥미로웠어요").count(39L).build();
        BusinessReviewResponse.CountsByReviews response3 = BusinessReviewResponse.CountsByReviews.builder().id(3L).content("참여에 대한 보상이 충분해요").count(22L).build();
        response.add(response1);
        response.add(response2);
        response.add(response3);

        given(businessReviewService.getGoodReviewsWithCount(any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/business/{businessProfileId}/good-reviews", 1)
        );

        results.andExpect(status().isOk())
                .andDo(document("business-good-reviews-count",
                        pathParameters(
                                parameterWithName("businessProfileId").description("비즈니스 프로필 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].id").type(JsonFieldType.NUMBER).description("리뷰 상세 식별자"),
                                fieldWithPath("data.[].content").type(JsonFieldType.STRING).description("리뷰 상세 내용"),
                                fieldWithPath("data.[].count").type(JsonFieldType.NUMBER).description("리뷰 상세 내용")
                        )
                ));
    }
}