package com.minibeit.mail.web;

import com.minibeit.MvcTest;
import com.minibeit.mail.condition.PostMailCondition;
import com.minibeit.mail.dto.MailRequest;
import com.minibeit.mail.service.MailService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("메일 전송 문서화")
@WebMvcTest(MailController.class)
class MailControllerTest extends MvcTest {
    @MockBean
    private MailService mailService;

    @Test
    @DisplayName("승인,반려,승인취소,참가취소 메일 전송 문서화")
    public void createInfo() throws Exception {
        MailRequest.PostStatusMail request = MailRequest.PostStatusMail.builder().postMailCondition(PostMailCondition.APPROVECANCEL).toEmailList(List.of("test@test.com", "test2@test.com")).build();

        ResultActions results = mvc.perform(post("/api/mail/post")
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

    @Test
    @DisplayName("이메일 인증번호 메일 전송 문서화")
    public void sendEmailVerificationCode() throws Exception {
        MailRequest.EmailVerification request = MailRequest.EmailVerification.builder().toEmail("test@test.com").build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/mail/user/{userId}/email/verification", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .characterEncoding("UTF-8")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("mail-user-email-verification",
                        pathParameters(
                                parameterWithName("userId").description("유저 식별자")
                        ),
                        requestFields(
                                fieldWithPath("toEmail").type(JsonFieldType.STRING).description("인증번호를 보낼 이메일")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }
}