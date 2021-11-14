package com.minibeit.post.service;

import com.minibeit.ServiceIntegrationTest;
import com.minibeit.common.dto.PageDto;
import com.minibeit.post.domain.RejectPost;
import com.minibeit.post.domain.repository.RejectPostRepository;
import com.minibeit.post.dto.RejectPostResponse;
import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("RejectPost Service 흐름 테스트")
class RejectPostServiceTest extends ServiceIntegrationTest {
    @Autowired
    private RejectPostService rejectPostService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RejectPostRepository rejectPostRepository;

    private User testUser;
    private RejectPost rejectPost;

    @BeforeEach
    public void init() {
        initUser();
    }

    private void initUser() {
        User user = User.builder()
                .oauthId("1")
                .nickname("동그라미")
                .role(Role.USER)
                .signupCheck(true)
                .provider(SignupProvider.KAKAO)
                .build();
        testUser = userRepository.save(user);
    }

    private void initRejectPost() {
        RejectPost createRejectPost = RejectPost.builder()
                .title("반려된 게시물 제목")
                .place("고려대")
                .contact("010-1234-1234")
                .doTime(120)
                .doDate(LocalDateTime.of(2021, 10, 5, 12, 0))
                .rejectComment("모집조건에 해당하지 않습니다.")
                .user(testUser)
                .build();
        rejectPost = rejectPostRepository.save(createRejectPost);
    }

    private void initRejectPostList() {
        for (int i = 1; i <= 3; i++) {
            RejectPost createRejectPost = RejectPost.builder()
                    .title("반려" + i)
                    .place("고려대")
                    .contact("010-1234-1234")
                    .doTime(120)
                    .doDate(LocalDateTime.of(2021, 10, 5, i, 0))
                    .rejectComment("모집조건에 해당하지 않습니다.")
                    .user(testUser)
                    .build();
            rejectPostRepository.save(createRejectPost);
        }
    }

    @Test
    @DisplayName("반려게시물 목록 조회 - 성공")
    void getList() {
        initRejectPostList();
        PageDto pageDto = new PageDto(1, 5);
        Page<RejectPostResponse.GetList> response = rejectPostService.getList(pageDto, testUser);

        assertThat(response.getContent()).extracting("title").containsExactlyElementsOf(Arrays.asList("반려1", "반려2", "반려3"));
    }

    @Test
    @DisplayName("반려게시물 삭제 - 성공")
    void deleteOne() {
        initRejectPost();
        rejectPostService.deleteOne(rejectPost.getId(), testUser);

        Optional<RejectPost> response = rejectPostRepository.findById(rejectPost.getId());

        assertThat(response).isEqualTo(Optional.empty());
    }
}