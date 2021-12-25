package com.minibeit.post.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.common.exception.InvalidOperationException;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.file.domain.FileServer;
import com.minibeit.file.domain.FileType;
import com.minibeit.file.domain.PostFile;
import com.minibeit.file.domain.repository.PostFileRepository;
import com.minibeit.file.service.S3Uploader;
import com.minibeit.file.service.dto.SavedFile;
import com.minibeit.post.domain.*;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostLikeRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.domain.repository.RejectPostRepository;
import com.minibeit.post.service.dto.PostDto;
import com.minibeit.post.service.dto.PostRequest;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.postapplicant.domain.ApplyStatus;
import com.minibeit.postapplicant.domain.PostApplicant;
import com.minibeit.postapplicant.domain.repository.PostApplicantRepository;
import com.minibeit.postapplicant.service.exception.PostApplicantNotFoundException;
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
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockMultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@DisplayName("비즈니스 프로필 Post Service 생성, 수정, 삭제 흐름 테스트")
class PostByBusinessServiceTest extends ServiceIntegrationTest {
    @Autowired
    private PostByBusinessService postByBusinessService;
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
    @Autowired
    private RejectPostRepository rejectPostRepository;
    @MockBean
    private S3Uploader s3Uploader;
    @PersistenceContext
    private EntityManager em;

    private User userInBusinessProfile;
    private User anotherUser;
    private User approveUser1;
    private User approveUser2;
    private User waitUser1;
    private User waitUser2;
    private User waitUser3;
    private PostApplicant approvePostApplicant1;
    private PostApplicant approvePostApplicant2;
    private PostApplicant waitPostApplicant1;
    private PostApplicant waitPostApplicant2;
    private PostApplicant waitPostApplicant3;
    private School school;
    private BusinessProfile businessProfile;
    private PostRequest.CreateInfo createInfoRequest;
    private Post post;
    private PostFile postFile;
    private PostLike postLike;
    private PostDoDate postDoDate1;
    private PostDoDate postDoDate2;
    private PostDoDate postDoDate3;
    private final SavedFile savedFile = new SavedFile("files", "100", 10L, "avatar.com", 12, 10, true, FileType.IMAGE, FileServer.S3);

    @BeforeEach
    public void init() {
        initSchool();
        initUsersAndBusinessProfile();
        initPostRequest();
        initPost();
    }

    private void initSchool() {
        school = School.builder().name("고려대").build();
        schoolRepository.save(school);
    }

