package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.file.domain.Avatar;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.PostFile;
import com.minibeit.post.service.PostByBusinessService;
import com.minibeit.post.service.dto.PostDto;
import com.minibeit.post.service.dto.PostRequest;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.school.domain.School;
import com.minibeit.user.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("????????? by ???????????? API ?????????")
@WebMvcTest(PostByBusinessController.class)
class PostByBusinessControllerTest extends MvcTest {
    @MockBean
    private PostByBusinessService postByBusinessService;
    private BusinessProfile businessProfile;
    private Post post1;
    private Post post2;
    private List<Post> postList = new ArrayList<>();
    private User user;

    @BeforeEach
    public void setup() {
        businessProfile = BusinessProfile.builder().id(1L).name("???????????? ?????????").contact("010-1234-1234").place("?????????").avatar(Avatar.builder().id(1L).url("avatar url").build()).build();
        user = User.builder().id(1L).name("????????????").build();
        post1 = Post.builder()
                .id(1L)
                .title("???????????? ????????? ????????? ??? ??? ?????????..")
                .content("????????? ????????????")
                .place("?????????")
                .placeDetail("???????????? 123???")
                .contact("010-1234-5786")
                .recruitPeople(10)
                .payment(Payment.CACHE)
                .paymentCache(50000)
                .thumbnail("thumbnail url")
                .recruitCondition(true)
                .recruitConditionDetail("???????????? ?????? ?????????")
                .paymentDetail("??????????????? ??????")
                .doTime(120)
                .category("?????????")
                .startDate(LocalDateTime.of(2021, 9, 3, 9, 30))
                .endDate(LocalDateTime.of(2021, 9, 10, 10, 0))
                .school(School.builder().id(1L).name("???????????????").build())
                .businessProfile(businessProfile)
                .postDoDateList(Collections.singletonList(PostDoDate.builder().id(1L).doDate(LocalDateTime.of(2021, 9, 4, 9, 30)).build()))
                .postFileList(Collections.singletonList(PostFile.builder().id(1L).url("profile image url").build()))
                .build();
        post1.setCreatedBy(user);

        post2 = Post.builder()
                .id(2L)
                .title("???????????? ?????? ????????? ????????? ??????")
                .content("????????? ????????????")
                .place("?????????")
                .placeDetail("???????????? 123???")
                .contact("010-1234-5786")
                .category("?????????")
                .thumbnail("thumbnail url")
                .recruitPeople(10)
                .payment(Payment.GOODS)
                .paymentGoods("?????? ????????????")
                .paymentDetail("??????????????? ??????")
                .recruitCondition(false)
                .doTime(120)
                .startDate(LocalDateTime.of(2021, 9, 3, 9, 30))
                .endDate(LocalDateTime.of(2021, 9, 10, 10, 0))
                .school(School.builder().id(1L).name("???????????????").build())
                .businessProfile(businessProfile)
                .postDoDateList(Collections.singletonList(PostDoDate.builder().id(1L).doDate(LocalDateTime.of(2021, 9, 4, 9, 30)).build()))
                .postFileList(Collections.singletonList(PostFile.builder().id(1L).url("profile image url").build()))
                .build();
        post2.setCreatedBy(user);

        postList.add(post1);
        postList.add(post2);
    }

    @Test
    @DisplayName("????????? ????????????(??????) ?????????")
    public void createInfo() throws Exception {
        InputStream is1 = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile files = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is1.readAllBytes());
        InputStream is2 = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile thumbnail = new MockMultipartFile("thumbnail", "avatar.jpg", "image/jpg", is2.readAllBytes());

