package com.minibeit.post.service.unit;

import com.minibeit.mail.service.CustomMailSender;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.PostApplicantValidator;
import com.minibeit.post.domain.repository.PostApplicantRepository;
import com.minibeit.post.domain.repository.RejectPostRepository;
import com.minibeit.post.service.PostApplicantByBusinessService;
import com.minibeit.post.service.dto.PostApplicantResponse;
import com.minibeit.post.service.exception.PostApplicantNotFoundException;
import com.minibeit.post.service.unit.mock.MockPost;
import com.minibeit.post.service.unit.mock.MockPostApplicant;
import com.minibeit.post.service.unit.mock.MockPostDoDate;
import com.minibeit.user.service.unit.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("PostApplicantByBusinessService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class PostApplicantByBusinessServiceUnitTest {
    @Mock
    PostApplicantRepository postApplicantRepository;
    @Mock
    RejectPostRepository rejectPostRepository;
    @Mock
    PostApplicantValidator postApplicantValidator;
    @Mock
    CustomMailSender mailSender;
    @InjectMocks
    PostApplicantByBusinessService postApplicantByBusinessService;

    @Test
    @DisplayName("지원자 approve 성공")
    public void applyApprove() {
        given(postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(any(), any())).willReturn(Optional.of(MockPostApplicant.MockPostApplicant3.POST_APPLICANT));
        given(postApplicantRepository.findAllByUserIdAndDoDateAndStatusIsApprove(any(), any())).willReturn(Collections.singletonList(MockPostApplicant.MockPostApplicant2.POST_APPLICANT));
        given(postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(any())).willReturn(List.of(MockPostApplicant.MockPostApplicant2.POST_APPLICANT, MockPostApplicant.MockPostApplicant3.POST_APPLICANT));

        postApplicantByBusinessService.applyApprove(MockPostDoDate.MockPostDoDate1.ID, MockUser.MockUser3.ID, MockUser.MockUser1.USER);

        assertThat(MockPostApplicant.MockPostApplicant3.POST_APPLICANT.getApplyStatus()).isEqualTo(ApplyStatus.APPROVE);
        verify(postApplicantValidator).applyApproveValidate(any(), any(), any(), any(), any());
        verify(mailSender).mailSend(any(), any(), any());
    }

    @Test
    @DisplayName("지원자 approve 실패(해당 지원자가 없는 경우)")
    public void applyApproveFail() {
        given(postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(any(), any())).willReturn(Optional.empty());

        assertThrows(PostApplicantNotFoundException.class, () -> postApplicantByBusinessService.applyApprove(MockPostDoDate.MockPostDoDate1.ID, MockUser.MockUser3.ID, MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("지원자 approve 취소 성공")
    public void applyApproveCancel() {
        given(postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(any(), any())).willReturn(Optional.of(MockPostApplicant.MockPostApplicant3.POST_APPLICANT));
        given(postApplicantRepository.findAllByPostDoDateIdAndStatusIsApprove(any())).willReturn(List.of(MockPostApplicant.MockPostApplicant2.POST_APPLICANT, MockPostApplicant.MockPostApplicant3.POST_APPLICANT));

        postApplicantByBusinessService.applyApproveCancel(MockPostDoDate.MockPostDoDate1.ID, MockUser.MockUser3.ID, MockUser.MockUser1.USER);

        assertThat(MockPostApplicant.MockPostApplicant3.POST_APPLICANT.getApplyStatus()).isEqualTo(ApplyStatus.WAIT);
        verify(postApplicantValidator).userInBusinessProfileValidate(any(), any());
        verify(mailSender).mailSend(any(), any(), any());
    }

    @Test
    @DisplayName("지원자 approve 취소 실패(해당 지원자가 없는 경우)")
    public void applyApproveCancelFail() {
        given(postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(any(), any())).willReturn(Optional.empty());

        assertThrows(PostApplicantNotFoundException.class, () -> postApplicantByBusinessService.applyApproveCancel(MockPostDoDate.MockPostDoDate1.ID, MockUser.MockUser3.ID, MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("지원자 반려 성공")
    public void applyReject() {
        given(postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(any(), any())).willReturn(Optional.of(MockPostApplicant.MockPostApplicant3.POST_APPLICANT));

        postApplicantByBusinessService.applyReject(MockPostDoDate.MockPostDoDate1.ID, MockUser.MockUser3.ID, MockPostApplicant.MockPostApplicant3.APPLY_REJECT_REQUEST, MockUser.MockUser1.USER);

        assertThat(MockPostApplicant.MockPostApplicant3.POST_APPLICANT.getApplyStatus()).isEqualTo(ApplyStatus.REJECT);
        verify(postApplicantValidator).userInBusinessProfileValidate(any(), any());
        verify(rejectPostRepository).save(any());
        verify(mailSender).mailSend(any(), any(), any());
    }

    @Test
    @DisplayName("지원자 반려 실패 (해당 지원자가 없는 경우)")
    public void applyRejectFail() {
        given(postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(any(), any())).willReturn(Optional.empty());

        assertThrows(PostApplicantNotFoundException.class, () -> postApplicantByBusinessService.applyReject(MockPostDoDate.MockPostDoDate1.ID, MockUser.MockUser3.ID, MockPostApplicant.MockPostApplicant3.APPLY_REJECT_REQUEST, MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("지원자 참여 상태 변경 성공")
    public void attendChange() {
        given(postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(any(), any())).willReturn(Optional.of(MockPostApplicant.MockPostApplicant3.POST_APPLICANT));

        postApplicantByBusinessService.attendChange(MockPostDoDate.MockPostDoDate1.ID, MockUser.MockUser3.ID, MockPostApplicant.MockPostApplicant3.ATTEND_CHANGE_REQUEST, MockUser.MockUser1.USER);

        assertThat(MockPostApplicant.MockPostApplicant3.POST_APPLICANT.isBusinessFinish()).isFalse();
        verify(postApplicantValidator).userInBusinessProfileValidate(any(), any());
    }

    @Test
    @DisplayName("지원자 참여 상태 변경 실패 (해당 지원자가 없는 경우)")
    public void attendChangeFail() {
        given(postApplicantRepository.findByPostDoDateIdAndUserIdWithPostDoDateAndPost(any(), any())).willReturn(Optional.empty());

        assertThrows(PostApplicantNotFoundException.class, () -> postApplicantByBusinessService.attendChange(MockPostDoDate.MockPostDoDate1.ID, MockUser.MockUser3.ID, MockPostApplicant.MockPostApplicant3.ATTEND_CHANGE_REQUEST, MockUser.MockUser1.USER));
    }

    @Test
    @DisplayName("날짜, 지원 상태에 따라 지원자 목록 조회 성공")
    public void getApplicantListByDate() {
        given(postApplicantRepository.findAllByPostAndDoDate(any(), any(), any())).willReturn(Collections.singletonList(PostApplicantResponse.ApplicantInfo.builder().build()));

        postApplicantByBusinessService.getApplicantListByDate(MockPost.MockPost1.ID, ApplyStatus.APPROVE, LocalDate.of(2022, 2, 14));

        verify(postApplicantRepository).findAllByPostAndDoDate(any(), any(), any());
    }
}