    private void initUsersAndBusinessProfile() {
        userInBusinessProfile = User.builder()
                .oauthId("1")
                .nickname("동그라미")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        anotherUser = User.builder()
                .oauthId("2")
                .nickname("세모")
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
        waitUser1 = User.builder()
                .oauthId("5")
                .nickname("지원자3")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        waitUser2 = User.builder()
                .oauthId("6")
                .nickname("지원자4")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        waitUser3 = User.builder()
                .oauthId("7")
                .nickname("지원자5")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        userRepository.saveAll(Arrays.asList(userInBusinessProfile, anotherUser, approveUser1, approveUser2, waitUser1, waitUser2, waitUser3));

        BusinessProfile createdBusiness = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(userInBusinessProfile)
                .build();
        businessProfile = businessProfileRepository.save(createdBusiness);
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(userInBusinessProfile, createdBusiness));
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
                .startDate(LocalDateTime.of(2021, 9, 26, 17, 30))
                .endDate(LocalDateTime.of(2021, 10, 2, 17, 30))
                .doDateList(Arrays.asList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 29, 9, 30)).build(),
                        PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 1, 9, 30)).build(),
                        PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 10, 3, 9, 30)).build()))
                .build();
    }

    private void initPost() {
        Post createdPost = createInfoRequest.toEntity();
        createdPost.create(school, businessProfile);
        post = postRepository.save(createdPost);

        PostFile createdPostFile = PostFile.create(post, savedFile.toPostFile());
        postFile = postFileRepository.save(createdPostFile);

        PostLike createdPostLike = PostLike.create(createdPost, userInBusinessProfile);
        postLike = postLikeRepository.save(createdPostLike);

        List<PostDoDate> postDoDates = createInfoRequest.toPostDoDates();
        postDoDates.forEach(postDoDate -> postDoDate.assignPost(post));
        postDoDateRepository.saveAll(postDoDates);
        postDoDate1 = postDoDates.get(0);
        postDoDate2 = postDoDates.get(1);
        postDoDate3 = postDoDates.get(2);

        approvePostApplicant1 = PostApplicant.create(postDoDate1, approveUser1);
        approvePostApplicant1.updateStatus(ApplyStatus.APPROVE);
        approvePostApplicant2 = PostApplicant.create(postDoDate3, approveUser2);
        approvePostApplicant2.updateStatus(ApplyStatus.APPROVE);

        waitPostApplicant1 = PostApplicant.create(postDoDate2, waitUser3);
        waitPostApplicant2 = PostApplicant.create(postDoDate3, waitUser1);
        waitPostApplicant3 = PostApplicant.create(postDoDate3, waitUser2);

        postApplicantRepository.saveAll(Arrays.asList(approvePostApplicant1, approvePostApplicant2, waitPostApplicant1, waitPostApplicant2, waitPostApplicant3));
    }

    @Test
    @DisplayName("게시물 생성 - 성공")
    void createInfo() throws IOException {
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile file = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is.readAllBytes());
        InputStream is2 = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile thumbnail = new MockMultipartFile("thumbnail", "thumbnail.jpg", "image/jpg", is2.readAllBytes());

        given(s3Uploader.uploadFileList(any())).willReturn(Collections.singletonList(savedFile));
        given(s3Uploader.upload(any())).willReturn(savedFile);

        PostResponse.OnlyId response = postByBusinessService.create(createInfoRequest, Collections.singletonList(file), thumbnail, userInBusinessProfile);
        Post findPost = postRepository.findById(response.getId()).orElseThrow(PostNotFoundException::new);

        assertThat(findPost.getTitle()).isEqualTo(createInfoRequest.getTitle());
        assertThat(findPost.getThumbnail()).isNotNull();
    }

    @Test
    @DisplayName("게시물 생성 - 실패(비즈니스프로필에 없는 유저)")
    void createInfoNotBusinessProfile() throws IOException {
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile file = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is.readAllBytes());
        InputStream is2 = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile thumbnail = new MockMultipartFile("thumbnail", "thumbnail.jpg", "image/jpg", is2.readAllBytes());

        assertThatThrownBy(() -> postByBusinessService.create(createInfoRequest, Collections.singletonList(file), thumbnail, anotherUser))
                .isExactlyInstanceOf(PermissionException.class);
    }

    @Test
    @DisplayName("게시물 모집완료 - 성공")
    void recruitmentCompleted() {
        PostRequest.RejectComment request = PostRequest.RejectComment.builder().rejectComment("모집이 완료되었습니다.").build();
        postByBusinessService.recruitmentCompleted(post.getId(), request, userInBusinessProfile);
        resetEntityManager();
        Post findPost = postRepository.findById(post.getId()).orElseThrow(PostNotFoundException::new);
        PostApplicant findApprovePostApplicant1 = postApplicantRepository.findById(approvePostApplicant1.getId()).orElseThrow(PostApplicantNotFoundException::new);
        PostApplicant findApprovePostApplicant2 = postApplicantRepository.findById(approvePostApplicant2.getId()).orElseThrow(PostApplicantNotFoundException::new);
        PostApplicant findWaitPostApplicant1 = postApplicantRepository.findById(waitPostApplicant1.getId()).orElseThrow(PostApplicantNotFoundException::new);
        PostApplicant findWaitPostApplicant2 = postApplicantRepository.findById(waitPostApplicant2.getId()).orElseThrow(PostApplicantNotFoundException::new);
        PostApplicant findWaitPostApplicant3 = postApplicantRepository.findById(waitPostApplicant3.getId()).orElseThrow(PostApplicantNotFoundException::new);
        List<RejectPost> rejectPosts = rejectPostRepository.findAll();

        assertThat(findPost.getPostStatus()).isEqualTo(PostStatus.COMPLETE);
        assertThat(findApprovePostApplicant1.getApplyStatus()).isEqualTo(ApplyStatus.APPROVE);
        assertThat(findApprovePostApplicant2.getApplyStatus()).isEqualTo(ApplyStatus.APPROVE);
        assertThat(findWaitPostApplicant1.getApplyStatus()).isEqualTo(ApplyStatus.REJECT);
        assertThat(findWaitPostApplicant2.getApplyStatus()).isEqualTo(ApplyStatus.REJECT);
        assertThat(findWaitPostApplicant3.getApplyStatus()).isEqualTo(ApplyStatus.REJECT);
        assertThat(rejectPosts.size()).isEqualTo(3);
    }

    @Test
    @DisplayName("게시물 모집완료 - 실패(게시물이 없는 경우)")
    void recruitmentCompletedNotFoundPost() {
        PostRequest.RejectComment request = PostRequest.RejectComment.builder().rejectComment("모집이 완료되었습니다.").build();

        assertThatThrownBy(() -> postByBusinessService.recruitmentCompleted(9999L, request, userInBusinessProfile))
                .isExactlyInstanceOf(PostNotFoundException.class);
    }

    @Test
    @DisplayName("게시물 모집완료 - 실패(비즈니스 프로필 소속원이 아닌 경우)")
    void recruitmentCompletedUserNotInBusinessProfile() {
        PostRequest.RejectComment request = PostRequest.RejectComment.builder().rejectComment("모집이 완료되었습니다.").build();

        assertThatThrownBy(() -> postByBusinessService.recruitmentCompleted(post.getId(), request, anotherUser))
                .isExactlyInstanceOf(PermissionException.class);
    }

    @Test
    @DisplayName("게시물 세부사항 수정 - 성공")
    void updateContent() {
        PostRequest.UpdateContent request = PostRequest.UpdateContent.builder().updatedContent("게시글 세부사항 수정").build();
        postByBusinessService.updateContent(post.getId(), request, userInBusinessProfile);

        Post findPost = postRepository.findById(post.getId()).orElseThrow(PostNotFoundException::new);

        assertThat(findPost.getContent()).isEqualTo(request.getUpdatedContent());
    }

    @Test
    @DisplayName("게시물 세부사항 수정 - 실패(게시물이 없는 경우)")
    void updateContentUserNotInBusinessProfile() {
        PostRequest.UpdateContent request = PostRequest.UpdateContent.builder().updatedContent("게시글 세부사항 수정").build();

        assertThatThrownBy(() -> postByBusinessService.updateContent(9999L, request, userInBusinessProfile))
                .isExactlyInstanceOf(PostNotFoundException.class);
    }

    @Test
    @DisplayName("게시물 세부사항 수정 - 실패(비즈니스 프로필 소속원이 아닌 경우)")
    void updateContentNotFoundPost() {
        PostRequest.UpdateContent request = PostRequest.UpdateContent.builder().updatedContent("게시글 세부사항 수정").build();

        assertThatThrownBy(() -> postByBusinessService.updateContent(post.getId(), request, anotherUser))
                .isExactlyInstanceOf(PermissionException.class);
    }

    @Test
    @DisplayName("게시물 삭제 - 실패(게시물이 없는 경우)")
    void deleteOneNotFoundPost() {
        assertThatThrownBy(() -> postByBusinessService.deleteOne(9999L, LocalDateTime.of(2021, 9, 29, 0, 0), userInBusinessProfile))
                .isExactlyInstanceOf(PostNotFoundException.class);
    }

    @Test
    @DisplayName("게시물 삭제 - 실패(비즈니스 프로필 소속원이 아닌 경우)")
    void deleteOneUserNotInBusinessProfile() {
        assertThatThrownBy(() -> postByBusinessService.deleteOne(post.getId(), LocalDateTime.of(2021, 9, 29, 0, 0), anotherUser))
                .isExactlyInstanceOf(PermissionException.class);
    }

    @Test
    @DisplayName("게시물 삭제 - 실패(실험이 끝나지 않은 날짜에 확정자가 남아있는 경우)")
    void deleteOneExistApprovedApplicant() {
        assertThatThrownBy(() -> postByBusinessService.deleteOne(post.getId(), LocalDateTime.of(2021, 9, 29, 0, 0), userInBusinessProfile))
                .isExactlyInstanceOf(InvalidOperationException.class);
    }

    @Test
    @DisplayName("게시물 삭제 시 관련 도메인 모두 삭제(postLike,PostDoDate,PostFile,PostApplicant) - 성공")
    void deleteOne() {
        postByBusinessService.deleteOne(post.getId(), LocalDateTime.of(2021, 10, 4, 0, 0), userInBusinessProfile);
        assertThat(postRepository.findById(post.getId())).isEqualTo(Optional.empty());
        assertThat(postFileRepository.findById(postFile.getId())).isEqualTo(Optional.empty());
        assertThat(postLikeRepository.findById(postLike.getId())).isEqualTo(Optional.empty());
        assertThat(postDoDateRepository.findById(postDoDate1.getId())).isEqualTo(Optional.empty());
        assertThat(postDoDateRepository.findById(postDoDate2.getId())).isEqualTo(Optional.empty());
        assertThat(postDoDateRepository.findById(postDoDate3.getId())).isEqualTo(Optional.empty());
        assertThat(postApplicantRepository.findById(waitPostApplicant1.getId())).isEqualTo(Optional.empty());
        assertThat(postApplicantRepository.findById(waitPostApplicant2.getId())).isEqualTo(Optional.empty());
        assertThat(postApplicantRepository.findById(waitPostApplicant3.getId())).isEqualTo(Optional.empty());
        assertThat(postApplicantRepository.findById(approvePostApplicant1.getId())).isEqualTo(Optional.empty());
        assertThat(postApplicantRepository.findById(approvePostApplicant2.getId())).isEqualTo(Optional.empty());
    }

    private void resetEntityManager() {
        em.flush();
        em.clear();
    }
}