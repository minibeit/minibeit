package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.auth.domain.CustomUserDetails;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.file.domain.Avatar;
import com.minibeit.post.domain.*;
import com.minibeit.post.service.PostService;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.school.domain.School;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

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
                .thumbnail("thumbnail")
                .placeDetail("123호")
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
                .postFileList(Collections.singletonList(PostFile.builder().id(1L).url("profile image url").name("fileName").build()))
                .build();
        post1.setCreatedBy(user);

        post2 = Post.builder()
                .id(2L)
                .title("코로나로 인한 대학생 우울증 실험")
                .content("실험실 세부사항")
                .place("고려대")
                .placeDetail("123호")
                .contact("010-1234-5786")
                .thumbnail("thumbnail")
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
                .postFileList(Collections.singletonList(PostFile.builder().id(1L).url("profile image url").name("fileName").build()))
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
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
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
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("data.title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("data.content").type(JsonFieldType.STRING).description("세부사항"),
                                fieldWithPath("data.address").type(JsonFieldType.STRING).description("장소"),
                                fieldWithPath("data.addressDetail").type(JsonFieldType.STRING).description("장소 세부 사항"),
                                fieldWithPath("data.contact").type(JsonFieldType.STRING).description("연락처"),
                                fieldWithPath("data.payment").type(JsonFieldType.STRING).description("지급수단(CACHE or GOODS)"),
                                fieldWithPath("data.goods").description("지급 수단이 GOODS 인 경우 물품 보상"),
                                fieldWithPath("data.cache").description("지급 수단이 CACHE 인 경우 현금 보상"),
                                fieldWithPath("data.paymentDetail").description("지급 방법 및 세부 사항"),
                                fieldWithPath("data.recruitCondition").type(JsonFieldType.BOOLEAN).description("구인조건이 있다면 true"),
                                fieldWithPath("data.recruitConditionDetail").description("구인조건이 있다면 구인조건 세부사항(없다면 null)"),
                                fieldWithPath("data.doTime").type(JsonFieldType.NUMBER).description("실험 소요 시간"),
                                fieldWithPath("data.category").type(JsonFieldType.STRING).description("실험 분야"),
                                fieldWithPath("data.schoolName").type(JsonFieldType.STRING).description("학교 이름"),
                                fieldWithPath("data.startDate").type(JsonFieldType.STRING).description("모집 시작 날짜"),
                                fieldWithPath("data.endDate").type(JsonFieldType.STRING).description("모집 마감 날짜"),
                                fieldWithPath("data.files[].url").type(JsonFieldType.STRING).description("파일 url"),
                                fieldWithPath("data.files[].name").type(JsonFieldType.STRING).description("파일 이름"),
                                fieldWithPath("data.businessProfileInfo.id").type(JsonFieldType.NUMBER).description("게시물을 작성한 비즈니스 프로필 식별자"),
                                fieldWithPath("data.businessProfileInfo.name").type(JsonFieldType.STRING).description("게시물을 작성한 비즈니스 프로필 이름"),
                                fieldWithPath("data.businessProfileInfo.avatar").type(JsonFieldType.STRING).description("게시물을 작성한 비즈니스 프로필 이미지"),
                                fieldWithPath("data.businessProfileInfo.contact").type(JsonFieldType.STRING).description("게시물을 작성한 비즈니스 프로필 연락처"),
                                fieldWithPath("data.businessProfileInfo.address").type(JsonFieldType.STRING).description("게시물을 작성한 비즈니스 프로필 주소"),
                                fieldWithPath("data.businessProfileInfo.adminName").type(JsonFieldType.STRING).description("게시물을 작성한 비즈니스 프로필 어드민 실명"),
                                fieldWithPath("data.isLike").type(JsonFieldType.BOOLEAN).description("자신이 해당 게시물에 즐겨찾기를 한 상태라면 true 아니면 false"),
                                fieldWithPath("data.isMine").type(JsonFieldType.BOOLEAN).description("게시물이 자신이 것인지"),
                                fieldWithPath("data.likes").type(JsonFieldType.NUMBER).description("게시물의 북마크 수")
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
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].id").type(JsonFieldType.NUMBER).description("실험 시작 시간 식별자"),
                                fieldWithPath("data.[].startTime").type(JsonFieldType.STRING).description("실험 시작 시간"),
                                fieldWithPath("data.[].endTime").type(JsonFieldType.STRING).description("실험 끝나는 시간"),
                                fieldWithPath("data.[].isFull").type(JsonFieldType.BOOLEAN).description("모집인원이 꽉찼다면 true 아니면 false")
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
                .get("/api/posts/{schoolId}", 1)
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
                                parameterWithName("schoolId").description("학교 식별자( 0 이면 전체 학교에 대해서 조회)")),
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
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.content[].id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("data.content[].title").type(JsonFieldType.STRING).description("제목"),
                                fieldWithPath("data.content[].payment").type(JsonFieldType.STRING).description("지급수단(CACHE or GOODS)"),
                                fieldWithPath("data.content[].goods").description("지급 수단이 GOODS 인 경우 물품 보상").optional(),
                                fieldWithPath("data.content[].cache").description("지급 수단이 CACHE 인 경우 현금 보상").optional(),
                                fieldWithPath("data.content[].recruitCondition").type(JsonFieldType.BOOLEAN).description("구인조건이 있다면 true"),
                                fieldWithPath("data.content[].doTime").type(JsonFieldType.NUMBER).description("실험 소요 시간"),
                                fieldWithPath("data.content[].likes").type(JsonFieldType.NUMBER).description("좋아요 수"),
                                fieldWithPath("data.content[].file.url").type(JsonFieldType.STRING).description("파일 url"),
                                fieldWithPath("data.content[].file.name").type(JsonFieldType.STRING).description("파일 이름"),
                                fieldWithPath("data.totalElements").description("전체 개수"),
                                fieldWithPath("data.last").description("마지막 페이지인지 식별"),
                                fieldWithPath("data.totalPages").description("전체 페이지")
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
                .get("/api/posts/like")
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
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.content[].id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("data.content[].title").type(JsonFieldType.STRING).description("게시물 제목"),
                                fieldWithPath("data.content[].thumbnail").type(JsonFieldType.STRING).description("게시물 썸네일"),
                                fieldWithPath("data.content[].payment").type(JsonFieldType.STRING).description("지급수단(CACHE or GOODS)"),
                                fieldWithPath("data.content[].recruitCondition").type(JsonFieldType.BOOLEAN).description("구인조건이 있다면 true"),
                                fieldWithPath("data.content[].doTime").type(JsonFieldType.NUMBER).description("실험 소요 시간"),
                                fieldWithPath("data.content[].businessProfile.id").type(JsonFieldType.NUMBER).description("비즈니스 식별자"),
                                fieldWithPath("data.content[].businessProfile.name").type(JsonFieldType.STRING).description("비즈니스 이름"),
                                fieldWithPath("data.totalElements").description("전체 개수"),
                                fieldWithPath("data.last").description("마지막 페이지인지 식별"),
                                fieldWithPath("data.totalPages").description("전체 페이지")
                        )
                ));
    }

    @Test
    @DisplayName("자신이 신청한 게시물 목록 조회 (status = WAIT, APPROVE, COMPLETE)")
    public void getListByApplyStatus() throws Exception {
        List<PostResponse.GetMyApplyList> response = new ArrayList<>();
        PostResponse.GetMyApplyList approveAndWaitList1 = PostResponse.GetMyApplyList.builder()
                .id(1L)
                .contact("010-1232-4568")
                .postDoDateId(1L)
                .title("간단한 실험")
                .time(60)
                .category("기타")
                .address("서울")
                .addressDetail("고려대 신공학관")
                .thumbnail("thumbnail url")
                .doDate(LocalDateTime.of(2021, 9, 10, 9, 30))
                .recruitCondition(true)
                .status(ApplyStatus.APPROVE.name())
                .writeReview(true)
                .businessProfileId(1L)
                .businessProfileName("동그라미실험실")
                .build();
        PostResponse.GetMyApplyList approveAndWaitList2 = PostResponse.GetMyApplyList.builder()
                .id(2L)
                .contact("010-1232-4568")
                .postDoDateId(2L)
                .title("복잡한 실험")
                .time(120)
                .category("기타")
                .address("서울")
                .addressDetail("고려대 신공학관")
                .thumbnail("thumbnail url")
                .doDate(LocalDateTime.of(2021, 9, 10, 12, 30))
                .recruitCondition(true)
                .status(ApplyStatus.WAIT.name())
                .writeReview(true)
                .businessProfileId(1L)
                .businessProfileName("동그라미실험실")
                .build();
        response.add(approveAndWaitList1);
        response.add(approveAndWaitList2);
        Page<PostResponse.GetMyApplyList> postPage = new PageImpl<>(response, PageRequest.of(1, 6), postList.size());
        given(postService.getListByApplyStatus(any(), any(), any(), any())).willReturn(postPage);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/posts/apply")
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
                                parameterWithName("status").description("게시물 상태 APPROVE or WAIT or COMPLETE")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.content[].id").type(JsonFieldType.NUMBER).description("게시물 식별자"),
                                fieldWithPath("data.content[].title").type(JsonFieldType.STRING).description("게시물 제목"),
                                fieldWithPath("data.content[].contact").type(JsonFieldType.STRING).description("게시물 연락처"),
                                fieldWithPath("data.content[].recruitCondition").type(JsonFieldType.BOOLEAN).description("게시물 조건 유무"),
                                fieldWithPath("data.content[].time").type(JsonFieldType.NUMBER).description("게시물 실험 소요 시간"),
                                fieldWithPath("data.content[].category").type(JsonFieldType.STRING).description("게시물 실험 분야"),
                                fieldWithPath("data.content[].address").type(JsonFieldType.STRING).description("게시물 주소"),
                                fieldWithPath("data.content[].addressDetail").type(JsonFieldType.STRING).description("게시물 상세 주소"),
                                fieldWithPath("data.content[].doDate").type(JsonFieldType.STRING).description("게시물 실험 날짜"),
                                fieldWithPath("data.content[].startTime").type(JsonFieldType.STRING).description("게시물 실험 시작 시간"),
                                fieldWithPath("data.content[].endTime").type(JsonFieldType.STRING).description("게시물 실험 끝나는 시간"),
                                fieldWithPath("data.content[].status").type(JsonFieldType.STRING).description("게시물 지원 상태(WAIT or APPROVE or REJECT)"),
                                fieldWithPath("data.content[].finish").type(JsonFieldType.BOOLEAN).description("참여완료 버튼 활성화이면 true 아니면 false"),
                                fieldWithPath("data.content[].isWritable").description("리뷰를 작성할 수 있다면 true(실험후 일주일동안 가능)"),
                                fieldWithPath("data.content[].writeReview").description("리뷰를 작성했다면 true"),
                                fieldWithPath("data.content[].businessProfile.id").type(JsonFieldType.NUMBER).description("비스니스 프로필 식별자"),
                                fieldWithPath("data.content[].businessProfile.name").type(JsonFieldType.STRING).description("비스니스 프로필 이름"),
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

        given(postService.getDoDateListByYearMonth(any(), any())).willReturn(response);

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
    @DisplayName("개인 프로필 신청 현황 문서화")
    public void getMyPostStatus() throws Exception {
        PostResponse.GetMyCount response = PostResponse.GetMyCount.build(1L, 1L);

        given(postService.getMyPostStatus(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders.get("/api/post/user/status"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-my-status",
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.reject").type(JsonFieldType.NUMBER).description("반려된 게시물 개수"),
                                fieldWithPath("data.wait").type(JsonFieldType.NUMBER).description("대기중인 게시물 개수")
                        )
                ));
    }

    @Test
    @DisplayName("즐겨찾기 목록에서 모집완료된 게시물 일괄삭제 문서화")
    public void deleteLikes() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .delete("/api/post/likes"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post-like-delete",
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }
}
