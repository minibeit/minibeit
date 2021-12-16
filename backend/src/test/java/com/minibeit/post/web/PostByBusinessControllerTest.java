package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.avatar.domain.Avatar;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.post.domain.PostFile;
import com.minibeit.post.dto.PostDto;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.fileUpload;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
        PostResponse.OnlyId response = PostResponse.OnlyId.builder().id(1L).build();

        given(postByBusinessService.createInfo(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(post("/api/post/info")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .characterEncoding("UTF-8")
        );

        results.andExpect(status().isCreated())
                .andDo(print())
                .andDo(document("post-create-info",
                        requestFields(
                                fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
                                fieldWithPath("place").type(JsonFieldType.STRING).description("장소"),
                                fieldWithPath("placeDetail").type(JsonFieldType.STRING).description("장소 세부 사항"),
                                fieldWithPath("contact").type(JsonFieldType.STRING).description("연락처"),
                                fieldWithPath("category").type(JsonFieldType.STRING).description("분야"),
                                fieldWithPath("headcount").type(JsonFieldType.NUMBER).description("인원수"),
                                fieldWithPath("payment").type(JsonFieldType.STRING).description("CACHE or GOODS"),
                                fieldWithPath("cache").description("현금 payment가 GOODS라면 null"),
                                fieldWithPath("goods").description("물품 payment가 CACHE라면 null"),
                                fieldWithPath("paymentDetail").type(JsonFieldType.STRING).description("지급 방법 및 세부사항"),
                                fieldWithPath("condition").type(JsonFieldType.BOOLEAN).description("모집조건이 있다면 true"),
                                fieldWithPath("conditionDetail").description("모집 조건 세부사항 조건 1개당 | 로 구분지어주세요!"),
                                fieldWithPath("doTime").type(JsonFieldType.NUMBER).description("게시물 실험 소요시간"),
                                fieldWithPath("schoolId").type(JsonFieldType.NUMBER).description("학교 식별자"),
                                fieldWithPath("businessProfileId").type(JsonFieldType.NUMBER).description("비즈니스 프로필 식별자"),
                                fieldWithPath("startDate").type(JsonFieldType.STRING).description("모집 시작 날짜 및 시간 ex)2021-09-27T09:30"),
                                fieldWithPath("endDate").type(JsonFieldType.STRING).description("모집 마감 날짜 및 시간 ex)2021-09-27T09:30"),
                                fieldWithPath("doDateList[].doDate").type(JsonFieldType.STRING).description("참여 가능 날짜(시간포함) ex)2021-09-27T09:30")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("생성된 게시물 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 파일 추가")
    public void addFiles() throws Exception {
        InputStream is1 = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile files = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is1.readAllBytes());
        InputStream is2 = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile thumbnail = new MockMultipartFile("thumbnail", "avatar.jpg", "image/jpg", is2.readAllBytes());

        PostResponse.OnlyId response = PostResponse.OnlyId.builder().id(1L).build();

        given(postByBusinessService.addFiles(any(), any(), any())).willReturn(response);

        ResultActions results = mvc.perform(
                fileUpload("/api/post/{postId}/files", 1)
                        .file(files)
                        .file(thumbnail)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .characterEncoding("UTF-8")
        );

        results.andExpect(status().isCreated())
                .andDo(document("post-add-files",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자")
                        ),
                        requestParts(
                                partWithName("files").description("게시물에 추가할 파일(썸네일 제외)"),
                                partWithName("thumbnail").description("게시물에 추가할 썸네일")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("게시물 식별자")
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
    @DisplayName("게시물 실험이 있는 날짜 목록 조회(년,월 기준) 문서화")
    public void getDoDateList() throws Exception {
        Set<LocalDate> localDates = new HashSet<>();
        localDates.add(LocalDate.of(2021, 9, 21));
        localDates.add(LocalDate.of(2021, 9, 22));
        localDates.add(LocalDate.of(2021, 9, 23));
        PostResponse.DoDateList response = PostResponse.DoDateList.builder().doDateList(localDates).build();

        given(postByBusinessService.getDoDateListByYearMonth(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/{postId}/dates", 1)
                .param("yearMonth", "2021-09"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-doDate-list",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자")
                        ),
                        requestParameters(
                                parameterWithName("yearMonth").description("조회할 날짜")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.doDateList[]").type(JsonFieldType.ARRAY).description("실험 있는 날짜")
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