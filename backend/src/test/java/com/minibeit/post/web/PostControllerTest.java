package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.avatar.domain.Avatar;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.post.domain.*;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
import com.minibeit.post.service.PostService;
import com.minibeit.school.domain.School;
import com.minibeit.security.userdetails.CustomUserDetails;
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

@WebMvcTest(PostController.class)
class PostControllerTest extends MvcTest {
    @MockBean
    private PostService postService;

    private BusinessProfile businessProfile;
    private Post post1;
    private Post post2;
    private List<Post> postList = new ArrayList<>();
    private User user;
    private PostDoDate postDoDate1;
    private PostDoDate postDoDate2;

    @BeforeEach
    public void setup() {
        businessProfile = BusinessProfile.builder().id(1L).name("동그라미 실험실").contact("010-1234-1234").introduce("동그라미 실험실입니다.").place("고려대").avatar(Avatar.builder().id(1L).url("avatar url").build()).build();
        user = User.builder().id(1L).name("동그라미").build();
        post1 = Post.builder()
                .id(1L)
                .title("개발자는 하루에 커피를 몇 잔 마실까..")
                .content("실험실 세부사항")
                .place("고려대")
                .contact("010-1234-5786")
                .recruitPeople(10)
                .payment(Payment.CACHE)
                .paymentCache(50000)
                .recruitCondition(true)
                .recruitConditionDetail("운전면허 있는 사람만")
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
                .contact("010-1234-5786")
                .category("디자인")
                .recruitPeople(10)
                .payment(Payment.GOODS)
                .paymentGoods("커피 기프티콘")
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
        postDoDate1 = PostDoDate.builder().id(1L).full(false).post(post1).doDate(LocalDateTime.of(2021, 9, 5, 9, 30)).build();
        postDoDate2 = PostDoDate.builder().id(2L).full(true).post(post1).doDate(LocalDateTime.of(2021, 9, 5, 10, 30)).build();
    }


    @Test
    @DisplayName("게시물 정보입력(생성) 문서화")
    public void create() throws Exception {
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile files = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is.readAllBytes());
        PostResponse.OnlyId response = PostResponse.OnlyId.builder().id(1L).build();

