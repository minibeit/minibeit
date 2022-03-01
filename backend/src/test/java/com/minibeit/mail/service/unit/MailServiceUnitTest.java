package com.minibeit.mail.service.unit;

import com.minibeit.mail.service.CustomMailSender;
import com.minibeit.mail.service.MailService;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.domain.repository.UserVerificationCodeRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import com.minibeit.user.service.mock.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@DisplayName("MailService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class MailServiceUnitTest {
    @Mock
    UserRepository userRepository;
    @Mock
    UserVerificationCodeRepository userVerificationCodeRepository;
    @Mock
    CustomMailSender customMailSender;
    @InjectMocks
    MailService mailService;

    @Test
    @DisplayName("이메일 인증코드 재전송 성공")
    public void sendVerificationCode() {
        given(userRepository.findById(any())).willReturn(Optional.of(MockUser.MockUser1.USER));
        given(userVerificationCodeRepository.findByUserIdAndVerificationKinds(any(), any())).willReturn(Optional.of(MockUser.MockUser1.USER_VERIFICATION_CODE));

        mailService.sendVerificationCode(MockUser.MockUser1.ID, MockMail.MockMail1.EMAIL_VERIFICATION_REQUEST);
        verify(userVerificationCodeRepository, times(0)).save(any());
        verify(customMailSender).mailSend(any(), any(), any());
    }

    @Test
    @DisplayName("이메일 인증코드 전송 성공")
    public void sendVerificationCodeSave() {
        given(userRepository.findById(any())).willReturn(Optional.of(MockUser.MockUser1.USER));
        given(userVerificationCodeRepository.findByUserIdAndVerificationKinds(any(), any())).willReturn(Optional.empty());

        mailService.sendVerificationCode(MockUser.MockUser1.ID, MockMail.MockMail1.EMAIL_VERIFICATION_REQUEST);

        verify(userVerificationCodeRepository, times(1)).save(any());
        verify(customMailSender).mailSend(any(), any(), any());
    }

    @Test
    @DisplayName("이메일 인증코드 전송 실패 (해당 유저가 없는 경우)")
    public void sendVerificationCodeFailUserNotFound() {
        given(userRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> mailService.sendVerificationCode(MockUser.MockUser1.ID, MockMail.MockMail1.EMAIL_VERIFICATION_REQUEST));
    }
}
