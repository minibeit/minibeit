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
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("비즈니스 프로필 리뷰 API 문서화")
@WebMvcTest(BusinessProfileReviewController.class)
class BusinessProfileReviewControllerTest extends MvcTest {
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
}