        given(postService.createInfo(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(
                multipart("/api/post/info")
                        .file(files)
                        .param("title", "실험 제목")
                        .param("content", "아무나 올 수 있는 실험입니다.")
                        .param("place", "고려대 신공학관")
                        .param("contact", "010-1234-1234")
                        .param("category", "디자인")
                        .param("headcount", "10")
                        .param("payment", "CACHE")
                        .param("cache", "10000")
                        .param("goods", "보상")
                        .param("condition", "true")
                        .param("conditionDetail", "운전면허 있는 사람")
                        .param("doTime", "60")
                        .param("schoolId", "1")
                        .param("businessProfileId", "1")
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .characterEncoding("UTF-8")
        );

        results.andExpect(status().isCreated())
                .andDo(print())
                .andDo(document("post-create-info",
                        requestParameters(
                                parameterWithName("title").description("제목"),
                                parameterWithName("content").description("세부사항"),
                                parameterWithName("place").description("장소"),
                                parameterWithName("contact").description("연락처"),
                                parameterWithName("category").description("모집 분야"),
                                parameterWithName("headcount").description("모집인원수"),
                                parameterWithName("payment").description("지급 방법 (CACHE or GOODS) 지급 방법이 CACHE 인경우 cache만 보내고 goods는 안보내면 됩니다!"),
                                parameterWithName("cache").description("지급 방법이 CACHE인 경우 현금"),
                                parameterWithName("goods").description("지급 방법이 GOODS인 경우 보상"),
                                parameterWithName("condition").description("구인 조건이 있다면 true 아니면 false (구인 조건이 false라면 conditionDetail를 안보내면 됩니다! )"),
                                parameterWithName("conditionDetail").description("구인 조건이 true인 경우 구인 조건 세부내용"),
                                parameterWithName("doTime").description("실험 소요 시간"),
                                parameterWithName("schoolId").description("학교 식별자"),
                                parameterWithName("businessProfileId").description("게시물을 만드는 비즈니스 프로필 식별자")
                        ),
                        requestParts(
                                partWithName("files").description("게시물 첨부파일")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("생성된 게시물 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 날짜 정보입력 문서화")
    public void createDateRule() throws Exception {
        PostResponse.OnlyId response = PostResponse.OnlyId.build(post1);
        PostRequest.CreateDateRule request = PostRequest.CreateDateRule.builder()
                .startDate(LocalDateTime.of(2021, 9, 1, 3, 30))
                .endDate(LocalDateTime.of(2021, 9, 10, 3, 30))
                .doDateList(Collections.singletonList(LocalDateTime.of(2021, 9, 2, 3, 30)))
                .build();
        given(postService.createDateRule(any(), any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/{postId}/info/date", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isOk())
                .andDo(document("post-create-date",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자")
                        ),
                        requestFields(
                                fieldWithPath("startDate").type(JsonFieldType.STRING).description("모집 시작 날짜 및 시간"),
                                fieldWithPath("endDate").type(JsonFieldType.STRING).description("모집 마감 날짜 및 시간"),
                                fieldWithPath("doDateList[]").type(JsonFieldType.ARRAY).description("참여 가능 날짜(시간포함)")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("게시물 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("게시글 즐겨찾기 문서화")
    public void like() throws Exception {
        ResultActions result = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/{postId}/like", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
        );

        result.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-like",
                        pathParameters(
                                parameterWithName("postId").description("즐겨찾기 할 게시물 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 단건 조회 문서화")
    public void getOne() throws Exception {
        CustomUserDetails customUserDetails = CustomUserDetails.create(user);
        PostResponse.GetOne response = PostResponse.GetOne.build(post1, customUserDetails);

        given(postService.getOne(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.get("/api/post/{postId}", 1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-getOne",
                        pathParameters(
                                parameterWithName("postId").description("조회할 게시물 식별자")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("세부사항"),
                                fieldWithPath("place").type(JsonFieldType.STRING).description("장소"),
                                fieldWithPath("contact").type(JsonFieldType.STRING).description("연락처"),
                                fieldWithPath("payment").type(JsonFieldType.STRING).description("지급수단(CACHE or GOODS)"),
                                fieldWithPath("goods").description("지급 수단이 GOODS 인 경우 물품 보상"),
                                fieldWithPath("cache").description("지급 수단이 CACHE 인 경우 현금 보상"),
                                fieldWithPath("recruitCondition").type(JsonFieldType.BOOLEAN).description("구인조건이 있다면 true"),
                                fieldWithPath("recruitConditionDetail").description("구인조건이 있다면 구인조건 세부사항(없다면 null)"),
                                fieldWithPath("doTime").type(JsonFieldType.NUMBER).description("실험 소요 시간"),
                                fieldWithPath("schoolName").type(JsonFieldType.STRING).description("학교 이름"),
                                fieldWithPath("startDate").type(JsonFieldType.STRING).description("모집 시작 날짜"),
                                fieldWithPath("endDate").type(JsonFieldType.STRING).description("모집 마감 날짜"),
                                fieldWithPath("files[].url").type(JsonFieldType.STRING).description("파일"),
                                fieldWithPath("businessProfileInfo.id").type(JsonFieldType.NUMBER).description("게시물을 작성한 비즈니스 프로필 식별자"),
                                fieldWithPath("businessProfileInfo.name").type(JsonFieldType.STRING).description("게시물을 작성한 비즈니스 프로필 이름"),
                                fieldWithPath("businessProfileInfo.avatar").type(JsonFieldType.STRING).description("게시물을 작성한 비즈니스 프로필 이미지"),
                                fieldWithPath("businessProfileInfo.contact").type(JsonFieldType.STRING).description("게시물을 작성한 비즈니스 프로필 연락처"),
                                fieldWithPath("businessProfileInfo.address").type(JsonFieldType.STRING).description("게시물을 작성한 비즈니스 프로필 주소"),
                                fieldWithPath("businessProfileInfo.introduce").type(JsonFieldType.STRING).description("게시물을 작성한 비즈니스 프로필 소개"),
                                fieldWithPath("mine").type(JsonFieldType.BOOLEAN).description("게시물이 자신이 것인지")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 시작 시간 리스트 조회 문서화")
    public void getPostStartTimeList() throws Exception {
        List<PostResponse.GetPostStartTime> postStartTimeList = new ArrayList<>();
        PostResponse.GetPostStartTime startTime1 = PostResponse.GetPostStartTime.build(postDoDate1,post1);
        PostResponse.GetPostStartTime startTime2 = PostResponse.GetPostStartTime.build(postDoDate2,post1);
        postStartTimeList.add(startTime1);
        postStartTimeList.add(startTime2);
        given(postService.getPostStartTimeList(any(), any())).willReturn(postStartTimeList);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/{postId}/start", 1)
                .param("doDate", "2021-09-04"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-getStartTime-list",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자")),
                        requestParameters(
                                parameterWithName("doDate").description("게시물 실험 날짜")
                        ),
                        responseFields(
                                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("실험 시작 시간 식별자"),
                                fieldWithPath("[].startTime").type(JsonFieldType.STRING).description("실험 시작 시간"),
                                fieldWithPath("[].endTime").type(JsonFieldType.STRING).description("실험 끝나는 시간"),
                                fieldWithPath("[].full").type(JsonFieldType.BOOLEAN).description("모집인원이 꽉찼다면 true 아니면 false")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 목록 조회 문서화(학교 id,실험날짜 기준)")
    public void getList() throws Exception {
        Page<Post> postPage = new PageImpl<>(postList, PageRequest.of(1, 5), postList.size());
        given(postService.getList(any(), any(), any(), any())).willReturn(postPage);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/list/{schoolId}", 1)
                .param("page", "1")
                .param("size", "10")
                .param("paymentType", "CACHE")
                .param("doDate", "2021-09-04"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-getList",
                        pathParameters(
                                parameterWithName("schoolId").description("학교 식별자")),
                        requestParameters(
                                parameterWithName("page").description("조회할 페이지"),
                                parameterWithName("size").description("조회할 사이즈"),
                                parameterWithName("doDate").description("조회할 게시물 실험 날짜(doDate)"),
                                parameterWithName("paymentType").description("CACHE or GOODS (보내지 않을 경우 전체 조회가 됩니다!)")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("content[].title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("content[].payment").type(JsonFieldType.STRING).description("지급수단(CACHE or GOODS)"),
                                fieldWithPath("content[].goods").description("지급 수단이 GOODS 인 경우 물품 보상").optional(),
                                fieldWithPath("content[].cache").description("지급 수단이 CACHE 인 경우 현금 보상").optional(),
                                fieldWithPath("content[].recruitCondition").type(JsonFieldType.BOOLEAN).description("구인조건이 있다면 true"),
                                fieldWithPath("content[].recruitConditionDetail").description("구인조건이 있다면 구인조건 세부사항(없다면 null)").optional(),
                                fieldWithPath("content[].doTime").type(JsonFieldType.NUMBER).description("실험 소요 시간"),
                                fieldWithPath("totalElements").description("전체 개수"),
                                fieldWithPath("last").description("마지막 페이지인지 식별"),
                                fieldWithPath("totalPages").description("전체 페이지")
                        )
                ));
    }

    @Test
    @DisplayName("자신이 즐겨찾기한 게시물 목록 조회")
    public void getListByLike() throws Exception {
        Page<Post> postPage = new PageImpl<>(postList, PageRequest.of(1, 6), postList.size());
        given(postService.getListByLike(any(), any())).willReturn(postPage);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/like/list")
                .param("page", "1")
                .param("size", "6"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-getList-like",
                        requestParameters(
                                parameterWithName("page").description("조회할 페이지"),
                                parameterWithName("size").description("조회할 사이즈")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("content[].title").type(JsonFieldType.STRING).description("게시물 제목"),
                                fieldWithPath("totalElements").description("전체 개수"),
                                fieldWithPath("last").description("마지막 페이지인지 식별"),
                                fieldWithPath("totalPages").description("전체 페이지")
                        )
                ));
    }

    @Test
    @DisplayName("자신이 신청한 게시물 목록 조회 (status = WAIT, APPROVE)")
    public void getListByApplyIsApproveOrWait() throws Exception {
        List<PostResponse.GetMyApplyList> response = new ArrayList<>();
        PostResponse.GetMyApplyList approveAndWaitList1 = PostResponse.GetMyApplyList.builder()
                .id(1L)
                .contact("010-1232-4568")
                .postDoDateId(1L)
                .title("간단한 실험")
                .time(60)
                .doDate(LocalDateTime.of(2021, 9, 10, 9, 30))
                .recruitCondition(true)
                .status(ApplyStatus.APPROVE.name())
                .build();
        PostResponse.GetMyApplyList approveAndWaitList2 = PostResponse.GetMyApplyList.builder()
                .id(2L)
                .contact("010-1232-4568")
                .postDoDateId(2L)
                .title("복잡한 실험")
                .time(120)
                .doDate(LocalDateTime.of(2021, 9, 10, 12, 30))
                .recruitCondition(true)
                .status(ApplyStatus.WAIT.name())
                .build();
        response.add(approveAndWaitList1);
        response.add(approveAndWaitList2);
        Page<PostResponse.GetMyApplyList> postPage = new PageImpl<>(response, PageRequest.of(1, 6), postList.size());
        given(postService.getListByApplyIsApproveOrWait(any(), any())).willReturn(postPage);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/apply/approve/list")
                .param("page", "1")
                .param("size", "3"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-getList-apply-approveAndWait",
                        requestParameters(
                                parameterWithName("page").description("조회할 페이지"),
                                parameterWithName("size").description("조회할 사이즈")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("content[].title").type(JsonFieldType.STRING).description("게시물 제목"),
                                fieldWithPath("content[].contact").type(JsonFieldType.STRING).description("게시물 연락처"),
                                fieldWithPath("content[].recruitCondition").type(JsonFieldType.BOOLEAN).description("게시물 조건 유무"),
                                fieldWithPath("content[].doDate").type(JsonFieldType.STRING).description("게시물 실험 날짜"),
                                fieldWithPath("content[].startTime").type(JsonFieldType.STRING).description("게시물 실험 시작 시간"),
                                fieldWithPath("content[].endTime").type(JsonFieldType.STRING).description("게시물 실험 끝나는 시간"),
                                fieldWithPath("content[].status").type(JsonFieldType.STRING).description("게시물 지원 상태(WAIT or APPROVE or REJECT)"),
                                fieldWithPath("totalElements").description("전체 개수"),
                                fieldWithPath("last").description("마지막 페이지인지 식별"),
                                fieldWithPath("totalPages").description("전체 페이지")
                        )
                ));
    }

    @Test
    @DisplayName("자신이 후기 작성할 수 있는 게시물 목록 조회 (status = APPROVE, finish=true)")
    public void getListByApplyAndFinishedWithoutReview() throws Exception {
        List<PostResponse.GetMyApplyList> response = new ArrayList<>();
        PostResponse.GetMyApplyList approveAndWaitList1 = PostResponse.GetMyApplyList.builder()
                .id(1L)
                .contact("010-1232-4568")
                .title("간단한 실험")
                .time(60)
                .doDate(LocalDateTime.of(2021, 9, 10, 9, 30))
                .recruitCondition(true)
                .postDoDateId(1L)
                .status(ApplyStatus.APPROVE.name())
                .build();
        PostResponse.GetMyApplyList approveAndWaitList2 = PostResponse.GetMyApplyList.builder()
                .id(2L)
                .contact("010-1232-4568")
                .title("복잡한 실험")
                .time(120)
                .doDate(LocalDateTime.of(2021, 9, 10, 12, 30))
                .recruitCondition(true)
                .postDoDateId(2L)
                .status(ApplyStatus.APPROVE.name())
                .build();
        response.add(approveAndWaitList1);
        response.add(approveAndWaitList2);
        Page<PostResponse.GetMyApplyList> postPage = new PageImpl<>(response, PageRequest.of(1, 6), postList.size());
        given(postService.getListByApplyAndMyFinishedWithoutReview(any(), any())).willReturn(postPage);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/writable/review/list")
                .param("page", "1")
                .param("size", "3"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-getList-apply-approve-finish",
                        requestParameters(
                                parameterWithName("page").description("조회할 페이지"),
                                parameterWithName("size").description("조회할 사이즈")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("content[].title").type(JsonFieldType.STRING).description("게시물 제목"),
                                fieldWithPath("content[].contact").type(JsonFieldType.STRING).description("게시물 연락처"),
                                fieldWithPath("content[].recruitCondition").type(JsonFieldType.BOOLEAN).description("게시물 조건 유무"),
                                fieldWithPath("content[].doDate").type(JsonFieldType.STRING).description("게시물 실험 날짜"),
                                fieldWithPath("content[].startTime").type(JsonFieldType.STRING).description("게시물 실험 시작 시간"),
                                fieldWithPath("content[].endTime").type(JsonFieldType.STRING).description("게시물 실험 끝나는 시간"),
                                fieldWithPath("content[].status").type(JsonFieldType.STRING).description("게시물 지원 상태(WAIT or APPROVE or REJECT)"),
                                fieldWithPath("totalElements").description("전체 개수"),
                                fieldWithPath("last").description("마지막 페이지인지 식별"),
                                fieldWithPath("totalPages").description("전체 페이지")
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
                                parameterWithName("postId").description("삭제할 게시물 프로필 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 모집상태 변화 문서화")
    public void completed() throws Exception{
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.post("/api/post/{postId}/completed", 1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-recruitment-Completed",
                        pathParameters(
                                parameterWithName("postId").description("모집완료 할 게시물 식별자")
                        )
                ));
    }
}