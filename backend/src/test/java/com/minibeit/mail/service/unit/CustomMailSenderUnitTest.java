package com.minibeit.mail.service.unit;

import com.minibeit.mail.service.CustomMailSender;
import com.minibeit.user.service.mock.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;
import org.thymeleaf.spring5.SpringTemplateEngine;

import static com.minibeit.mail.service.unit.MockMail.MockMail1.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("CustomMailSender 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class CustomMailSenderUnitTest {
    @Mock
    JavaMailSender mailSender;
    @Mock
    SpringTemplateEngine templateEngine;
    @InjectMocks
    CustomMailSender customMailSender;

    @Test
    @DisplayName("메일 전송 성공")
    public void mailSend() {
        given(mailSender.createMimeMessage()).willReturn(MIME_MESSAGE);

        customMailSender.mailSend(MAIL_CONDITION, TO_MAIL_LIST, MockUser.MockUser1.USER_VERIFICATION_CODE);

        verify(mailSender).send(MIME_MESSAGE);
    }
}
