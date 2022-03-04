package com.minibeit.mail.service;

import com.minibeit.mail.service.mock.MockMail;
import com.minibeit.user.service.integrate.UserVerificationCodes;
import com.minibeit.user.service.integrate.Users;
import com.minibeit.user.service.mock.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("MailService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class MailServiceUnitTest {
    @Mock
    Users users;
    @Mock
    UserVerificationCodes userVerificationCodes;
    @Mock
    CustomMailSender customMailSender;
    @InjectMocks
    MailService mailService;

    @Test
    @DisplayName("이메일 인증코드 전송 성공")
    public void sendVerificationCode() {
        given(users.getOne(any())).willReturn(MockUser.MockUser1.USER);
        given(userVerificationCodes.create(any(), any())).willReturn(MockUser.MockUser1.USER_VERIFICATION_CODE);

        mailService.sendVerificationCode(MockUser.MockUser1.ID, MockMail.MockMail1.EMAIL_VERIFICATION_REQUEST);

        verify(userVerificationCodes).create(any(), any());
        verify(customMailSender).mailSend(any(), any(), any());
    }
}
