package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.avatar.domain.Avatar;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.post.domain.*;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("게시물 by 유저 API 문서화")
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
        user = User.builder().id(1L).name("동그라미").build();
        businessProfile = BusinessProfile.builder()
                .id(1L)
                .name("동그라미 실험실")
                .contact("010-1234-1234")
                .place("고려대")
                .avatar(Avatar.builder().id(1L).url("avatar url").build())
                .admin(user)
                .build();
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
                .paymentDetail("계좌이체로 지급")
                .doTime(120)
                .postStatus(PostStatus.RECRUIT)
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
                .postStatus(PostStatus.RECRUIT)
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
        postDoDate1 = PostDoDate.builder().id(1L).isFull(false).post(post1).doDate(LocalDateTime.of(2021, 9, 5, 9, 30)).build();
        postDoDate2 = PostDoDate.builder().id(2L).isFull(true).post(post1).doDate(LocalDateTime.of(2021, 9, 5, 10, 30)).build();
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
                                fieldWithPath("businessProfileInfo.adminName").type(JsonFieldType.STRING).description("게시물을 작성한 비즈니스 프로필 어드민 실명"),
                                fieldWithPath("isLike").type(JsonFieldType.BOOLEAN).description("자신이 해당 게시물에 즐겨찾기를 한 상태라면 true 아니면 false"),
                                fieldWithPath("isMine").type(JsonFieldType.BOOLEAN).description("게시물이 자신이 것인지"),
                                fieldWithPath("likes").type(JsonFieldType.NUMBER).description("게시물의 북마크 수")
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
        CustomUserDetails customUserDetails = CustomUserDetails.create(user);
        Page<Post> postPage = new PageImpl<>(postList, PageRequest.of(1, 5), postList.size());
        Page<PostResponse.GetList> response = postPage.map(post1 -> PostResponse.GetList.build(post1, customUserDetails));
        given(postService.getList(any(), any(), any(), any(), any(), any(), any(), any(), any(), any())).willReturn(response);

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
        Page<PostResponse.GetLikeList> response = postPage.map(PostResponse.GetLikeList::build);

        given(postService.getListByLike(any(), any())).willReturn(response);

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
                                fieldWithPath("content[].place").type(JsonFieldType.STRING).description("실험 장소"),
                                fieldWithPath("content[].payment").type(JsonFieldType.STRING).description("지급수단(CACHE or GOODS)"),
                                fieldWithPath("content[].goods").description("지급 수단이 GOODS 인 경우 물품 보상").optional(),
                                fieldWithPath("content[].cache").description("지급 수단이 CACHE 인 경우 현금 보상").optional(),
                                fieldWithPath("content[].recruitCondition").type(JsonFieldType.BOOLEAN).description("구인조건이 있다면 true"),
                                fieldWithPath("content[].doTime").type(JsonFieldType.NUMBER).description("실험 소요 시간"),
                                fieldWithPath("content[].postStatus").type(JsonFieldType.STRING).description("게시물 모집 상태"),
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
        given(postService.getListByApplyStatus(any(), any(), any(), any())).willReturn(postPage);

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
    @DisplayName("자신이 완료한 게시물 목록 조회")
    public void getListByApplyAndFinishedWithoutReview() throws Exception {
        List<PostResponse.GetMyCompletedList> response = new ArrayList<>();
        PostResponse.GetMyCompletedList getMyCompletedList1 = PostResponse.GetMyCompletedList.builder()
                .postId(1L)
                .title("간단한 실험")
                .postDoDateId(1L)
                .time(120)
                .doDate(LocalDateTime.of(2021, 10, 2, 9, 30))
                .startTime(LocalDateTime.of(2021, 10, 2, 9, 30))
                .endTime(LocalDateTime.of(2021, 10, 2, 11, 30))
                .reviewId(1L)
                .review("내가 작성한 첫번째 후기")
                .isWritable(true)
                .build();
        PostResponse.GetMyCompletedList getMyCompletedList2 = PostResponse.GetMyCompletedList.builder()
                .postId(2L)
                .title("간단한 실험2")
                .postDoDateId(2L)
                .time(120)
                .doDate(LocalDateTime.of(2021, 10, 2, 9, 30))
                .startTime(LocalDateTime.of(2021, 10, 2, 9, 30))
                .endTime(LocalDateTime.of(2021, 10, 2, 11, 30))
                .reviewId(2L)
                .review("내가 작성한 두번째 후기")
                .isWritable(true)
                .build();
        PostResponse.GetMyCompletedList getMyCompletedList3 = PostResponse.GetMyCompletedList.builder()
                .postId(2L)
                .title("간단한 실험2")
                .postDoDateId(2L)
                .time(120)
                .doDate(LocalDateTime.of(2021, 10, 2, 9, 30))
                .startTime(LocalDateTime.of(2021, 10, 2, 9, 30))
                .endTime(LocalDateTime.of(2021, 10, 2, 11, 30))
                .reviewId(3L)
                .review("내가 작성한 세번째 후기")
                .isWritable(false)
                .build();
        response.add(getMyCompletedList1);
        response.add(getMyCompletedList2);
        response.add(getMyCompletedList3);
        Page<PostResponse.GetMyCompletedList> postPage = new PageImpl<>(response, PageRequest.of(1, 6), postList.size());
        given(postService.getListByMyCompleteList(any(), any())).willReturn(postPage);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/myComplete/list")
                .param("page", "1")
                .param("size", "3"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-myCompleted-list",
                        requestParameters(
                                parameterWithName("page").description("조회할 페이지"),
                                parameterWithName("size").description("조회할 사이즈")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("content[].postId").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("content[].title").type(JsonFieldType.STRING).description("게시물 제목"),
                                fieldWithPath("content[].postDoDateId").type(JsonFieldType.NUMBER).description("게시물 시작 시간 식별자"),
                                fieldWithPath("content[].time").type(JsonFieldType.NUMBER).description("게시물 실험 소요 시간"),
                                fieldWithPath("content[].doDate").type(JsonFieldType.STRING).description("게시물 실험 날짜"),
                                fieldWithPath("content[].startTime").type(JsonFieldType.STRING).description("게시물 실험 시작 시간"),
                                fieldWithPath("content[].endTime").type(JsonFieldType.STRING).description("게시물 실험 끝나는 시간"),
                                fieldWithPath("content[].reviewId").description("리뷰 식별자 (없다면 null)"),
                                fieldWithPath("content[].review").description("리뷰 내용 (없다면 null)"),
                                fieldWithPath("content[].isWritable").description("리뷰를 작성하거나 수정할 수 있다면 true(실험후 일주일동안 가능)"),
                                fieldWithPath("totalElements").description("전체 개수"),
                                fieldWithPath("last").description("마지막 페이지인지 식별"),
                                fieldWithPath("totalPages").description("전체 페이지")
                        )
                ));
    }
}
