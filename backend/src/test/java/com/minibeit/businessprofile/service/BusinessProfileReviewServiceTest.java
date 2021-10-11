package com.minibeit.businessprofile.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.BusinessProfileReview;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.BusinessProfileReviewRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.dto.BusinessProfileReviewResponse;
import com.minibeit.businessprofile.dto.BusinessProfilesReviewRequest;
import com.minibeit.businessprofile.service.exception.BusinessProfileReviewNotFoundException;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostDto;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

@DisplayName("비즈니스프로필 후기 흐름 테스트")
public class BusinessProfileReviewServiceTest extends ServiceIntegrationTest {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostDoDateRepository postDoDateRepository;
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private BusinessProfileRepository businessProfileRepository;
    @Autowired
    private BusinessProfileReviewRepository businessProfileReviewRepository;
    @Autowired
    private BusinessProfileReviewService businessProfileReviewService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserBusinessProfileRepository userBusinessProfileRepository;
    @Autowired
    private PostApplicantRepository postApplicantRepository;

    private BusinessProfile businessProfile;

    private User userInBusinessProfile, admin;

    private User approveUser1;
    private User approveUser2;

    private PostApplicant postApplicant1;
    private PostApplicant postApplicant2;

    private BusinessProfileReview businessProfileReview;
    private School school;

    private ArrayList<PostDoDate> postDoDates;
    private PostRequest.CreateInfo createInfoRequest;
    private BusinessProfilesReviewRequest.Create createReviewRequest;
    private int firstPost = 0;

