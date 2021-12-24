package com.minibeit.postapplicant.web;

import com.minibeit.MvcTest;
import com.minibeit.postapplicant.domain.ApplyStatus;
import com.minibeit.postapplicant.service.dto.PostApplicantDto;
import com.minibeit.postapplicant.service.dto.PostApplicantRequest;
import com.minibeit.postapplicant.service.dto.PostApplicantResponse;
import com.minibeit.postapplicant.service.PostApplicantByBusinessService;
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
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("게시물 지원 by 비즈니스 API 문서화")
@WebMvcTest(PostApplicantByBusinessController.class)
class PostApplicantByBusinessControllerTest extends MvcTest {
    @MockBean
    private PostApplicantByBusinessService postApplicantByBusinessService;

    @Test
    @DisplayName("비즈니스쪽에서 해당 지원자 게시물 참여 허가 문서화")
    public void applyApprove() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/date/{postDoDateId}/apply/approve/{userId}", 1, 1, 2)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-apply-approve",
                        pathParameters(
                                parameterWithName("postDoDateId").description("게시물 참여가능 날짜 식별자"),
                                parameterWithName("userId").description("유저(지원자) 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스쪽에서 해당 지원자 게시물 참여 허가 취소 문서화")
    public void applyApproveCancel() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/date/{postDoDateId}/apply/approve/cancel/{userId}", 1, 1, 2)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-apply-approve-cancel",
                        pathParameters(
                                parameterWithName("postDoDateId").description("게시물 참여가능 날짜 식별자"),
                                parameterWithName("userId").description("유저(지원자) 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스쪽에서 해당 지원자 게시물 참여 거절 문서화")
    public void applyReject() throws Exception {
        PostApplicantRequest.ApplyReject request = PostApplicantRequest.ApplyReject.builder().comment("조건에 해당하지 않습니다.").build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/date/{postDoDateId}/apply/reject/{userId}", 1, 1, 2)
                .content(objectMapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-apply-reject",
                        pathParameters(
                                parameterWithName("postDoDateId").description("게시물 참여가능 날짜 식별자"),
                                parameterWithName("userId").description("유저(지원자) 식별자")
                        ),
                        requestFields(
                                fieldWithPath("comment").type(JsonFieldType.STRING).description("거절 사유")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스쪽에서 해당 지원자 참여 여부 결정")
    public void attendChange() throws Exception {
        PostApplicantRequest.AttendChange request = PostApplicantRequest.AttendChange.builder().isAttend(false).build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/date/{postDoDateId}/attend/change/{userId}", 1, 1, 2)
                .content(objectMapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-attend-change",
                        pathParameters(
                                parameterWithName("postDoDateId").description("게시물 참여가능 날짜 식별자"),
                                parameterWithName("userId").description("유저(지원자) 식별자")
                        ),
                        requestFields(
                                fieldWithPath("isAttend").type(JsonFieldType.BOOLEAN).description("해당 지원자가 실험 참여 했다면 true 아니면 false")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("시작 날짜에 따라 지원자 목록 조회")
    public void applicantListByDate() throws Exception {
        List<PostApplicantDto.UserInfo> response = new ArrayList<>();
        PostApplicantDto.UserInfo userInfo1 = PostApplicantDto.UserInfo.builder()
                .id(1L)
                .name("동그라미")
                .email("test1@test.com")
                .birth(LocalDate.of(1999, 9, 9))
                .gender(Gender.FEMALE)
                .phoneNum("010-1234-0123")
                .job("대학생")
                .status(ApplyStatus.WAIT)
                .startTime(LocalDateTime.of(2021, 9, 9, 9, 30))
                .time(120)
                .isAttend(true)
                .postDoDateId(1L)
                .evaluatedBusiness(false)
                .build();
        PostApplicantDto.UserInfo userInfo2 = PostApplicantDto.UserInfo.builder()
                .id(2L)
                .name("네모")
                .email("test2@test.com")
                .birth(LocalDate.of(1980, 9, 9))
                .gender(Gender.MALE)
                .phoneNum("010-1124-0123")
                .job("교수")
                .status(ApplyStatus.APPROVE)
                .startTime(LocalDateTime.of(2021, 9, 9, 9, 30))
                .time(120)
                .isAttend(true)
                .postDoDateId(1L)
                .evaluatedBusiness(false)
                .build();
        PostApplicantDto.UserInfo userInfo3 = PostApplicantDto.UserInfo.builder()
                .id(3L)
                .name("세모")
                .email("test3@test.com")
                .birth(LocalDate.of(1997, 9, 9))
                .gender(Gender.MALE)
                .phoneNum("010-1234-6666")
                .job("개발자")
                .status(ApplyStatus.APPROVE)
                .startTime(LocalDateTime.of(2021, 9, 9, 10, 30))
                .time(120)
                .isAttend(true)
                .postDoDateId(2L)
                .evaluatedBusiness(true)
                .build();
        response.add(userInfo1);
        response.add(userInfo2);
        response.add(userInfo3);

        List<PostApplicantResponse.ApplicantInfo> result = PostApplicantResponse.ApplicantInfo.dtoToResponse(response);

        given(postApplicantByBusinessService.getApplicantListByDate(any(), any(), any())).willReturn(result);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/{postId}/applicant/list", 1)
                .param("doDate", "2021-09-09")
                .param("status", "WAIT")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-applicant-list",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자")
                        ),
                        requestParameters(
                                parameterWithName("doDate").description("실험자들을 조회할 날짜"),
                                parameterWithName("status").description("WAIT(대기자 명단으로 확정자,대기자 모두 보여줌) or APPROVE(확정자 명단)")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].postDoDateId").type(JsonFieldType.NUMBER).description("게시물 실험 시작 시간 식별자"),
                                fieldWithPath("data.[].userInfoList[].id").type(JsonFieldType.NUMBER).description("유저 식별자"),
                                fieldWithPath("data.[].userInfoList[].name").type(JsonFieldType.STRING).description("유저 실명"),
                                fieldWithPath("data.[].userInfoList[].email").type(JsonFieldType.STRING).description("유저 이메일"),
                                fieldWithPath("data.[].userInfoList[].birth").type(JsonFieldType.STRING).description("생년월일"),
                                fieldWithPath("data.[].userInfoList[].gender").type(JsonFieldType.STRING).description("성별"),
                                fieldWithPath("data.[].userInfoList[].phoneNum").type(JsonFieldType.STRING).description("연락처"),
                                fieldWithPath("data.[].userInfoList[].job").type(JsonFieldType.STRING).description("직업"),
                                fieldWithPath("data.[].userInfoList[].status").description("지원현황(APPROVE or WAIT)"),
                                fieldWithPath("data.[].userInfoList[].isAttend").description("실험 참여했다면 true, 안했다면 false"),
                                fieldWithPath("data.[].userInfoList[].postDoDateId").description("게시물 실험 시작 시간 식별자"),
                                fieldWithPath("data.[].userInfoList[].startTime").description("실험 시작 시간"),
                                fieldWithPath("data.[].userInfoList[].endTime").description("실험 끝나는 시간"),
                                fieldWithPath("data.[].userInfoList[].isEvaluable").description("해당 지원자를 평가할 수 있다면 true 아니면 false")
                        )
                ));
    }
}