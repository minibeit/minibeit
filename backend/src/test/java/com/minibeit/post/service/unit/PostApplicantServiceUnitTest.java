package com.minibeit.post.service.unit;

import com.minibeit.mail.service.CustomMailSender;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.PostApplicantValidator;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.PostDoDateRepository;
import com.minibeit.post.domain.repository.PostLikeRepository;
import com.minibeit.post.service.PostApplicantService;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
import com.minibeit.post.service.exception.PostDoDateNotFoundException;
import com.minibeit.user.service.mock.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import static com.minibeit.post.service.unit.mock.MockPostApplicant.*;
import static com.minibeit.post.service.unit.mock.MockPostApplicant.MockPostApplicant1.POST_APPLICANT;
import static com.minibeit.post.service.unit.mock.MockPostApplicant.MockPostApplicant1.POST_DO_DATE;
import static com.minibeit.post.service.unit.mock.MockPostApplicant.MockPostApplicant2;
import static com.minibeit.post.service.unit.mock.MockPostDoDate.MockPostDoDate1;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@DisplayName("PostByBusinessService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class PostApplicantServiceUnitTest {
    @Mock
    PostDoDateRepository postDoDateRepository;
    @Mock
    PostApplicantRepository postApplicantRepository;
    @Mock
    PostLikeRepository postLikeRepository;
    @Mock
    PostApplicantValidator postApplicantValidator;
    @Mock
    CustomMailSender mailSender;
    @InjectMocks
    PostApplicantService postApplicantService;

    @Test
    @DisplayName("게시글 지원 성공")
    public void apply() {
        given(postDoDateRepository.findByIdWithPostAndApplicant(any())).willReturn(Optional.of(MockPostDoDate1.POST_DO_DATE));

        postApplicantService.apply(MockPostDoDate1.ID, MockUser.MockUser1.USER);

        verify(postApplicantValidator).applyValidate(any(), any(), any());
        verify(postApplicantRepository).save(any());
        verify(postLikeRepository).deleteByPostId(any());
    }

    @Test
    @DisplayName("게시글 지원 실패 (해당 날짜가 없는 경우)")
    public void applyFail() {
        given(postDoDateRepository.findByIdWithPostAndApplicant(any())).willReturn(Optional.empty());

        assertThrows(PostDoDateNotFoundException.class, () -> postApplicantService.apply(MockPostDoDate1.ID, MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("게시글 참여 완료 성공")
    public void applyComplete() {
        given(postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(any(), any())).willReturn(Optional.of(MockPostApplicant2.POST_APPLICANT));

        postApplicantService.applyComplete(MockPostDoDate1.ID, LocalDateTime.of(2022, 2, 13, 0, 0), MockUser.MockUser1.USER);

        verify(postApplicantValidator).completeValidate(any(), any(), any(), any());
        assertThat(MockPostApplicant2.POST_APPLICANT.getApplyStatus()).isEqualTo(ApplyStatus.COMPLETE);
    }

    @Test
    @DisplayName("게시글 참여 완료 실패 (해당 게시글이 없는 경우)")
    public void applyCompleteFail() {
        given(postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(any(), any())).willReturn(Optional.empty());

        assertThrows(PostApplicantNotFoundException.class, () -> postApplicantService.applyComplete(MockPostDoDate1.ID, LocalDateTime.of(2022, 2, 13, 0, 0), MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("게시글 지원 취소 성공 (지원자가 approve 상태일 때)")
    public void applyCancel() {
        given(postApplicantRepository.findByPostDoDateIdAndUserId(any(), any())).willReturn(Optional.of(MockPostApplicant1.POST_APPLICANT));
        given(postDoDateRepository.findByIdWithPostAndBusinessProfile(any())).willReturn(Optional.of(POST_DO_DATE));
        given(postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(any())).willReturn(Collections.singletonList(MockPostApplicant1.POST_APPLICANT));

        postApplicantService.applyCancel(MockPostDoDate1.ID, MockUser.MockUser1.USER);

        assertThat(POST_APPLICANT.isDel()).isTrue();
        assertNotNull(POST_APPLICANT.getDeletedAt());
        verify(mailSender).mailSend(any(), any(), any());
    }

    @Test
    @DisplayName("게시글 지원 취소 성공 (지원자가 approve 가 아닐 때)")
    public void applyCancelNotApprove() {
        given(postApplicantRepository.findByPostDoDateIdAndUserId(any(), any())).willReturn(Optional.of(MockPostApplicant2.POST_APPLICANT));

        postApplicantService.applyCancel(MockPostDoDate1.ID, MockUser.MockUser2.USER);

        assertThat(MockPostApplicant2.POST_APPLICANT.isDel()).isTrue();
        assertNotNull(MockPostApplicant2.POST_APPLICANT.getDeletedAt());
        verify(mailSender, times(0)).mailSend(any(), any(), any());
    }

    @Test
    @DisplayName("게시글 지원 취소 실패 (해당 지원자가 없는 경우)")
    public void applyCancelFailNotFoundApplicant() {
        given(postApplicantRepository.findByPostDoDateIdAndUserId(any(), any())).willReturn(Optional.empty());

        assertThrows(PostApplicantNotFoundException.class, () -> postApplicantService.applyCancel(MockPostDoDate1.ID, MockUser.MockUser2.USER));
    }

    @Test
    @DisplayName("게시글 지원 취소 실패 (해당 날짜가 없는 경우)")
    public void applyCancelFail() {
        given(postApplicantRepository.findByPostDoDateIdAndUserId(any(), any())).willReturn(Optional.of(POST_APPLICANT));
        given(postDoDateRepository.findByIdWithPostAndBusinessProfile(any())).willReturn(Optional.empty());

        assertThrows(PostDoDateNotFoundException.class, () -> postApplicantService.applyCancel(MockPostDoDate1.ID, MockUser.MockUser2.USER));
    }
}