        PostRequest.CreateInfo request = PostRequest.CreateInfo.builder()
                .title("????????? ????????? ????????? ?????? ?????????~?")
                .content("?????? ??????")
                .place("??????????????? ?????????")
                .placeDetail("123???")
                .contact("010-1234-1234")
                .category("?????????")
                .headcount(10)
                .payment(Payment.CACHE)
                .cache(10000)
                .goods(null)
                .paymentDetail("????????? ?????????????????????.")
                .condition(true)
                .conditionDetail("?????? ?????? ????????? ??????|")
                .doTime(60)
                .schoolId(1L)
                .businessProfileId(1L)
                .startDate(LocalDateTime.of(2021, 9, 26, 17, 30))
                .endDate(LocalDateTime.of(2021, 10, 2, 17, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 26, 17, 30)).build()))
                .build();
        String content = objectMapper.writeValueAsString(request);
        MockMultipartFile postInfoRequest = new MockMultipartFile("postInfo", "", "application/json", content.getBytes());

        PostResponse.OnlyId response = PostResponse.OnlyId.builder().id(1L).build();

        given(postByBusinessService.create(any(), any(), any(), any())).willReturn(response);

        ResultActions results = mvc.perform(multipart("/api/post")
                .file(postInfoRequest)
                .file(files)
                .file(thumbnail)
                .contentType(MediaType.MULTIPART_MIXED)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
        );

        results.andExpect(status().isCreated())
                .andDo(print())
                .andDo(document("post-create-info",
                        requestParts(
                                partWithName("postInfo").description("????????? ?????? JSON"),
                                partWithName("files").description("???????????? ????????? ?????? (????????? ??????)"),
                                partWithName("thumbnail").description("????????? ?????????")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api ????????? ??????????????? true"),
                                fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("????????? ????????? ?????????")
                        )
                ));
    }

    @Test
    @DisplayName("????????? ???????????? ?????? ?????????")
    public void completed() throws Exception {
        PostRequest.RejectComment request = PostRequest.RejectComment.builder().rejectComment("???????????? ???????????????.").build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/{postId}/completed", 1)
                .content(objectMapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-recruitment-Completed",
                        pathParameters(
                                parameterWithName("postId").description("???????????? ??? ????????? ?????????")
                        ),
                        requestFields(
                                fieldWithPath("rejectComment").type(JsonFieldType.STRING).description("?????? ??????")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api ????????? ??????????????? true"),
                                fieldWithPath("data").description("data ????????? null")
                        )
                ));
    }

    @Test
    @DisplayName("????????? ???????????? ??????")
    public void updateContent() throws Exception {
        PostRequest.UpdateContent request = PostRequest.UpdateContent.builder()
                .updatedContent("????????? ?????? ??????")
                .build();
        PostResponse.OnlyId response = PostResponse.OnlyId.builder().id(1L).build();

        given(postByBusinessService.updateContent(any(), any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .put("/api/post/{postId}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .characterEncoding("UTF-8")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-update-content",
                        pathParameters(
                                parameterWithName("postId").description("????????? ?????????")
                        ),
                        requestFields(
                                fieldWithPath("updatedContent").type(JsonFieldType.STRING).description("????????? ??????")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api ????????? ??????????????? true"),
                                fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("????????? ?????????")
                        )
                ));
    }

    @Test
    @DisplayName("???????????? ???????????? ????????? ?????? ????????? ?????????")
    public void getListByBusinessProfile() throws Exception {
        Page<Post> postPage = new PageImpl<>(postList, PageRequest.of(1, 6), postList.size());
        Page<PostResponse.GetListByBusinessProfile> response = postPage.map(PostResponse.GetListByBusinessProfile::build);

        given(postByBusinessService.getListByBusinessProfile(any(), any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/posts/business/profile/{businessProfileId}", 1)
                .param("page", "1")
                .param("size", "5")
                .param("status", "RECRUIT"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-getList-business-profile",
                        pathParameters(
                                parameterWithName("businessProfileId").description("???????????? ????????? ?????????")
                        ),
                        requestParameters(
                                parameterWithName("page").description("????????? ?????????"),
                                parameterWithName("size").description("????????? ?????????"),
                                parameterWithName("status").description("RECRUIT(?????????) or COMPLETE(????????????)")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api ????????? ??????????????? true"),
                                fieldWithPath("data.content[].id").type(JsonFieldType.NUMBER).description("????????? ?????????"),
                                fieldWithPath("data.content[].title").type(JsonFieldType.STRING).description("??????"),
                                fieldWithPath("data.content[].likes").type(JsonFieldType.NUMBER).description("???????????? ???"),
                                fieldWithPath("data.content[].address").type(JsonFieldType.STRING).description("????????? ??????"),
                                fieldWithPath("data.content[].addressDetail").type(JsonFieldType.STRING).description("????????? ?????? ??????"),
                                fieldWithPath("data.content[].startDate").type(JsonFieldType.STRING).description("????????? ?????? ??????"),
                                fieldWithPath("data.content[].endDate").type(JsonFieldType.STRING).description("????????? ?????? ??????"),
                                fieldWithPath("data.content[].headcount").type(JsonFieldType.NUMBER).description("????????? ????????????"),
                                fieldWithPath("data.content[].thumbnail").type(JsonFieldType.STRING).description("????????? ????????? ????????? null"),
                                fieldWithPath("data.content[].businessName").type(JsonFieldType.STRING).description("????????? ????????? ???????????? ????????? ??????"),
                                fieldWithPath("data.totalElements").description("?????? ??????"),
                                fieldWithPath("data.last").description("????????? ??????????????? ??????"),
                                fieldWithPath("data.totalPages").description("?????? ?????????")
                        )
                ));
    }


    @Test
    @DisplayName("???????????? ????????? ?????? ?????? ?????????")
    public void getBusinessStatus() throws Exception {
        PostResponse.GetBusinessStatus response = PostResponse.GetBusinessStatus.build(null, 1L, 23L);

        given(postByBusinessService.getCountBusinessCompletePostAndReview(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/business/profile/{businessProfileId}/status", 1)
                .param("status", "RECRUIT")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-business-status",
                        pathParameters(
                                parameterWithName("businessProfileId").description("???????????? ????????? ?????????")
                        ),
                        requestParameters(
                                parameterWithName("status").description("RECRUIT(?????????), COMPLETE(??????), REVIEW(??????)")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api ????????? ??????????????? true"),
                                fieldWithPath("data.recruit").description("????????? ????????? ??????"),
                                fieldWithPath("data.complete").type(JsonFieldType.NUMBER).description("????????? ????????? ??????"),
                                fieldWithPath("data.review").type(JsonFieldType.NUMBER).description("?????? ??????")
                        )
                ));
    }

    @Test
    @DisplayName("????????? ?????? ?????????")
    public void deleteOne() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.delete("/api/post/{postId}", 1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-deleteOne",
                        pathParameters(
                                parameterWithName("postId").description("????????? ????????? ?????????")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api ????????? ??????????????? true"),
                                fieldWithPath("data").description("data ????????? null")
                        )
                ));
    }
}