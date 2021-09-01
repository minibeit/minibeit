package com.minibeit.businessprofile.web;

import com.minibeit.MvcTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.service.BusinessProfileService;
import com.minibeit.file.domain.File;
import com.minibeit.school.domain.School;
import com.minibeit.user.domain.Gender;
import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserBusinessProfileController.class)
public class UserBusinessProfileControllerTest extends MvcTest {

    @MockBean
    private BusinessProfileService businessProfileService;

    private BusinessProfile businessProfile;
    private User user1;

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
        user1 = User.builder()
                .id(1L)
                .name("홍길동")
                .nickname("테스트")
                .age(20)
                .avatar(File.builder().id(2L).url("profile image url").build())
                .gender(Gender.MALE)
                .job("학생")
                .oauthId("1")
                .phoneNum("010-1234-4567")
                .provider(SignupProvider.MINIBEIT)
                .role(Role.USER)
                .school(School.builder().id(1L).name("고려대").build())
                .build();

    }

    @Test
    @DisplayName("비즈니스 프로필 공유 삭제 문서화")
    public void cancelShare() throws Exception {
        BusinessProfileRequest.Share request = BusinessProfileRequest.Share.builder().nickname("세모").build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.delete("/api/business/profile/{businessProfileId}/share", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request)));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-profile-share-cancel",
                        pathParameters(
                                parameterWithName("businessProfileId").description("비즈니스 프로필 식별자")
                        ), requestFields(
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("비즈니스프로필에서 공유 삭제하려는 유저 닉네임")
                        )
                ));
    }
}
