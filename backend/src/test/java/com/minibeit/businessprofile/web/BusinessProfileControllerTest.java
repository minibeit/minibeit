package com.minibeit.businessprofile.web;


import com.minibeit.MvcTest;
import com.minibeit.avatar.domain.Avatar;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.BusinessProfileService;
import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.PostFile;
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
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.*;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BusinessProfileController.class)
class BusinessProfileControllerTest extends MvcTest {
    @MockBean
    private BusinessProfileService businessProfileService;

    private BusinessProfile businessProfile;
    private User user1;
    private Post post1;

    @BeforeEach
    public void setup() {

        user1 = User.builder()
                .id(1L)
                .name("홍길동")
                .nickname("테스트")
                .birth(LocalDate.of(1997, 3, 6))
                .avatar(Avatar.builder().id(2L).url("profile image url").build())
                .gender(Gender.MALE)
                .job("학생")
                .oauthId("1")
                .phoneNum("010-1234-4567")
                .provider(SignupProvider.MINIBEIT)
                .role(Role.USER)
                .school(School.builder().id(1L).name("고려대").build())
                .build();

        businessProfile = BusinessProfile.builder()
                .id(1L)
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .introduce("고려대 동그라미 실험실 입니다.")
                .admin(user1)
                .avatar(Avatar.builder().id(1L).url("profile image url").build())
                .build();

        businessProfile.setCreatedBy(user1);

        post1 = Post.builder()
                .id(1L)
                .title("동그라미 실험실")
                .content("실험실 세부사항")
                .place("고려대")
                .contact("010-1234-5786")
                .recruitPeople(10)
                .payment(Payment.CACHE)
                .paymentCache(50000)
                .recruitCondition(true)
                .recruitConditionDetail("운전면허 있는 사람만")
                .doTime(120)
                .startDate(LocalDateTime.of(2021, 9, 3, 9, 30))
                .endDate(LocalDateTime.of(2021, 9, 10, 10, 0))
                .school(School.builder().id(1L).name("고려대학교").build())
                .businessProfile(businessProfile)
                .postDoDateList(Collections.singletonList(PostDoDate.builder().id(1L).doDate(LocalDateTime.of(2021, 9, 4, 9, 30)).build()))
                .postFileList(Collections.singletonList(PostFile.builder().id(1L).url("profile image url").build()))
                .build();
        post1.setCreatedBy(user1);
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
        List<BusinessProfileResponse.GetList> getLists = new ArrayList<>();
        BusinessProfileResponse.GetList idAndName1 = BusinessProfileResponse.GetList.builder().id(1L).name("동그라미 실험실").avatar("profile image url").build();
        BusinessProfileResponse.GetList idAndName2 = BusinessProfileResponse.GetList.builder().id(2L).name("세모 실험실").avatar("profile image url").build();
        BusinessProfileResponse.GetList idAndName3 = BusinessProfileResponse.GetList.builder().id(3L).name("네모 실험실").avatar("profile image url").build();
        getLists.add(idAndName1);
        getLists.add(idAndName2);
        getLists.add(idAndName3);

        given(businessProfileService.getListIsMine(any())).willReturn(getLists);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.get("/api/business/profile/list/{userId}", 1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-profile-list-mine",
                        pathParameters(
                                parameterWithName("userId").description("조회할 유저 식별자")
                        ),
                        responseFields(
                                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("비즈니스 프로필 식별자"),
                                fieldWithPath("[].name").type(JsonFieldType.STRING).description("비즈니스 프로필 이름"),
                                fieldWithPath("[].avatar").type(JsonFieldType.STRING).description("비즈니스 프로필 이미지 url")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스 프로필 단건 조회 문서화")
    public void getOne() throws Exception {


        BusinessProfileResponse.GetOne response = BusinessProfileResponse.GetOne.build(businessProfile, 3, user1);

        given(businessProfileService.getOne(any(), any())).willReturn(response);

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
                                fieldWithPath("principalInvestigator").type(JsonFieldType.STRING).description("비즈니스 프로필 책임자"),
                                fieldWithPath("place").type(JsonFieldType.STRING).description("비즈니스 프로필 장소"),
                                fieldWithPath("introduce").type(JsonFieldType.STRING).description("비즈니스 프로필 소개"),
                                fieldWithPath("contact").type(JsonFieldType.STRING).description("비즈니스 프로필 연락처"),
                                fieldWithPath("mine").type(JsonFieldType.BOOLEAN).description("비즈니스 프로필 자신의 것인지 확인"),
                                fieldWithPath("numberOfEmployees").type(JsonFieldType.NUMBER).description("비즈니스 프로필 소속 인원 수"),
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

    @Test
    @DisplayName("권한 양도 문서화")
    public void transferOfAuthority() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.post("/api/business/profile/{businessProfileId}/change/{userId}", 1, 1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-profile-change-admin",
                        pathParameters(
                                parameterWithName("businessProfileId").description("비즈니스 프로필 식별자"),
                                parameterWithName("userId").description("권한을 받을 유저의 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스 프로필 공유 삭제 문서화")
    public void cancelShare() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.delete("/api/business/profile/{businessProfileId}/expel/{userId}", 1, 2));
        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-profile-share-cancel",
                        pathParameters(
                                parameterWithName("businessProfileId").description("비즈니스 프로필 식별자"),
                                parameterWithName("userId").description("삭제할 유저의 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("생성한 실험 리스트 문서화")
    public void postList() throws Exception{

        List<Post> postList = new ArrayList<>();
        postList.add(post1);
        List<BusinessProfileResponse.PostList> collect = postList.stream().map(BusinessProfileResponse.PostList::build).collect(Collectors.toList());
        PageDto pageDto = new PageDto(1,5);
        pageDto.setSort("recruiting");

        Page<BusinessProfileResponse.PostList> postPage = new PageImpl<>(collect, pageDto.of(pageDto.getSort()), collect.size());

        given(businessProfileService.getPostList(any(), any())).willReturn(postPage);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/business/profile/{businessProfileId}/posts",1)
                .param("page", "1")
                .param("size", "10")
                .param("sort", "recruiting"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("business-profile-postList",
                        pathParameters(
                                parameterWithName("businessProfileId").description("비즈니스 프로필 식별자")
                        ),
                        requestParameters(
                                parameterWithName("page").description("조회할 페이지"),
                                parameterWithName("size").description("조회할 사이즈"),
                                parameterWithName("sort").description("recruiting: 게시물 모집중 + 최신 생성 순서, default: 최신순")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("content[].title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("content[].numberOfPostLike").type(JsonFieldType.NUMBER).description("즐겨찾기 수"),
                                fieldWithPath("totalElements").description("전체 개수"),
                                fieldWithPath("last").description("마지막 페이지인지 식별"),
                                fieldWithPath("totalPages").description("전체 페이지")
                        )
                ));
    }
}