package com.minibeit.post.service;

import com.minibeit.avatar.domain.AvatarServer;
import com.minibeit.avatar.domain.AvatarType;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.common.component.file.S3Uploader;
import com.minibeit.common.dto.SavedFile;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostFileRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.dto.PostDto;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.post.dto.PostResponse;
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
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@SpringBootTest
@Transactional
@DisplayName("비즈니스 프로필 Post Service 테스트")
class PostByBusinessServiceTest {
    @Autowired
    private PostByBusinessService postByBusinessService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostDoDateRepository postDoDateRepository;
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private PostFileRepository postFileRepository;
    @Autowired
    private BusinessProfileRepository businessProfileRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserBusinessProfileRepository userBusinessProfileRepository;
    @MockBean
    private S3Uploader s3Uploader;
    @PersistenceContext
    private EntityManager entityManager;

    private User userInBusinessProfile;
    private User anotherUser;
    private School school;
    private BusinessProfile businessProfile;
    private PostRequest.CreateInfo createInfoRequest;
    private Post post;
    private Post postWithImage;
    private final SavedFile savedFile = new SavedFile("original", "files", "100", 10L, "avatar.com", 12, 10, true, AvatarType.IMAGE, AvatarServer.S3);

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
        userRepository.saveAll(Arrays.asList(userInBusinessProfile, anotherUser));

        businessProfile = BusinessProfile.builder()
                .name("동그라미 실험실")
                .place("고려대")
                .contact("010-1234-5786")
                .admin(userInBusinessProfile)
                .build();
        businessProfileRepository.save(businessProfile);
        userBusinessProfileRepository.save(UserBusinessProfile.createWithBusinessProfile(userInBusinessProfile, businessProfile));
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
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(LocalDateTime.of(2021, 9, 26, 17, 30)).build()))
                .build();
    }

    private void initPost() {
        Post createdPost = Post.create(createInfoRequest, school, businessProfile);
        post = postRepository.save(createdPost);
    }

    @Test
    @DisplayName("게시글 생성 - 성공")
    void createInfo() {
        PostResponse.OnlyId response = postByBusinessService.createInfo(createInfoRequest, userInBusinessProfile);

        Post findPost = postRepository.findById(response.getId()).orElseThrow(PostNotFoundException::new);

        assertThat(findPost.getTitle()).isEqualTo(createInfoRequest.getTitle());
    }

    @Test
    @DisplayName("게시글 생성 - 실패(비즈니스프로필에 없는 유저)")
    void createInfoNotBusinessProfile() {
        assertThatThrownBy(() -> postByBusinessService.createInfo(createInfoRequest, anotherUser))
                .isExactlyInstanceOf(PermissionException.class);
    }

    @Test
    @DisplayName("게시글에 파일 추가 - 성공")
    void addFiles() throws IOException {
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile file = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is.readAllBytes());
        PostRequest.AddFile addFileRequest = PostRequest.AddFile.builder().files(Collections.singletonList(file)).build();

        given(s3Uploader.uploadFileList(any())).willReturn(Collections.singletonList(savedFile));

        postByBusinessService.addFiles(post.getId(), addFileRequest, userInBusinessProfile);

        verify(s3Uploader, times(1)).uploadFileList(any());
    }

    @Test
    @DisplayName("게시글에 파일 추가 - 실패(게시물이 없는 경우)")
    void addFilesNotFoundPost() throws IOException {
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile file = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is.readAllBytes());
        PostRequest.AddFile addFileRequest = PostRequest.AddFile.builder().files(Collections.singletonList(file)).build();

        given(s3Uploader.uploadFileList(any())).willReturn(Collections.singletonList(savedFile));

        assertThatThrownBy(() -> postByBusinessService.addFiles(9999L, addFileRequest, userInBusinessProfile))
                .isExactlyInstanceOf(PostNotFoundException.class);
    }
}