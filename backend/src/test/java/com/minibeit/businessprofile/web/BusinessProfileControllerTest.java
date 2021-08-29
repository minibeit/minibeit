package com.minibeit.businessprofile.web;


import com.minibeit.MvcTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.BusinessProfileService;
import com.minibeit.file.domain.File;
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
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BusinessProfileController.class)
class BusinessProfileControllerTest extends MvcTest {
    @MockBean
    private BusinessProfileService businessProfileService;

    private BusinessProfile businessProfile;

    @BeforeEach
    public void setup() {
        businessProfile = BusinessProfile.builder()
                .id(1L)
                .name("동그라미 실험실")
                .category("실험실 분류")
                .place("고려대")
                .contact("010-1234-5786")
                .introduce("고려대 동그라미 실험실 입니다.")
                .avatar(File.builder().id(1L).url("profile image url").build())
                .build();
    }

    @Test
    @DisplayName("비즈니스 프로필 생성 문서화")
    public void create() throws Exception {
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile avatar = new MockMultipartFile("avatar", "avatar.jpg", "image/jpg", is.readAllBytes());
        BusinessProfileResponse.IdAndName response = BusinessProfileResponse.IdAndName.builder().id(1L).name("비즈니스 프로필").build();

        given(businessProfileService.create(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(
                multipart("/api/business/profile")
                        .file(avatar)
                        .param("name", "동그라미 실험실")
                        .param("category", "개발")
                        .param("place", "고려대 신공학관")
                        .param("introduce", "고려대 동그라미 실험실입니다!!")
                        .param("contact", "010-1234-1234")
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .characterEncoding("UTF-8")
        );

        results.andExpect(status().isCreated())
                .andDo(document("business-profile-create",
                        requestParameters(
                                parameterWithName("name").description("실험실 이름"),
                                parameterWithName("category").description("실험실 분류"),
                                parameterWithName("place").description("실험실 장소"),
                                parameterWithName("introduce").description("실험실 소개"),
                                parameterWithName("contact").description("실험실 연락처")
                        ),
                        requestParts(
                                partWithName("avatar").description("비즈니스 프로필 이미지")
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

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.get("/api/business/profile/list/{userId}", 1));

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

    @Test
    @DisplayName("비즈니스 프로필 단건 조회 문서화")
    public void getOne() throws Exception {
        BusinessProfileResponse.GetOne response = BusinessProfileResponse.GetOne.build(businessProfile);

        given(businessProfileService.getOne(any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.get("/api/business/profile/{businessProfileId}", 1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-profile-getOne",
                        pathParameters(
                                parameterWithName("businessProfileId").description("조회할 비즈니스 프로필 식별자")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("비즈니스 프로필 식별자"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("비즈니스 프로필 이름"),
                                fieldWithPath("category").type(JsonFieldType.STRING).description("비즈니스 프로필 분류"),
                                fieldWithPath("place").type(JsonFieldType.STRING).description("비즈니스 프로필 장소"),
                                fieldWithPath("introduce").type(JsonFieldType.STRING).description("비즈니스 프로필 소개"),
                                fieldWithPath("contact").type(JsonFieldType.STRING).description("비즈니스 프로필 연락처"),
                                fieldWithPath("avatar").type(JsonFieldType.STRING).description("비즈니스 프로필 이미지 url(프로필 이미지가 없다면 null)")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스 프로필 수정 문서화")
    public void update() throws Exception {
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile avatar = new MockMultipartFile("avatar", "avatar.jpg", "image/jpg", is.readAllBytes());

        BusinessProfileResponse.IdAndName response = BusinessProfileResponse.IdAndName.builder().id(1L).name("네모 실험실").build();

        given(businessProfileService.update(any(), any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .fileUpload("/api/business/profile/{businessProfileId}", 1)
                .file(avatar)
                .param("name", "네모 실험실")
                .param("category", "실험실 분류")
                .param("place", "네모 대학교")
                .param("introduce", "네모 대학교 네모 실험실입니다!!")
                .param("contact", "010-1234-5678")
                .param("avatarChanged", "true")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .characterEncoding("UTF-8")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-profile-update",
                        pathParameters(
                                parameterWithName("businessProfileId").description("수정할 비즈니스 프로필 식별자")
                        ),
                        requestParameters(
                                parameterWithName("name").description("실험실 이름"),
                                parameterWithName("category").description("실험실 분류"),
                                parameterWithName("place").description("실험실 장소"),
                                parameterWithName("introduce").description("실험실 소개"),
                                parameterWithName("contact").description("실험실 연락처"),
                                parameterWithName("avatarChanged").description("비즈니스 프로필 이미지 수정되었다면 true 아니면 false")
                        ),
                        requestParts(
                                partWithName("avatar").description("비즈니스 프로필 이미지")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("수정된 비즈니스 프로필 식별자"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("수정된 비즈니스 프로필 이름")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스 프로필 삭제 문서화")
    public void delete() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.delete("/api/business/profile/{businessProfileId}", 1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-profile-delete",
                        pathParameters(
                                parameterWithName("businessProfileId").description("삭제할 비즈니스 프로필 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스 프로필 공유(초대) 문서화")
    public void shareBusinessProfile() throws Exception {
        BusinessProfileRequest.Share request = BusinessProfileRequest.Share.builder().nickname("세모").build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.post("/api/business/profile/{businessProfileId}/share", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request)));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-profile-share",
                        pathParameters(
                                parameterWithName("businessProfileId").description("비즈니스 프로필 식별자")
                        ), requestFields(
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("비즈니스프로필을 공유하려는 유저 닉네임")
                        )
                ));
    }
}