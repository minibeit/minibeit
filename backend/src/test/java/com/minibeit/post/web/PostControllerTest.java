package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.post.service.PostService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.io.InputStream;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PostController.class)
class PostControllerTest extends MvcTest {
    @MockBean
    private PostService postService;

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
}