package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.RejectPost;
import com.minibeit.post.service.dto.RejectPostResponse;
import com.minibeit.post.service.RejectPostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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

@DisplayName("반려게시물 API 문서화")
@WebMvcTest(RejectPostController.class)
class RejectPostControllerTest extends MvcTest {
    @MockBean
    private RejectPostService rejectPostService;

    private RejectPost rejectPost1;
    private RejectPost rejectPost2;
    private RejectPost rejectPost3;

    @BeforeEach
    public void setup() {
        rejectPost1 = RejectPost.builder()
                .id(1L)
                .title("실험 주제1")
                .rejectComment("조건에 맞지 않습니다.")
                .doDate(LocalDateTime.of(2021, 9, 28, 9, 30))
                .doTime(30)
                .contact("010-1234-1234")
                .category("기타")
                .businessProfileName("동그라미 실험실")
                .recruitCondition(true)
                .place("고려대 연구실")
                .placeDetail("신공학관")
                .build();
        rejectPost2 = RejectPost.builder()
                .id(2L)
                .title("실험 주제2")
                .rejectComment("모집이 완료되었습니다.")
                .doDate(LocalDateTime.of(2021, 9, 28, 9, 30))
                .doTime(30)
                .category("기타")
                .businessProfileName("동그라미 실험실")
                .recruitCondition(true)
                .contact("010-1234-1234")
                .place("고려대 연구실")
                .placeDetail("신공학관")
                .build();
        rejectPost3 = RejectPost.builder()
                .id(3L)
                .title("실험 주제3")
                .rejectComment("게시글이 삭제되었습니다.")
                .doDate(LocalDateTime.of(2021, 9, 28, 9, 30))
                .doTime(30)
                .category("기타")
                .businessProfileName("동그라미 실험실")
                .recruitCondition(true)
                .contact("010-1234-1234")
                .place("고려대 연구실")
                .placeDetail("신공학관")
                .build();
    }


    @Test
    @DisplayName("반려 게시물 목록 조회 문서화")
    public void getList() throws Exception {
        List<RejectPost> rejectPosts = new ArrayList<>();
        rejectPosts.add(rejectPost1);
        rejectPosts.add(rejectPost2);
        rejectPosts.add(rejectPost3);
        List<RejectPostResponse.GetList> collect = rejectPosts.stream().map(RejectPostResponse.GetList::build).collect(Collectors.toList());
        PageDto pageDto = new PageDto(1, 5);

        Page<RejectPostResponse.GetList> postPage = new PageImpl<>(collect, pageDto.of(), rejectPosts.size());

        given(rejectPostService.getList(any(), any())).willReturn(postPage);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/rejected-posts")
                .param("page", "1")
                .param("size", "5"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("rejectPost-getList",
                        requestParameters(
                                parameterWithName("page").description("조회할 페이지"),
                                parameterWithName("size").description("조회할 사이즈")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.content[].id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("data.content[].title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("data.content[].rejectComment").type(JsonFieldType.STRING).description("반려 이유"),
                                fieldWithPath("data.content[].category").type(JsonFieldType.STRING).description("모집 분야"),
                                fieldWithPath("data.content[].address").type(JsonFieldType.STRING).description("주소"),
                                fieldWithPath("data.content[].addressDetail").type(JsonFieldType.STRING).description("상세주소"),
                                fieldWithPath("data.content[].recruitCondition").type(JsonFieldType.BOOLEAN).description("조건 유무"),
                                fieldWithPath("data.content[].startTime").type(JsonFieldType.STRING).description("시작 시간"),
                                fieldWithPath("data.content[].endTime").type(JsonFieldType.STRING).description("끝나는 시간"),
                                fieldWithPath("data.content[].businessName").type(JsonFieldType.STRING).description("모집한 비즈니스 프로필 이름"),
                                fieldWithPath("data.totalElements").description("전체 개수"),
                                fieldWithPath("data.last").description("마지막 페이지인지 식별"),
                                fieldWithPath("data.totalPages").description("전체 페이지")
                        )
                ));
    }

    @Test
    @DisplayName("반려게시물 삭제 문서화")
    public void deleteOne() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .delete("/api/rejected-post/{rejectPostId}", 1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("reject-post-deleteOne",
                        pathParameters(
                                parameterWithName("rejectPostId").description("삭제할 반려 게시물 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }
}