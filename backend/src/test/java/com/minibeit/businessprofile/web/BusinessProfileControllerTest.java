package com.minibeit.businessprofile.web;


import com.minibeit.MvcTest;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.BusinessProfileService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BusinessProfileController.class)
class BusinessProfileControllerTest extends MvcTest {
    @MockBean
    private BusinessProfileService businessProfileService;

    @Test
    @DisplayName("비즈니스 프로필 생성 문서화")
    public void create() throws Exception {
        BusinessProfileRequest.Create request = BusinessProfileRequest.Create.builder()
                .name("실험실 이름")
                .category("개발")
                .place("고려대")
                .contact("010-1234-7890")
                .introduce("고려대 실험실 입니다!")
                .build();
        BusinessProfileResponse.IdAndName response = BusinessProfileResponse.IdAndName.builder().id(1L).name("비즈니스 프로필").build();

        given(businessProfileService.create(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(
                post("/api/business/profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("UTF-8")
                        .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isCreated())
                .andDo(document("business-profile-create",
                        requestFields(
                                fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
                                fieldWithPath("category").type(JsonFieldType.STRING).description("분야"),
                                fieldWithPath("place").type(JsonFieldType.STRING).description("장소"),
                                fieldWithPath("contact").type(JsonFieldType.STRING).description("연락처"),
                                fieldWithPath("introduce").type(JsonFieldType.STRING).description("소개")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("생성된 비즈니스 프로필 식별자"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("생성된 비즈니스 프로필 이름")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스 프로필 userId로 전체조회 문서화")
    public void getListIsMine() throws Exception {
        List<BusinessProfileResponse.IdAndName> idAndNames = new ArrayList<>();
        BusinessProfileResponse.IdAndName idAndName1 = BusinessProfileResponse.IdAndName.builder().id(1L).name("동그라미 실험실").build();
        BusinessProfileResponse.IdAndName idAndName2 = BusinessProfileResponse.IdAndName.builder().id(2L).name("세모 실험실").build();
        BusinessProfileResponse.IdAndName idAndName3 = BusinessProfileResponse.IdAndName.builder().id(3L).name("네모 실험실").build();
        idAndNames.add(idAndName1);
        idAndNames.add(idAndName2);
        idAndNames.add(idAndName3);

        given(businessProfileService.getListIsMine(any())).willReturn(idAndNames);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.get("/api/business/profile/list/{userId}",1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-profile-list-mine",
                        pathParameters(
                                parameterWithName("userId").description("조회할 유저 식별자")
                        ),
                        responseFields(
                                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("비즈니스 프로필 식별자"),
                                fieldWithPath("[].name").type(JsonFieldType.STRING).description("비즈니스 프로필 이름")
                        )
                ));
    }
}