package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.avatar.domain.Avatar;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.*;
import com.minibeit.post.dto.PostDto;
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
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.fileUpload;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
        businessProfile = BusinessProfile.builder().id(1L).name("동그라미 실험실").contact("010-1234-1234").place("고려대").avatar(Avatar.builder().id(1L).url("avatar url").build()).build();
        user = User.builder().id(1L).name("동그라미").build();
        post1 = Post.builder()
                .id(1L)
                .title("개발자는 하루에 커피를 몇 잔 마실까..")
                .content("실험실 세부사항")
                .updatedContent("실험실 세부사항 수정")
                .place("고려대")
                .contact("010-1234-5786")
                .recruitPeople(10)
                .payment(Payment.CACHE)
                .paymentCache(50000)
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
                .contact("010-1234-5786")
                .category("디자인")
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
        postDoDate1 = PostDoDate.builder().id(1L).full(false).post(post1).doDate(LocalDateTime.of(2021, 9, 5, 9, 30)).build();
        postDoDate2 = PostDoDate.builder().id(2L).full(true).post(post1).doDate(LocalDateTime.of(2021, 9, 5, 10, 30)).build();
    }

    @Test
    @DisplayName("게시물 정보입력(생성) 문서화")
    public void createInfo() throws Exception {
        PostRequest.CreateInfo request = PostRequest.CreateInfo.builder()
                .title("커피를 얼마나 마셔야 잠을 못잘까~?")
                .content("실험 내용")
                .place("고려대학교 연구실")
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
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().groupId(1).doDate(LocalDateTime.of(2021, 9, 26, 17, 30)).build()))
                .build();
        PostResponse.OnlyId response = PostResponse.OnlyId.builder().id(1L).build();

        given(postService.createInfo(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(post("/api/post/info")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .characterEncoding("UTF-8")
        );

        results.andExpect(status().isCreated())
                .andDo(print())
                .andDo(document("post-create-info",
                        requestFields(
                                fieldWithPath("title").type(JsonFieldType.STRING).description("모집 시작 날짜 및 시간"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("모집 마감 날짜 및 시간"),
                                fieldWithPath("place").type(JsonFieldType.STRING).description("모집 시작 날짜 및 시간"),
                                fieldWithPath("contact").type(JsonFieldType.STRING).description("모집 마감 날짜 및 시간"),
                                fieldWithPath("category").type(JsonFieldType.STRING).description("모집 시작 날짜 및 시간"),
                                fieldWithPath("headcount").type(JsonFieldType.NUMBER).description("모집 마감 날짜 및 시간"),
                                fieldWithPath("payment").type(JsonFieldType.STRING).description("모집 시작 날짜 및 시간"),
                                fieldWithPath("cache").description("모집 마감 날짜 및 시간"),
                                fieldWithPath("goods").description("모집 시작 날짜 및 시간"),
                                fieldWithPath("paymentDetail").type(JsonFieldType.STRING).description("모집 마감 날짜 및 시간"),
                                fieldWithPath("condition").type(JsonFieldType.BOOLEAN).description("모집 시작 날짜 및 시간"),
                                fieldWithPath("conditionDetail").description("모집 마감 날짜 및 시간"),
                                fieldWithPath("doTime").type(JsonFieldType.NUMBER).description("모집 시작 날짜 및 시간"),
                                fieldWithPath("schoolId").type(JsonFieldType.NUMBER).description("모집 마감 날짜 및 시간"),
                                fieldWithPath("businessProfileId").type(JsonFieldType.NUMBER).description("모집 시작 날짜 및 시간"),
                                fieldWithPath("startDate").type(JsonFieldType.STRING).description("모집 마감 날짜 및 시간"),
                                fieldWithPath("endDate").type(JsonFieldType.STRING).description("모집 시작 날짜 및 시간"),
                                fieldWithPath("doDateList[].groupId").type(JsonFieldType.NUMBER).description("모집 마감 날짜 및 시간"),
                                fieldWithPath("doDateList[].doDate").type(JsonFieldType.STRING).description("참여 가능 날짜(시간포함)")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("생성된 게시물 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 파일 추가")
    public void addFiles() throws Exception {
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile files = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is.readAllBytes());
        PostResponse.OnlyId response = PostResponse.OnlyId.builder().id(1L).build();

        given(postService.addFiles(any(), any(), any())).willReturn(response);

        ResultActions results = mvc.perform(
                fileUpload("/api/post/{postId}/files", 1)
                        .file(files)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .characterEncoding("UTF-8")
        );

        results.andExpect(status().isCreated())
                .andDo(document("post-add-files",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자")
                        ),
                        requestParts(
                                partWithName("files").description("게시물에 추가할 파일")
                        ),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("게시물 식별자")
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

        given(postService.updateContent(any(), any(), any())).willReturn(response);

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
                                fieldWithPath("updatedContent").type(JsonFieldType.STRING).description("수정된 세부사항 (없다면 null)"),
                                fieldWithPath("place").type(JsonFieldType.STRING).description("장소"),
                                fieldWithPath("contact").type(JsonFieldType.STRING).description("연락처"),
                                fieldWithPath("payment").type(JsonFieldType.STRING).description("지급수단(CACHE or GOODS)"),
                                fieldWithPath("goods").description("지급 수단이 GOODS 인 경우 물품 보상"),
                                fieldWithPath("cache").description("지급 수단이 CACHE 인 경우 현금 보상"),
                                fieldWithPath("paymentDetail").description("지급 방법 및 세부 사항"),
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
                                fieldWithPath("isLike").type(JsonFieldType.BOOLEAN).description("자신이 해당 게시물에 즐겨찾기를 한 상태라면 true 아니면 false"),
                                fieldWithPath("isMine").type(JsonFieldType.BOOLEAN).description("게시물이 자신이 것인지")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 시작 시간 리스트 조회 문서화")
    public void getPostStartTimeList() throws Exception {
        List<PostResponse.GetPostStartTime> postStartTimeList = new ArrayList<>();
        PostResponse.GetPostStartTime startTime1 = PostResponse.GetPostStartTime.build(postDoDate1, post1);
        PostResponse.GetPostStartTime startTime2 = PostResponse.GetPostStartTime.build(postDoDate2, post1);
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
                                fieldWithPath("[].isFull").type(JsonFieldType.BOOLEAN).description("모집인원이 꽉찼다면 true 아니면 false")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 목록 조회 문서화(학교 id,실험날짜 기준)")
    public void getList() throws Exception {
        Page<Post> postPage = new PageImpl<>(postList, PageRequest.of(1, 5), postList.size());
        given(postService.getList(any(), any(), any(), any(), any(), any(), any(), any(), any())).willReturn(postPage);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/list/{schoolId}", 1)
                .param("page", "1")
                .param("size", "10")
                .param("category", "식품")
                .param("paymentType", "CACHE")
                .param("doDate", "2021-09-04")
                .param("minPay", "10000")
                .param("doTime", "60")
                .param("startTime", "09:30")
                .param("endTime", "18:50")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-getList",
                        pathParameters(
                                parameterWithName("schoolId").description("학교 식별자")),
                        requestParameters(
                                parameterWithName("page").description("조회할 페이지"),
                                parameterWithName("size").description("조회할 사이즈"),
                                parameterWithName("doDate").description("조회할 게시물 실험 날짜(doDate)"),
                                parameterWithName("category").description("조회할 게시물 카테고리"),
                                parameterWithName("paymentType").description("CACHE or GOODS (보내지 않을 경우 전체 조회가 됩니다!)"),
                                parameterWithName("minPay").description("최소 금액 10000 -> 10000이상, 1만원 미만인 경우 9999를 보내주시면 됩니다."),
                                parameterWithName("doTime").description("소요 시간(분단위) 60 -> 60분이내, 120 -> 120분 이내, 3시간 이상인 경우 181을 보내주시면 됩니다."),
                                parameterWithName("startTime").description("조회할 게시물 실험 시작 시간(시작 조건)"),
                                parameterWithName("endTime").description("조회할 게시물 실험 시작 시간(끝 조건)")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("content[].title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("content[].payment").type(JsonFieldType.STRING).description("지급수단(CACHE or GOODS)"),
                                fieldWithPath("content[].goods").description("지급 수단이 GOODS 인 경우 물품 보상").optional(),
                                fieldWithPath("content[].cache").description("지급 수단이 CACHE 인 경우 현금 보상").optional(),
                                fieldWithPath("content[].recruitCondition").type(JsonFieldType.BOOLEAN).description("구인조건이 있다면 true"),
                                fieldWithPath("content[].doTime").type(JsonFieldType.NUMBER).description("실험 소요 시간"),
                                fieldWithPath("content[].likes").type(JsonFieldType.NUMBER).description("좋아요 수"),
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
    public void getListByApplyStatus() throws Exception {
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
        given(postService.getListByApplyStatus(any(), any(), any())).willReturn(postPage);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/apply/list")
                .param("page", "1")
                .param("size", "3")
                .param("status", "APPROVE")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-apply-list",
                        requestParameters(
                                parameterWithName("page").description("조회할 페이지"),
                                parameterWithName("size").description("조회할 사이즈"),
                                parameterWithName("status").description("게시물 상태 APPROVE or WAIT")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("content[].title").type(JsonFieldType.STRING).description("게시물 제목"),
                                fieldWithPath("content[].contact").type(JsonFieldType.STRING).description("게시물 연락처"),
                                fieldWithPath("content[].recruitCondition").type(JsonFieldType.BOOLEAN).description("게시물 조건 유무"),
                                fieldWithPath("content[].time").type(JsonFieldType.NUMBER).description("게시물 실험 소요 시간"),
                                fieldWithPath("content[].doDate").type(JsonFieldType.STRING).description("게시물 실험 날짜"),
                                fieldWithPath("content[].startTime").type(JsonFieldType.STRING).description("게시물 실험 시작 시간"),
                                fieldWithPath("content[].endTime").type(JsonFieldType.STRING).description("게시물 실험 끝나는 시간"),
                                fieldWithPath("content[].status").type(JsonFieldType.STRING).description("게시물 지원 상태(WAIT or APPROVE or REJECT)"),
                                fieldWithPath("content[].finish").type(JsonFieldType.BOOLEAN).description("참여완료 버튼 활성화이면 true 아니면 false"),
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
    @DisplayName("비즈니스 프로필로 생성한 실험 리스트 문서화")
    public void getListByBusinessProfile() throws Exception {
        List<Post> postList = new ArrayList<>();
        postList.add(post1);
        postList.add(post2);
        List<PostResponse.GetListByBusinessProfile> collect = postList.stream().map(PostResponse.GetListByBusinessProfile::build).collect(Collectors.toList());
        PageDto pageDto = new PageDto(1, 5);

        Page<PostResponse.GetListByBusinessProfile> postPage = new PageImpl<>(collect, pageDto.of(), postList.size());

        given(postService.getListByBusinessProfile(any(), any(), any())).willReturn(postPage);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/business/profile/{businessProfileId}/list", 1)
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
                                fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("content[].title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("content[].likes").type(JsonFieldType.NUMBER).description("즐겨찾기 수"),
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
                                parameterWithName("postId").description("삭제할 게시물 식별자")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 모집상태 변화 문서화")
    public void completed() throws Exception {
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