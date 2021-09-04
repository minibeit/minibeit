package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostFile;
import com.minibeit.post.domain.PostStatus;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.post.service.PostService;
import com.minibeit.school.domain.School;
import com.minibeit.user.domain.User;
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
import java.time.LocalDateTime;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PostController.class)
class PostControllerTest extends MvcTest {
    @MockBean
    private PostService postService;

    private Post post;
    private User user;

    @BeforeEach
    public void setup() {
        user = User.builder().id(1L).name("동그라미").build();
        post = Post.builder()
                .id(1L)
                .title("동그라미 실험실")
                .content("실험실 분류")
                .place("고려대")
                .contact("010-1234-5786")
                .payment(Payment.CACHE)
                .paymentCache(50000)
                .recruitCondition(true)
                .recruitConditionDetail("운전면허 있는 사람만")
                .doTime(120)
                .startDate(LocalDateTime.of(2021, 9, 3, 9, 30))
                .endDate(LocalDateTime.of(2021, 9, 10, 10, 0))
                .school(School.builder().id(1L).name("고려대학교").build())
                .businessProfile(BusinessProfile.builder().id(1L).name("동그라미실험실").build())
                .postFileList(Collections.singletonList(PostFile.builder().id(1L).url("profile image url").build()))
                .build();
        post.setCreatedBy(user);
    }


    @Test
    @DisplayName("게시물 생성 문서화")
    public void create() throws Exception {
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile files = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is.readAllBytes());
        PostResponse.OnlyId response = PostResponse.OnlyId.builder().id(1L).build();

        given(postService.create(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(
                multipart("/api/post")
                        .file(files)
                        .param("title", "실험 제목")
                        .param("content", "아무나 올 수 있는 실험입니다.")
                        .param("place", "고려대 신공학관")
                        .param("contact", "010-1234-1234")
                        .param("payment", "CACHE")
                        .param("cache", "10000")
                        .param("goods", "보상")
                        .param("condition", "true")
                        .param("conditionDetail", "운전면허 있는 사람")
                        .param("doTime", "60")
                        .param("schoolId", "1")
                        .param("businessProfileId", "1")
                        .param("startDate", "2021-08-30T09:30")
                        .param("endDate", "2021-09-10T09:30")
                        .param("doDateList", "2021-09-02T09:30")
                        .param("doDateList", "2021-09-03T09:30")
                        .param("doDateList", "2021-09-04T09:30")
                        .param("doDateList", "2021-09-05T09:30")
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .characterEncoding("UTF-8")
        );

        results.andExpect(status().isCreated())
                .andDo(print())
                .andDo(document("post-create",
                        requestParameters(
                                parameterWithName("title").description("제목"),
                                parameterWithName("content").description("세부사항"),
                                parameterWithName("place").description("장소"),
                                parameterWithName("contact").description("연락처"),
                                parameterWithName("payment").description("지급 방법 (CACHE or GOODS) 지급 방법이 CACHE 인경우 cache만 보내고 goods는 안보내면 됩니다!"),
                                parameterWithName("cache").description("지급 방법이 CACHE인 경우 현금"),
                                parameterWithName("goods").description("지급 방법이 GOODS인 경우 보상"),
                                parameterWithName("condition").description("구인 조건이 있다면 true 아니면 false (구인 조건이 false라면 conditionDetail를 안보내면 됩니다! )"),
                                parameterWithName("conditionDetail").description("구인 조건이 true인 경우 구인 조건 세부내용"),
                                parameterWithName("doTime").description("실험 소요 시간"),
                                parameterWithName("schoolId").description("학교 식별자"),
                                parameterWithName("businessProfileId").description("게시물을 만드는 비즈니스 프로필 식별자"),
                                parameterWithName("startDate").description("모집 시작 날짜"),
                                parameterWithName("endDate").description("모집 마감 날짜"),
                                parameterWithName("doDateList").description("실험 가능 날짜")
                        ),
                        requestParts(
                                partWithName("files").description("게시물 첨부파일")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("생성된 게시물 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 단건 조회 문서화")
    public void getOne() throws Exception {
        PostResponse.GetOne response = PostResponse.GetOne.build(post, user);

        given(postService.getOne(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.get("/api/post/{postId}", 1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-getOne",
                        pathParameters(
                                parameterWithName("postId").description("조회할 게시물 프로필 식별자")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("세부사항"),
                                fieldWithPath("place").type(JsonFieldType.STRING).description("장소"),
                                fieldWithPath("contact").type(JsonFieldType.STRING).description("연락처"),
                                fieldWithPath("payment").type(JsonFieldType.STRING).description("지급수단(CACHE or GOODS)"),
                                fieldWithPath("goods").description("지급 수단이 GOODS 인 경우 물품 보상"),
                                fieldWithPath("cache").description("지급 수단이 CACHE 인 경우 현금 보상"),
                                fieldWithPath("recruitCondition").type(JsonFieldType.BOOLEAN).description("구인조건이 있다면 true"),
                                fieldWithPath("recruitConditionDetail").description("구인조건이 있다면 구인조건 세부사항(없다면 null)"),
                                fieldWithPath("doTime").type(JsonFieldType.NUMBER).description("실험 소요 시간"),
                                fieldWithPath("schoolName").type(JsonFieldType.STRING).description("학교 이름"),
                                fieldWithPath("startDate").type(JsonFieldType.STRING).description("모집 시작 날짜"),
                                fieldWithPath("endDate").type(JsonFieldType.STRING).description("모집 마감 날짜"),
                                fieldWithPath("files[].url").type(JsonFieldType.STRING).description("파일"),
                                fieldWithPath("mine").type(JsonFieldType.BOOLEAN).description("게시물이 자신이 것인지")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 삭제 문서화")
    public void deleteOne() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.delete("/api/post/{postId}", 1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-deleteOne",
                        pathParameters(
                                parameterWithName("postId").description("삭제할 게시물 프로필 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 지원 문서화")
    public void applyPost() throws Exception {
        PostRequest.Apply request = PostRequest.Apply.builder().doDate(LocalDateTime.of(2021, 9, 1, 9, 30)).build();
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/{postId}/apply", 1)
                .content(objectMapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-apply",
                        pathParameters(
                                parameterWithName("postId").description("참여할 게시물 식별자")
                        ),
                        requestFields(
                                fieldWithPath("doDate").type(JsonFieldType.STRING).description("실험 참가 날짜")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스쪽에서 해당 지원자 게시물 참여 결정 문서화")
    public void applyCheck() throws Exception {
        PostRequest.ApplyCheck request = PostRequest.ApplyCheck.builder().approve(PostStatus.APPROVE).build();
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/{postId}/apply/check/{userId}", 1, 2)
                .content(objectMapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-approve",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자"),
                                parameterWithName("userId").description("유저(지원자) 식별자")
                        ),
                        requestFields(
                                fieldWithPath("approve").type(JsonFieldType.STRING).description("승인이라면 APPROVE 거절이라면 REJECT")
                        )
                ));
    }
}