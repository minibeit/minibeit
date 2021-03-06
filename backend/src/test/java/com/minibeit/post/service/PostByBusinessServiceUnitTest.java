package com.minibeit.post.service;

import com.minibeit.businessprofile.service.integrate.BusinessProfiles;
import com.minibeit.post.domain.repository.*;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.post.service.integrate.PostFiles;
import com.minibeit.post.service.mock.MockPageDto;
import com.minibeit.post.service.mock.MockPostApplicant;
import com.minibeit.post.service.mock.MockPostFile;
import com.minibeit.school.service.integrate.Schools;
import com.minibeit.user.service.mock.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import static com.minibeit.post.service.mock.MockPost.MockPost1.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("PostByBusinessService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class PostByBusinessServiceUnitTest {
    @Mock
    PostRepository postRepository;
    @Mock
    PostDoDateRepository postDoDateRepository;
    @Mock
    PostApplicantRepository postApplicantRepository;
    @Mock
    RejectPostRepository rejectPostRepository;
    @Mock
    PostValidator postValidator;
    @Mock
    PostLikeRepository postLikeRepository;
    @Mock
    Schools schools;
    @Mock
    BusinessProfiles businessProfiles;
    @Mock
    PostFiles postFiles;
    @InjectMocks
    PostByBusinessService postByBusinessService;

    @Test
    @DisplayName("게시글 생성 성공(썸네일, 썸네일 이외의 파일 모두 저장)")
    public void create() {
        given(schools.getOne(any())).willReturn(SCHOOL);
        given(businessProfiles.getOne(any())).willReturn(BUSINESS_PROFILE);
        given(postRepository.save(any())).willReturn(POST);
        given(postFiles.upload(any(), any())).willReturn(MockPostFile.MockPostFile1.POST_FILE);
        given(postFiles.uploadFiles(any(), any())).willReturn(MockPostFile.MockPostFile1.POST_FILE_LIST);

        postByBusinessService.create(CREATE_INFO_REQUEST, Collections.singletonList(MOCK_FILE), MOCK_FILE, MockUser.MockUser1.USER);

        verify(postValidator).userInBusinessProfileValidate(any(), any());
        verify(postFiles).upload(any(), any());
        verify(postFiles).uploadFiles(any(), any());
        verify(postRepository).save(any());
    }

    @Test
    @DisplayName("게시글 모집완료 성공")
    public void recruitmentCompleted() {
        given(postRepository.findByIdWithBusinessProfile(any())).willReturn(Optional.of(POST));
        given(postApplicantRepository.findAllByPostIdAndApplyStatus(any(), any())).willReturn(Collections.singletonList(MockPostApplicant.MockPostApplicant1.POST_APPLICANT));

        postByBusinessService.recruitmentCompleted(ID, REJECT_COMMENT_REQUEST, MockUser.MockUser1.USER);

        verify(postValidator).userInBusinessProfileValidate(any(), any());
        verify(postApplicantRepository).updateReject(any(), any());
        verify(rejectPostRepository).saveAll(any());
    }

    @Test
    @DisplayName("게시글 모집완료 실패 (해당 게시글이 없는 경우)")
    public void recruitmentCompletedFailNotFoundPost() {
        given(postRepository.findByIdWithBusinessProfile(any())).willReturn(Optional.empty());

        assertThrows(PostNotFoundException.class, () -> postByBusinessService.recruitmentCompleted(ID, REJECT_COMMENT_REQUEST, MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("해당 비즈니스 프로필의 상태에 따른 게시글 목록 조회 성공")
    public void getListByBusinessProfile() {
        given(postRepository.findAllByBusinessProfileId(any(), any(), any())).willReturn(new PageImpl<>(Collections.singletonList(POST)));

        postByBusinessService.getListByBusinessProfile(BUSINESS_PROFILE.getId(), POST_STATUS, MockPageDto.MockPageDto1.PAGE_DTO);

        verify(postRepository).findAllByBusinessProfileId(any(), any(), any());
    }

    @Test
    @DisplayName("해당 비즈니스 프로필의 모집공고 현황 조회 성공")
    public void getCountBusinessCompletePostAndReview() {
        given(postRepository.countByBusinessPostStatus(any(), any())).willReturn(PostResponse.GetBusinessStatus.builder().build());

        postByBusinessService.getCountBusinessCompletePostAndReview(POST_STATUS.name(), BUSINESS_PROFILE.getId());

        verify(postRepository).countByBusinessPostStatus(any(), any());
    }

    @Test
    @DisplayName("게시글 내용 수정 성공")
    public void updateContent() {
        given(postRepository.findById(any())).willReturn(Optional.of(POST));

        postByBusinessService.updateContent(ID, UPDATE_CONTENT_REQUEST, MockUser.MockUser1.USER);

        assertThat(POST.getContent()).isEqualTo(UPDATE_CONTENT_REQUEST.getUpdatedContent());
        verify(postValidator).userInBusinessProfileValidate(any(), any());
    }

    @Test
    @DisplayName("게시글 내용 수정 실패 (해당 게시글이 없는 경우)")
    public void updateContentFail() {
        given(postRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(PostNotFoundException.class, () -> postByBusinessService.updateContent(ID, UPDATE_CONTENT_REQUEST, MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("게시글 삭제 성공")
    public void deleteOne() {
        given(postRepository.findById(any())).willReturn(Optional.of(POST));

        postByBusinessService.deleteOne(ID, LocalDateTime.of(2022, 2, 13, 0, 0), MockUser.MockUser1.USER);

        verify(postValidator).deleteValidate(any(), any(), any(), any());
        verify(postLikeRepository).deleteAllByPostId(any());
        assertThat(POST.isDel()).isEqualTo(true);
        assertNotNull(POST.getDeletedAt());
    }

    @Test
    @DisplayName("게시글 삭제 실패 (해당 게시글이 없는 경우)")
    public void deleteOneFail() {
        given(postRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(PostNotFoundException.class, () -> postByBusinessService.deleteOne(ID, LocalDateTime.of(2022, 2, 13, 0, 0), MockUser.MockUser1.USER));
    }
}
