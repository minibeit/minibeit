package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.dto.PostApplicantRequest;
import com.minibeit.post.dto.PostApplicantResponse;
import com.minibeit.post.service.PostApplicantService;
import com.minibeit.user.domain.Gender;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
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
    @DisplayName("비즈니스쪽에서 해당 지원자 게시물 참여 허가 취소 문서화")
    public void applyApproveCancel() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/{postId}/date/{postDoDateId}/apply/approve/cancel/{userId}", 1, 1, 2)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-apply-approve-cancel",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자"),
                                parameterWithName("postDoDateId").description("게시물 참여가능 날짜 식별자"),
                                parameterWithName("userId").description("유저(지원자) 식별자")
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
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스쪽에서 해당 지원자 게시물 참여 거절 문서화")
    public void applyReject() throws Exception {
        PostApplicantRequest.ApplyReject request = PostApplicantRequest.ApplyReject.builder().comment("조건에 해당하지 않습니다.").build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/{postId}/date/{postDoDateId}/apply/reject/{userId}", 1, 1, 2)
                .content(objectMapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-apply-reject",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자"),
                                parameterWithName("postDoDateId").description("게시물 참여가능 날짜 식별자"),
                                parameterWithName("userId").description("유저(지원자) 식별자")
                        ),
                        requestFields(
                                fieldWithPath("comment").type(JsonFieldType.STRING).description("거절 사유")
                        )
                ));
    }


    @Test
    @DisplayName("시작 날짜에 따라 지원자 목록 조회")
    public void applicantListByDate() throws Exception {
        List<PostApplicantResponse.UserInfo> response = new ArrayList<>();
        PostApplicantResponse.UserInfo userInfo1 = PostApplicantResponse.UserInfo.builder()
                .id(1L)
                .name("동그라미")
                .birth(LocalDate.of(1999, 9, 9))
                .gender(Gender.FEMALE)
                .phoneNum("010-1234-0123")
                .job("대학생")
                .status(ApplyStatus.WAIT)
                .startTime(LocalDateTime.of(2021, 9, 9, 9, 30))
                .time(120)
                .postDoDateId(1L)
                .build();
        PostApplicantResponse.UserInfo userInfo2 = PostApplicantResponse.UserInfo.builder()
                .id(2L)
                .name("네모")
                .birth(LocalDate.of(1980, 9, 9))
                .gender(Gender.MALE)
                .phoneNum("010-1124-0123")
                .job("교수")
                .status(ApplyStatus.APPROVE)
                .startTime(LocalDateTime.of(2021, 9, 9, 9, 30))
                .time(120)
                .postDoDateId(1L)
                .build();
        PostApplicantResponse.UserInfo userInfo3 = PostApplicantResponse.UserInfo.builder()
                .id(3L)
                .name("세모")
                .birth(LocalDate.of(1997, 9, 9))
                .gender(Gender.MALE)
                .phoneNum("010-1234-6666")
                .job("개발자")
                .status(ApplyStatus.APPROVE)
                .startTime(LocalDateTime.of(2021, 9, 9, 10, 30))
                .time(120)
                .postDoDateId(2L)
                .build();
        response.add(userInfo1);
        response.add(userInfo2);
        response.add(userInfo3);

        given(postApplicantService.getApplicantListByDate(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/{postId}/applicant/list", 1)
                .param("doDate", "2021-09-09")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-applicant-list",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자")
                        ),
                        requestParameters(
                                parameterWithName("doDate").description("실험자들을 조회할 날짜")
                        ),
                        responseFields(
                                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("유저 식별자"),
                                fieldWithPath("[].name").type(JsonFieldType.STRING).description("유저 실명"),
                                fieldWithPath("[].birth").type(JsonFieldType.STRING).description("생년월일"),
                                fieldWithPath("[].gender").type(JsonFieldType.STRING).description("성별"),
                                fieldWithPath("[].phoneNum").type(JsonFieldType.STRING).description("연락처"),
                                fieldWithPath("[].job").type(JsonFieldType.STRING).description("직업"),
                                fieldWithPath("[].status").description("지원현황(APPROVE or WAIT)"),
                                fieldWithPath("[].postDoDateId").description("게시물 실험 시작 시간 식별자"),
                                fieldWithPath("[].startTime").description("실험 시작 시간"),
                                fieldWithPath("[].endTime").description("실험 끝나는 시간")
                        )
                ));
    }
}