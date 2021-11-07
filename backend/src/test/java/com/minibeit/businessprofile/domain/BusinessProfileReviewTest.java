package com.minibeit.businessprofile.domain;

import com.minibeit.businessprofile.dto.BusinessProfilesReviewRequest;
import com.minibeit.post.domain.*;
import com.minibeit.post.dto.PostDto;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.school.domain.School;
import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@DisplayName("비즈니스프로필리뷰 도메인 테스트")
class BusinessProfileReviewTest {

    private User userInBusinessProfile;
    private User admin;
    private User approveUser1;
    private User approveUser2;
    private BusinessProfile businessProfile;
    private PostApplicant postApplicant1;
    private PostApplicant postApplicant2;
    private BusinessProfileReview businessProfileReview;
    private PostRequest.CreateInfo createInfoRequest;
    private BusinessProfilesReviewRequest.Create createReviewRequest;
    private ArrayList<PostDoDate> postDoDates;
    private School school;
    private Post post;

    @BeforeEach
    void setUp() {
        initSchool();
        initUsersAndBusinessProfile();
        initPostRequest();
        initPost();
        initCreateReviewAndRequest();

    }
    private void initSchool() {
        school = School.builder().id(1L).name("고려대").build();
    }

    private void initCreateReviewAndRequest() {

        BusinessProfilesReviewRequest.Create request = BusinessProfilesReviewRequest.Create.builder()
                .postTitle("첫 리뷰 제목")
                .content("첫 번째 후기내용")
                .time(30)
                .doDate(LocalDateTime.of(2021, 10, 5, 9, 30))
                .build();

        businessProfileReview = BusinessProfileReview.create(postDoDates.get(0), businessProfile, request);
        businessProfileReview.setCreatedBy(approveUser1);

        createReviewRequest = BusinessProfilesReviewRequest.Create.builder()
                .postTitle("리뷰 요청 제목")
                .content("후기내용")
                .time(30)
                .doDate(LocalDateTime.of(2021, 10, 5, 9, 30))
                .build();
    }

    private void initPostRequest() {
        createInfoRequest = PostRequest.CreateInfo.builder()
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
                .schoolId(school.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 10, 2, 17, 30))
                .endDate(LocalDateTime.of(2021, 10, 4, 17, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 26, 17, 30)).build()))
                .build();
    }

    private void initUsersAndBusinessProfile() {
        userInBusinessProfile = User.builder()
                .id(1L)
                .oauthId("1")
                .nickname("테스터1")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();

        businessProfile = BusinessProfile.builder()
                .id(2L)
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(admin)
                .build();

        approveUser1 = User.builder()
                .id(3L)
                .oauthId("3")
                .nickname("지원자1")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();

        approveUser2 = User.builder()
                .id(4L)
                .oauthId("4")
                .nickname("지원자2")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
    }

    void initPost(){

        post = Post.create(createInfoRequest, school, businessProfile);

        PostDoDate postDoDate1 = PostDoDate.create(LocalDateTime.of(2021, 10, 5, 9, 30), post);
        PostDoDate postDoDate2 = PostDoDate.create(LocalDateTime.of(2021, 10, 5, 9, 30), post);

        postApplicant1 = PostApplicant.create(postDoDate1, approveUser1);
        postApplicant2 = PostApplicant.create(postDoDate2, approveUser2);
        postApplicant1.updateStatus(ApplyStatus.APPROVE);
        postApplicant2.updateStatus(ApplyStatus.APPROVE);
        postApplicant1.updateMyFinish();

        postDoDates = new ArrayList<>(post.getPostDoDateList());

    }

    @Test
    @DisplayName("리뷰 수정")
    void update() {
        PostDoDate postDoDate1 = PostDoDate.create(LocalDateTime.of(2021, 10, 5, 9, 30), post);
        postApplicant1 = PostApplicant.create(postDoDate1, approveUser1);
        BusinessProfileReview businessProfileReview = BusinessProfileReview.create(postDoDate1, businessProfile, createReviewRequest);

        businessProfileReview.update("업데이트한 후기");

        assertThat(businessProfileReview.getContent()).isEqualTo("업데이트한 후기");

    }

    @Test
    @DisplayName("리뷰 생성")
    void create() {
        BusinessProfileReview businessProfileReview = BusinessProfileReview.create(postDoDates.get(0), businessProfile, createReviewRequest);
        assertAll(
                () -> assertThat(businessProfileReview.getPostTitle()).isEqualTo(createReviewRequest.getPostTitle()),
                () -> assertThat(businessProfileReview.getContent()).isEqualTo(createReviewRequest.getContent())
        );
    }
}