    @BeforeEach
    void set() {
        initSchool();
        initUsersAndBusinessProfile();
        initPostRequest();
        initPost();
        initCreateReviewAndRequest();
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

    private void initSchool() {
        school = School.builder().name("고려대").build();
        schoolRepository.save(school);
    }

    private void initPost() {
        Post createdPost = Post.create(createInfoRequest, school, businessProfile);
        Post post = postRepository.save(createdPost);

        PostDoDate postDoDate1 = PostDoDate.create(LocalDateTime.of(2021, 10, 5, 9, 30), createdPost);
        PostDoDate postDoDate2 = PostDoDate.create(LocalDateTime.of(2021, 10, 5, 9, 30), createdPost);
        postDoDateRepository.saveAll(Arrays.asList(postDoDate1, postDoDate2));
        postApplicant1 = PostApplicant.create(postDoDate1, approveUser1);
        postApplicant2 = PostApplicant.create(postDoDate2, approveUser2);
        postApplicant1.updateStatus(ApplyStatus.APPROVE);
        postApplicant2.updateStatus(ApplyStatus.APPROVE);
        postApplicant1.updateMyFinish();
        postApplicantRepository.saveAll(Arrays.asList(postApplicant1, postApplicant2));

        postDoDates = new ArrayList<>(post.getPostDoDateList());

    }

    private void initCreateReviewAndRequest() {

        BusinessProfilesReviewRequest.Create request = BusinessProfilesReviewRequest.Create.builder()
                .postTitle("첫 리뷰 제목")
                .content("첫 번째 후기내용")
                .time(30)
                .doDate(LocalDateTime.of(2021, 10, 5, 9, 30))
                .build();

        BusinessProfileReview review = BusinessProfileReview.create(postDoDates.get(0), businessProfile, request);
        review.setCreatedBy(approveUser1);
        businessProfileReview = businessProfileReviewRepository.save(review);

        createReviewRequest = BusinessProfilesReviewRequest.Create.builder()
                .postTitle("리뷰 요청 제목")
                .content("후기내용")
                .time(30)
                .doDate(LocalDateTime.of(2021, 10, 5, 9, 30))
                .build();
    }

    private void initUsersAndBusinessProfile() {
        userInBusinessProfile = User.builder()
                .oauthId("1")
                .nickname("테스터1")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();

        admin = User.builder()
                .oauthId("3")
                .name("어드민")
                .nickname("테스터3")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        approveUser1 = User.builder()
                .oauthId("3")
                .nickname("지원자1")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        approveUser2 = User.builder()
                .oauthId("4")
                .nickname("지원자2")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();

        userRepository.saveAll(Arrays.asList(userInBusinessProfile, admin, approveUser1, approveUser2));

        BusinessProfile businessProfileBuilder = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(admin)
                .build();

        businessProfile = businessProfileRepository.save(businessProfileBuilder);
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(admin, businessProfile));
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(userInBusinessProfile, businessProfile));
    }

    @Test
    @DisplayName("리뷰 수정 - 실패(시간 초과)")
    void updateReviewFailureWhenOverTime() {

        postApplicant1.updateMyFinish();
        BusinessProfilesReviewRequest.Update updateRequest = BusinessProfilesReviewRequest.Update.builder()
                .content("업데이트한 새로운 내용")
                .build();
        BusinessProfileReview review = businessProfileReviewRepository.findByIdWithUser(businessProfile.getId()).orElseThrow(BusinessProfileReviewNotFoundException::new);
        assertThatThrownBy(
                () -> businessProfileReviewService.update(review.getId(), updateRequest, review.getDoDate().plusDays(14), approveUser1)
        ).isInstanceOf(PermissionException.class);
    }

    @Test
    @DisplayName("리뷰 조회 - 성공")
    void getOneReview() {

        BusinessProfileReviewResponse.GetOne one = businessProfileReviewService.getOne(businessProfileReview.getId());
        assertAll(
                () -> assertThat(businessProfileReview.getContent()).isEqualTo(one.getContent()),
                () -> assertThat(businessProfileReview.getDoDate()).isEqualTo(one.getDoDate()),
                () -> assertThat(businessProfileReview.getPostTitle()).isEqualTo(one.getPostTitle())
        );
    }

    @Test
    @DisplayName("리뷰 조회 - 실패(권한없는 리뷰 조회)")
    void getOneReviewFailureWhenNoPermission() {

        BusinessProfileReviewResponse.GetOne review = businessProfileReviewService.getOne(businessProfile.getId());
        assertAll(
                () -> assertThat(businessProfileReview.getContent()).isEqualTo(review.getContent()),
                () -> assertThat(businessProfileReview.getDoDate()).isEqualTo(review.getDoDate()),
                () -> assertThat(businessProfileReview.getPostTitle()).isEqualTo(review.getPostTitle())
        );
    }

    @Test
    @DisplayName("리뷰 삭제 - 성공(조회 후 삭제하고 다시 조회)")
    void deleteReview() {

        BusinessProfileReviewResponse.GetOne review = businessProfileReviewService.getOne(businessProfile.getId());
        businessProfileReviewService.deleteOne(review.getId(), approveUser1);
        assertThatThrownBy(
                () -> businessProfileReviewService.getOne(businessProfile.getId())
        ).isInstanceOf(BusinessProfileReviewNotFoundException.class);

    }

    @Test
    @DisplayName("리뷰 삭제 - 실패(권한 없는 유저)")
    void deleteReviewFailureWhenNoPermission() {

        BusinessProfileReviewResponse.GetOne review = businessProfileReviewService.getOne(businessProfile.getId());

        assertThatThrownBy(
                () ->         businessProfileReviewService.deleteOne(review.getId(), approveUser2)
        ).isInstanceOf(PermissionException.class);

    }

    @Test
    @DisplayName("리뷰 수정 - 실패(권한없는 유저 수정)")
    void updateReviewFailureWhenNoPermission() {

        BusinessProfilesReviewRequest.Update updateRequest = BusinessProfilesReviewRequest.Update.builder()
                .content("업데이트한 새로운 내용")
                .build();

        BusinessProfileReview businessProfileReview = businessProfileReviewRepository.findById(this.businessProfileReview.getId()).orElseThrow(BusinessProfileReviewNotFoundException::new);
        assertThatThrownBy(
                () -> businessProfileReviewService.update(businessProfileReview.getId(), updateRequest, businessProfileReview.getDoDate().plusDays(6), approveUser2)
        ).isInstanceOf(PermissionException.class);

    }

    @Test
    @DisplayName("리뷰 수정 - 성공")
    void updateReview() {
        postApplicant1.updateMyFinish();

        BusinessProfilesReviewRequest.Update updateRequest = BusinessProfilesReviewRequest.Update.builder()
                .content("업데이트한 새로운 내용")
                .build();

        BusinessProfileReview review = businessProfileReviewRepository.findByIdWithUser(businessProfile.getId()).orElseThrow(BusinessProfileReviewNotFoundException::new);
        businessProfileReviewService.update(review.getId(), updateRequest, review.getDoDate().plusDays(6), approveUser1);
        BusinessProfileReview updatedReview = businessProfileReviewRepository.findByIdWithUser(businessProfile.getId()).orElseThrow(BusinessProfileReviewNotFoundException::new);

        assertThat(updatedReview.getContent()).isEqualTo(updateRequest.getContent());

    }

    @Test
    @DisplayName("리뷰 생성 - 성공(비즈니스프로필과 일치)")
    void createReview() {

        postApplicant1.updateMyFinish();

        BusinessProfileReviewResponse.ReviewId reviewId = businessProfileReviewService.create(postDoDates.get(firstPost).getId(), createReviewRequest, createReviewRequest.getDoDate(), approveUser1);
        BusinessProfileReview businessProfileReview = businessProfileReviewRepository.findById(reviewId.getId()).orElseThrow(BusinessProfileReviewNotFoundException::new);
        assertThat(businessProfileReview.getDoDate()).isEqualTo(createReviewRequest.getDoDate());
    }

    @Test
    @DisplayName("리뷰 생성 - 실패(권한없는 유저 작성)")
    void createReviewFailureWhenNoPermission() {

        assertThatThrownBy(
                () -> businessProfileReviewService.create(postDoDates.get(firstPost).getId(), createReviewRequest, createReviewRequest.getDoDate(), approveUser2)
        ).isInstanceOf(PostApplicantNotFoundException.class);

    }

    @Test
    @DisplayName("리뷰 생성 - 실패(날짜 초과)")
    void createReviewFailureWhenOverTime() {

        assertThatThrownBy(
                () -> businessProfileReviewService.create(postDoDates.get(firstPost).getId(), createReviewRequest, LocalDateTime.of(2021,11,1,1,1), approveUser1)
        ).isInstanceOf(PermissionException.class);

    }
}
