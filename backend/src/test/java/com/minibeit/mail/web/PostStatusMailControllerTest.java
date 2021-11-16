package com.minibeit.mail.web;

import com.minibeit.MvcTest;
import com.minibeit.mail.condition.PostMailCondition;
import com.minibeit.mail.dto.PostStatusMailRequest;
import com.minibeit.mail.service.PostStatusMailService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("메일 전송 문서화")
@WebMvcTest(PostStatusMailController.class)
class PostStatusMailControllerTest extends MvcTest {
    @MockBean
    private PostStatusMailService postStatusMailService;

    @Test
    @DisplayName("승인,반려,승인취소,참가취소 메일 전송 문서화")
    public void createInfo() throws Exception {
        PostStatusMailRequest request = PostStatusMailRequest.builder().postMailCondition(PostMailCondition.APPLICANTCANCEL).toEmailList(List.of("test@test.com", "test2@test.com")).build();

        ResultActions results = mvc.perform(post("/api/post/mail")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .characterEncoding("UTF-8")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-mail",
                        requestFields(
                                fieldWithPath("postMailCondition").type(JsonFieldType.STRING).description("APPROVE(확정알림메일), REJECT(반려알림메일), APPROVECANCEL(확정취소메일(실험자)), APPLICANTCANCEL(참가자취소메일(피실험자))"),
                                fieldWithPath("toEmailList.[]").type(JsonFieldType.ARRAY).description("보낼 사람 이메일 주소")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }
}