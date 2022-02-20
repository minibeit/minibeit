package com.minibeit.post.service.unit;

import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.post.domain.PostFileService;
import com.minibeit.post.domain.PostValidator;
import com.minibeit.post.domain.repository.*;
import com.minibeit.post.service.PostByBusinessService;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.post.service.exception.PostNotFoundException;
import com.minibeit.post.service.unit.mock.MockPageDto;
import com.minibeit.post.service.unit.mock.MockPostApplicant;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.user.service.exception.SchoolNotFoundException;
import com.minibeit.user.service.unit.MockUser;
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

import static com.minibeit.post.service.unit.mock.MockPost.MockPost1.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@DisplayName("PostByBusinessService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class PostByBusinessServiceUnitTest {
    @Mock
    PostRepository postRepository;
    @Mock
    SchoolRepository schoolRepository;
    @Mock
    BusinessProfileRepository businessProfileRepository;
    @Mock
    PostApplicantRepository postApplicantRepository;
    @Mock
    RejectPostRepository rejectPostRepository;
    @Mock
    PostValidator postValidator;
    @Mock
    PostLikeRepository postLikeRepository;
    @Mock
    PostFileService postFileService;
    @InjectMocks
    PostByBusinessService postByBusinessService;

    @Test
    @DisplayName("게시글 생성 성공(썸네일, 썸네일 이외의 파일 모두 저장)")
    public void create() {
        given(schoolRepository.findById(any())).willReturn(Optional.of(SCHOOL));
        given(businessProfileRepository.findById(any())).willReturn(Optional.of(BUSINESS_PROFILE));
        given(postRepository.save(any())).willReturn(POST);

        postByBusinessService.create(CREATE_INFO_REQUEST, Collections.singletonList(MOCK_FILE), MOCK_FILE, MockUser.MockUser1.USER);

        verify(postValidator).userInBusinessProfileValidate(any(), any());
        verify(postRepository).save(any());
        verify(postFileService).uploadThumbnail(any(), any());
        verify(postFileService).uploadFiles(any(), any());
    }

    @Test
    @DisplayName("게시글 생성 성공(썸네일만 저장)")
    public void createWithoutFile() {
        given(schoolRepository.findById(any())).willReturn(Optional.of(SCHOOL));
        given(businessProfileRepository.findById(any())).willReturn(Optional.of(BUSINESS_PROFILE));
        given(postRepository.save(any())).willReturn(POST);

        postByBusinessService.create(CREATE_INFO_REQUEST, null, MOCK_FILE, MockUser.MockUser1.USER);

        verify(postValidator).userInBusinessProfileValidate(any(), any());
        verify(postRepository).save(any());
        verify(postFileService).uploadThumbnail(any(), any());
        verify(postFileService).uploadFiles(any(), any());
    }

    @Test
    @DisplayName("게시글 생성 성공(썸네일이 없는 경우)")
    public void createWithoutThumbnail() {
        given(schoolRepository.findById(any())).willReturn(Optional.of(SCHOOL));
        given(businessProfileRepository.findById(any())).willReturn(Optional.of(BUSINESS_PROFILE));
        given(postRepository.save(any())).willReturn(POST);

        postByBusinessService.create(CREATE_INFO_REQUEST, null, null, MockUser.MockUser1.USER);

        verify(postValidator).userInBusinessProfileValidate(any(), any());
        verify(postRepository).save(any());
        verify(postFileService).uploadThumbnail(any(), any());
        verify(postFileService).uploadFiles(any(), any());
    }


    @Test
    @DisplayName("게시글 생성 실패 (해당 학교가 없는 경우)")
    public void createFailSchoolNotFound() {
        given(schoolRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(SchoolNotFoundException.class, () -> postByBusinessService.create(CREATE_INFO_REQUEST, Collections.singletonList(MOCK_FILE), MOCK_FILE, MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("게시글 생성 실패 (해당 학교가 없는 경우)")
    public void createFailBusinessProfileNotFound() {
        given(schoolRepository.findById(any())).willReturn(Optional.of(SCHOOL));
        given(businessProfileRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(BusinessProfileNotFoundException.class, () -> postByBusinessService.create(CREATE_INFO_REQUEST, Collections.singletonList(MOCK_FILE), MOCK_FILE, MockUser.MockUser1.USER));
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
