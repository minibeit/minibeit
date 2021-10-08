package com.minibeit.businessprofile.web;

import com.minibeit.MvcTest;
import com.minibeit.businessprofile.domain.BusinessProfileReview;
import com.minibeit.businessprofile.dto.BusinessProfileReviewResponse;
import com.minibeit.businessprofile.dto.BusinessProfilesReviewRequest;
import com.minibeit.businessprofile.service.BusinessProfileReviewService;
import com.minibeit.common.dto.PageDto;
import com.minibeit.user.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BusinessProfileReviewController.class)
class BusinessProfileReviewControllerTest extends MvcTest {
    @MockBean
    private BusinessProfileReviewService businessProfileReviewService;

    private User user;
    private BusinessProfileReview businessProfileReview1;
    private BusinessProfileReview businessProfileReview2;

    @BeforeEach
    public void setup() {
        user = User.builder().id(1L).name("테스터").nickname("동그라미").build();
        businessProfileReview1 = BusinessProfileReview.builder()
                .id(1L)
                .postTitle("실험 주제")
                .content("실험실이 좋았습니다")
                .time(60)
                .doDate(LocalDateTime.of(2021, 9, 15, 9, 30))
                .build();
        businessProfileReview1.setCreatedBy(user);
        businessProfileReview1.setCreatedAt(LocalDateTime.of(2021, 10, 8, 9, 30));
        businessProfileReview2 = BusinessProfileReview.builder()
                .id(2L)
                .postTitle("실험 주제2")
                .content("보상이 느립니다.")
                .time(120)
                .doDate(LocalDateTime.of(2021, 9, 18, 9, 30))
                .build();
        businessProfileReview2.setCreatedBy(user);
        businessProfileReview2.setCreatedAt(LocalDateTime.of(2021, 10, 8, 9, 30));
    }

    @Test
    @DisplayName("비즈니스프로필 후기 작성 문서화")
    public void create() throws Exception {
        BusinessProfilesReviewRequest.Create request = BusinessProfilesReviewRequest.Create.builder().postTitle("게시물 제목").content("게시물 후기 내용").time(60).doDate(LocalDateTime.of(2021, 9, 4, 9, 30)).build();
        BusinessProfileReviewResponse.ReviewId response = BusinessProfileReviewResponse.ReviewId.builder().id(1L).build();
        given(businessProfileReviewService.create(any(), any(), any(), any())).willReturn(response);

        ResultActions result = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/date/{postDoDateId}/review", 1, 2)
                .content(objectMapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
        );

        result.andExpect(status().isCreated())
                .andDo(print())
                .andDo(document("business-review-create",
                        pathParameters(
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
    @DisplayName("비즈니스프로필 후기 목록 조회")
    public void getOne() throws Exception {
        List<BusinessProfileReview> businessProfileReviews = new ArrayList<>();
        businessProfileReviews.add(businessProfileReview1);
        businessProfileReviews.add(businessProfileReview2);
        List<BusinessProfileReviewResponse.GetList> collect = businessProfileReviews.stream().map(BusinessProfileReviewResponse.GetList::build).collect(Collectors.toList());
        PageDto pageDto = new PageDto(1, 5);

        Page<BusinessProfileReviewResponse.GetList> response = new PageImpl<>(collect, pageDto.of(), businessProfileReviews.size());
        given(businessProfileReviewService.getList(any(), any())).willReturn(response);

        ResultActions result = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/business/profile/{businessProfileId}/review/list", 1)
                .param("page", "1")
                .param("size", "5")
        );

        result.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-review-getList",
                        pathParameters(
                                parameterWithName("businessProfileId").description("비즈니스 프로필 식별자")
                        ),
                        requestParameters(
                                parameterWithName("page").description("조회할 페이지"),
                                parameterWithName("size").description("조회할 사이즈")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("후기 식별자"),
                                fieldWithPath("content[].content").type(JsonFieldType.STRING).description("후기 내용"),
                                fieldWithPath("content[].createdDate").type(JsonFieldType.STRING).description("후기 작성 날짜"),
                                fieldWithPath("content[].writer").type(JsonFieldType.STRING).description("후기 작성자 닉네임"),
                                fieldWithPath("totalElements").description("전체 개수"),
                                fieldWithPath("last").description("마지막 페이지인지 식별"),
                                fieldWithPath("totalPages").description("전체 페이지")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스프로필 리뷰 목록 조회")
    public void getList() throws Exception {
        BusinessProfileReviewResponse.GetOne response = BusinessProfileReviewResponse.GetOne.build(businessProfileReview1);
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
        given(businessProfileReviewService.update(any(), any(), any(), any())).willReturn(response);

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