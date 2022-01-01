package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.file.domain.Avatar;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.PostFile;
import com.minibeit.post.service.dto.PostDto;
import com.minibeit.post.service.dto.PostRequest;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.post.service.PostByBusinessService;
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

@DisplayName("게시물 by 비즈니스 API 문서화")
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
        businessProfile = BusinessProfile.builder().id(1L).name("동그라미 실험실").contact("010-1234-1234").place("고려대").avatar(Avatar.builder().id(1L).url("avatar url").build()).build();
        user = User.builder().id(1L).name("동그라미").build();
        post1 = Post.builder()
                .id(1L)
                .title("개발자는 하루에 커피를 몇 잔 마실까..")
                .content("실험실 세부사항")
                .place("고려대")
                .placeDetail("신공학관 123호")
                .contact("010-1234-5786")
                .recruitPeople(10)
                .payment(Payment.CACHE)
                .paymentCache(50000)
                .thumbnail("thumbnail url")
                .recruitCondition(true)
                .recruitConditionDetail("운전면허 있는 사람만")
                .paymentDetail("계좌이체로 지급")
                .doTime(120)
                .category("디자인")
                .startDate(LocalDateTime.of(2021, 9, 3, 9, 30))
                .endDate(LocalDateTime.of(2021, 9, 10, 10, 0))
                .school(School.builder().id(1L).name("고려대학교").build())
                .businessProfile(businessProfile)
                .postDoDateList(Collections.singletonList(PostDoDate.builder().id(1L).doDate(LocalDateTime.of(2021, 9, 4, 9, 30)).build()))
                .postFileList(Collections.singletonList(PostFile.builder().id(1L).url("profile image url").build()))
                .build();
        post1.setCreatedBy(user);

        post2 = Post.builder()
                .id(2L)
                .title("코로나로 인한 대학생 우울증 실험")
                .content("실험실 세부사항")
                .place("고려대")
                .placeDetail("신공학관 123호")
                .contact("010-1234-5786")
                .category("디자인")
                .thumbnail("thumbnail url")
                .recruitPeople(10)
                .payment(Payment.GOODS)
                .paymentGoods("커피 기프티콘")
                .paymentDetail("핸드폰으로 전송")
                .recruitCondition(false)
                .doTime(120)
                .startDate(LocalDateTime.of(2021, 9, 3, 9, 30))
                .endDate(LocalDateTime.of(2021, 9, 10, 10, 0))
                .school(School.builder().id(1L).name("고려대학교").build())
                .businessProfile(businessProfile)
                .postDoDateList(Collections.singletonList(PostDoDate.builder().id(1L).doDate(LocalDateTime.of(2021, 9, 4, 9, 30)).build()))
                .postFileList(Collections.singletonList(PostFile.builder().id(1L).url("profile image url").build()))
                .build();
        post2.setCreatedBy(user);

        postList.add(post1);
        postList.add(post2);
    }

    @Test
    @DisplayName("게시물 정보입력(생성) 문서화")
    public void createInfo() throws Exception {
        InputStream is1 = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile files = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is1.readAllBytes());
        InputStream is2 = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile thumbnail = new MockMultipartFile("thumbnail", "avatar.jpg", "image/jpg", is2.readAllBytes());

        PostRequest.CreateInfo request = PostRequest.CreateInfo.builder()
                .title("커피를 얼마나 마셔야 잠을 못잘까~?")
                .content("실험 내용")
                .place("고려대학교 연구실")
                .placeDetail("123호")
                .contact("010-1234-1234")
                .category("미디어")
                .headcount(10)
                .payment(Payment.CACHE)
                .cache(10000)
                .goods(null)
                .paymentDetail("계좌로 지급해드립니다.")
                .condition(true)
                .conditionDetail("커피 많이 드시는 사람|")
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
                                partWithName("postInfo").description("게시물 정보 JSON"),
                                partWithName("files").description("게시물에 추가할 파일 (썸네일 제외)"),
                                partWithName("thumbnail").description("게시물 썸네일")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("생성된 게시물 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 모집상태 변화 문서화")
    public void completed() throws Exception {
        PostRequest.RejectComment request = PostRequest.RejectComment.builder().rejectComment("모집완료 되었습니다.").build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/{postId}/completed", 1)
                .content(objectMapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-recruitment-Completed",
                        pathParameters(
                                parameterWithName("postId").description("모집완료 할 게시물 식별자")
                        ),
                        requestFields(
                                fieldWithPath("rejectComment").type(JsonFieldType.STRING).description("반려 사유")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 세부내용 수정")
    public void updateContent() throws Exception {
        PostRequest.UpdateContent request = PostRequest.UpdateContent.builder()
                .updatedContent("수정된 내용 추가")
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
                                parameterWithName("postId").description("게시물 식별자")
                        ),
                        requestFields(
                                fieldWithPath("updatedContent").type(JsonFieldType.STRING).description("수정된 내용")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("게시물 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("비즈니스 프로필로 생성한 실험 리스트 문서화")
    public void getListByBusinessProfile() throws Exception {
        Page<Post> postPage = new PageImpl<>(postList, PageRequest.of(1, 6), postList.size());
        Page<PostResponse.GetListByBusinessProfile> response = postPage.map(PostResponse.GetListByBusinessProfile::build);

        given(postByBusinessService.getListByBusinessProfile(any(), any(), any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/posts/business/profile/{businessProfileId}", 1)
                .param("page", "1")
                .param("size", "5")
                .param("status", "RECRUIT"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-getList-business-profile",
                        pathParameters(
                                parameterWithName("businessProfileId").description("비즈니스 프로필 식별자")
                        ),
                        requestParameters(
                                parameterWithName("page").description("조회할 페이지"),
                                parameterWithName("size").description("조회할 사이즈"),
                                parameterWithName("status").description("RECRUIT(모집중) or COMPLETE(모집완료)")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.content[].id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("data.content[].title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("data.content[].likes").type(JsonFieldType.NUMBER).description("즐겨찾기 수"),
                                fieldWithPath("data.content[].address").type(JsonFieldType.STRING).description("게시물 주소"),
                                fieldWithPath("data.content[].addressDetail").type(JsonFieldType.STRING).description("게시물 상세 주소"),
                                fieldWithPath("data.content[].startDate").type(JsonFieldType.STRING).description("게시물 시작 날짜"),
                                fieldWithPath("data.content[].endDate").type(JsonFieldType.STRING).description("게시물 마감 날짜"),
                                fieldWithPath("data.content[].headcount").type(JsonFieldType.NUMBER).description("게시물 모집인원"),
                                fieldWithPath("data.content[].thumbnail").type(JsonFieldType.STRING).description("게시물 썸네일 없다면 null"),
                                fieldWithPath("data.content[].businessName").type(JsonFieldType.STRING).description("게시물 작성한 비즈니스 프로필 이름"),
                                fieldWithPath("data.totalElements").description("전체 개수"),
                                fieldWithPath("data.last").description("마지막 페이지인지 식별"),
                                fieldWithPath("data.totalPages").description("전체 페이지")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 삭제 문서화")
    public void deleteOne() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.delete("/api/post/{postId}", 1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-deleteOne",
                        pathParameters(
                                parameterWithName("postId").description("삭제할 게시물 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }
}