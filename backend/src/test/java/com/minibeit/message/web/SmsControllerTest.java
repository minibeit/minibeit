package com.minibeit.message.web;

import com.minibeit.MvcTest;
import com.minibeit.message.dto.SmsRequest;
import com.minibeit.message.dto.SmsResponse;
import com.minibeit.message.service.SmsService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("SMS 발송 API 문서화")
@WebMvcTest(SmsController.class)
class SmsControllerTest extends MvcTest {
    @MockBean
    private SmsService smsService;

    @Test
    @DisplayName("핸드폰 인증번호 문자 전송 문서화")
    public void sendSmsVerificationCode() throws Exception {
        SmsRequest request = SmsRequest.builder().receiverPhoneNumber("01012341234").build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/user/{userId}/sms", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request))
        );

        SmsResponse response = SmsResponse.builder()
                .statusCode("202")
                .statusName("success")
                .requestId("test")
                .requestTime(LocalDateTime.of(2021, 11, 17, 9, 30))
                .build();

        given(smsService.sendSmsVerificationCode(any(), any())).willReturn(response);

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("sms-verificationCode-push",
                        pathParameters(
                                parameterWithName("userId").description("유저 식별자")
                        ),
                        requestFields(
                                fieldWithPath("receiverPhoneNumber").type(JsonFieldType.STRING).description("수신자 번호")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }
}