package com.minibeit.message.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.minibeit.message.service.component.SmsProps;
import com.minibeit.user.service.integrate.UserVerificationCodes;
import com.minibeit.user.service.integrate.Users;
import com.minibeit.user.service.mock.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@DisplayName("SmsService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class SmsServiceUnitTest {
    @Mock
    SmsProps smsProps;
    @Mock
    Users users;
    @Mock
    UserVerificationCodes userVerificationCodes;
    @Mock
    RestTemplate restTemplate;
    @InjectMocks
    SmsService smsService;

    private static final String TEST = "test";

    @Test
    @DisplayName("인증 문자 전송 성공")
    public void sendSmsVerificationCodeSave() throws URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        given(smsProps.getFrom()).willReturn(TEST);
        given(smsProps.getAccessKey()).willReturn(TEST);
        given(smsProps.getSecretKey()).willReturn(TEST);
        given(users.getOne(any())).willReturn(MockUser.MockUser1.USER);
        given(userVerificationCodes.create(any(), any())).willReturn(MockUser.MockUser1.USER_VERIFICATION_CODE);
        given(restTemplate.postForObject(any(), any(), any())).willReturn(any());

        smsService.sendSmsVerificationCode(MockUser.MockUser1.PHONE_NUM, MockUser.MockUser1.ID);

        verify(userVerificationCodes, times(1)).create(any(), any());
    }
}
