package com.minibeit.post.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.file.domain.repository.PostFileRepository;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostLike;
import com.minibeit.post.domain.PostStatus;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostLikeRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostDto;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.service.exception.PostNotFoundException;
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

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("Post Service 흐름 테스트")
class PostServiceTest extends ServiceIntegrationTest {
    @Autowired
    private PostService postService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostDoDateRepository postDoDateRepository;
    @Autowired
    private PostApplicantRepository postApplicantRepository;
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private PostFileRepository postFileRepository;
    @Autowired
    private PostLikeRepository postLikeRepository;
    @Autowired
    private BusinessProfileRepository businessProfileRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserBusinessProfileRepository userBusinessProfileRepository;

    private User userInBusinessProfile;
    private User anotherUser;
    private User testUser;
    private School KSchool;
    private School YSchool;
    private BusinessProfile businessProfile;
    private Post likePost;
    private Post notLikePost;


    @BeforeEach
    public void init() {
        initSchool();
        initUsersAndBusinessProfile();
    }

    private void initSchool() {
        KSchool = School.builder().name("고려대").build();
        KSchool = schoolRepository.save(KSchool);
        YSchool = School.builder().name("연세대").build();
        YSchool = schoolRepository.save(YSchool);
    }

    private void initUsersAndBusinessProfile() {
        User user1 = User.builder()
                .oauthId("1")
                .nickname("동그라미")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        User user2 = User.builder()
                .oauthId("2")
                .nickname("세모")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        User user3 = User.builder()
                .oauthId("3")
                .nickname("네모")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        userInBusinessProfile = userRepository.save(user1);
        anotherUser = userRepository.save(user2);
        testUser = userRepository.save(user3);

        businessProfile = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(userInBusinessProfile)
                .build();
        businessProfileRepository.save(businessProfile);
        userBusinessProfileRepository.save(UserBusinessProfile.create(userInBusinessProfile, businessProfile));
    }

    private void initPostForLike() {
        PostRequest.CreateInfo createRequest = PostRequest.CreateInfo.builder()
                .title("즐겨찾기1")
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
                .schoolId(KSchool.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 9, 29, 9, 30))
                .endDate(LocalDateTime.of(2021, 9, 29, 12, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 29, 17, 30)).build()))
                .build();

        Post post = Post.create(createRequest, KSchool, businessProfile);
        likePost = postRepository.save(post);
        PostLike postLike = PostLike.create(post, anotherUser);
        postLikeRepository.save(postLike);

        PostRequest.CreateInfo createRequest3 = PostRequest.CreateInfo.builder()
                .title("즐겨찾기안한게시물")
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
                .schoolId(KSchool.getId())
                .businessProfileId(businessProfile.getId())
                .startDate(LocalDateTime.of(2021, 9, 29, 9, 30))
                .endDate(LocalDateTime.of(2021, 9, 29, 12, 30))
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 29, 17, 30)).build()))
                .build();

        Post post3 = Post.create(createRequest3, KSchool, businessProfile);
        notLikePost = postRepository.save(post3);
    }

    @Test
    @DisplayName("즐겨찾기 생성 - 성공")
    void createLike() {
        initPostForLike();
        postService.createOrDeletePostLike(notLikePost.getId(), anotherUser);

        PostLike postLike = postLikeRepository.findByPostIdAndUserId(notLikePost.getId(), anotherUser.getId()).get();

        assertThat(postLike.getPost().getId()).isEqualTo(notLikePost.getId());
    }

    @Test
    @DisplayName("즐겨찾기 삭제 - 성공")
    void deleteLike() {
        initPostForLike();
        postService.createOrDeletePostLike(likePost.getId(), anotherUser);

        Optional<PostLike> response = postLikeRepository.findByPostIdAndUserId(likePost.getId(), anotherUser.getId());

        assertThat(response).isEqualTo(Optional.empty());
    }

    @Test
    @DisplayName("즐겨찾기 생성,삭제 - 실패(게시글이 없는 경우)")
    void createDeleteLikeNotFoundPost() {
        initPostForLike();
        assertThatThrownBy(() -> postService.createOrDeletePostLike(9999L, anotherUser))
                .isExactlyInstanceOf(PostNotFoundException.class);
    }

    @Test
    @DisplayName("즐겨찾기 목록에서 모집완료된 게시물 일괄삭제 - 성공")
    void deleteLikeOfCompletedPost() {
        initPostForLike();
        Post completedPost = postRepository.save(Post.builder().content("내용2").title("모집 제목2").postStatus(PostStatus.COMPLETE).build());
        PostLike postLike = PostLike.create(completedPost, testUser);
        postLikeRepository.save(postLike);

        int beforeLikes = postLikeRepository.findAllByUserIdWithCompletedPost(testUser.getId()).size();
        postService.deleteLikeOfCompletedPost(testUser);
        int afterLikes = postLikeRepository.findAllByUserIdWithCompletedPost(testUser.getId()).size();
        assertThat(beforeLikes - 1).isEqualTo(afterLikes);
    }
}
