package com.minibeit.post.service.unit;

import com.minibeit.auth.domain.CustomUserDetails;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostLikeRepository;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.post.service.PostService;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.post.service.unit.mock.MockPageDto;
import com.minibeit.post.service.unit.mock.MockPostDoDate;
import com.minibeit.user.service.unit.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.Collections;
import java.util.Optional;

import static com.minibeit.post.service.unit.mock.MockPost.MockPost1.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("PostService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class PostServiceUnitTest {
    @Mock
    PostRepository postRepository;
    @Mock
    PostDoDateRepository postDoDateRepository;
    @Mock
    PostLikeRepository postLikeRepository;
    @InjectMocks
    PostService postService;

    @Test
    @DisplayName("즐겨찾기 추가 성공")
    public void createPostLike() {
        given(postLikeRepository.findByPostIdAndUserId(any(), any())).willReturn(Optional.empty());
        given(postRepository.findById(any())).willReturn(Optional.of(POST));

        postService.createOrDeletePostLike(ID, MockUser.MockUser1.USER);

        verify(postLikeRepository).save(any());
    }

    @Test
    @DisplayName("즐겨찾기 취소 성공")
    public void deletePostLike() {
        given(postLikeRepository.findByPostIdAndUserId(any(), any())).willReturn(Optional.of(POST_LIKE));
        given(postRepository.findById(any())).willReturn(Optional.of(POST));

        postService.createOrDeletePostLike(ID, MockUser.MockUser1.USER);

        verify(postLikeRepository).delete(any());
    }

    @Test
    @DisplayName("즐겨찾기 추가,취소 실패 (해당 게시물이 없는 경우)")
    public void createOrDeletePostLikeFail() {
        given(postLikeRepository.findByPostIdAndUserId(any(), any())).willReturn(Optional.of(POST_LIKE));
        given(postRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(PostNotFoundException.class, () -> postService.createOrDeletePostLike(ID, MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("게시글 단건 조회 성공")
    public void getOne() {
        given(postRepository.findGetOneByPostId(any())).willReturn(Optional.of(POST));

        postService.getOne(ID, CustomUserDetails.create(MockUser.MockUser1.USER));

        verify(postRepository).findGetOneByPostId(any());
    }

    @Test
    @DisplayName("게시글 단건 조회 실패 (해당 게시물이 없는 경우)")
    public void getOneFail() {
        given(postRepository.findGetOneByPostId(any())).willReturn(Optional.empty());

        assertThrows(PostNotFoundException.class, () -> postService.getOne(ID, CustomUserDetails.create(MockUser.MockUser1.USER)));
    }

    @Test
    @DisplayName("날짜에 따른 해당 게시물의 시작 시간 목록 조회 성공")
    public void getPostStartTimeList() {
        given(postDoDateRepository.findAllByPostIdAndDoDate(any(), any())).willReturn(Collections.singletonList(MockPostDoDate.MockPostDoDate1.POST_DO_DATE));

        postService.getPostStartTimeList(ID, LocalDate.of(2022, 2, 13));

        verify(postDoDateRepository).findAllByPostIdAndDoDate(any(), any());
    }

    @Test
    @DisplayName("해당 연/월에 따른 게시물 참여 가능 날짜 목록 조회 성공")
    public void getDoDateListByYearMonth() {
        given(postDoDateRepository.findAllByPostIdAndYearMonth(any(), any())).willReturn(Collections.singletonList(MockPostDoDate.MockPostDoDate1.POST_DO_DATE));

        postService.getDoDateListByYearMonth(ID, YearMonth.of(2022, 2));

        verify(postDoDateRepository).findAllByPostIdAndYearMonth(any(), any());
    }

    @Test
    @DisplayName("게시물 목록 조회 성공")
    public void getList() {
        given(postRepository.findAllBySchoolIdAndDoDate(any(), any(), any(), any(), any(), any(), any(), any(), any()))
                .willReturn(new PageImpl<>(Collections.singletonList(POST)));

        postService.getList(SCHOOL.getId(), LocalDate.of(2022, 2, 13), CATEGORY, MockPageDto.MockPageDto1.PAGE_DTO, PAYMENT, LocalTime.of(9, 30), LocalTime.of(10, 30), 10, DO_TIME, CustomUserDetails.create(MockUser.MockUser1.USER));

        verify(postRepository).findAllBySchoolIdAndDoDate(any(), any(), any(), any(), any(), any(), any(), any(), any());
    }

    @Test
    @DisplayName("게시물 즐겨찾기 목록 조회 성공")
    public void getListByLike() {
        given(postRepository.findAllByLike(any(), any())).willReturn(new PageImpl<>(Collections.singletonList(POST)));

        postService.getListByLike(MockUser.MockUser1.USER, MockPageDto.MockPageDto1.PAGE_DTO);

        verify(postRepository).findAllByLike(any(), any());
    }

    @Test
    @DisplayName("게시물 상태에 따른 자신의 게시물 개수 조회 성공")
    public void getMyPostStatus() {
        given(postRepository.countMyPostStatusByApplyStatus(any(), any(), any())).willReturn(PostResponse.GetMyCount.builder().build());

        postService.getMyPostStatus(ApplyStatus.WAIT, LocalDateTime.of(2022, 2, 13, 0, 0), MockUser.MockUser1.USER);

        verify(postRepository).countMyPostStatusByApplyStatus(any(), any(), any());
    }

    @Test
    @DisplayName("지원 상태에 따른 자신의 게시물 목록 조회 성공")
    public void getListByApplyStatus() {
        given(postRepository.findAllByApplyStatus(any(), any(), any(), any())).willReturn(new PageImpl<>(Collections.singletonList(GET_MY_APPLY_LIST)));

        postService.getListByApplyStatus(ApplyStatus.WAIT, MockUser.MockUser1.USER, LocalDateTime.of(2022, 2, 13, 0, 0), MockPageDto.MockPageDto1.PAGE_DTO);

        verify(postRepository).findAllByApplyStatus(any(), any(), any(), any());
    }
}
