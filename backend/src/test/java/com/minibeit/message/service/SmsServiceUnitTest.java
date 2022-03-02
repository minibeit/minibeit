package com.minibeit.message.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.minibeit.message.service.SmsService;
import com.minibeit.message.service.component.SmsProps;
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
import org.springframework.web.client.RestTemplate;

import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
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
    UserRepository userRepository;
    @Mock
    UserVerificationCodeRepository userVerificationCodeRepository;
    @Mock
    RestTemplate restTemplate;
    @InjectMocks
    SmsService smsService;

    private static final String TEST = "test";

    @Test
    @DisplayName("인증 문자 재전송 성공")
    public void sendSmsVerificationCodeSave() throws URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        given(smsProps.getFrom()).willReturn(TEST);
        given(smsProps.getAccessKey()).willReturn(TEST);
        given(smsProps.getSecretKey()).willReturn(TEST);
        given(userRepository.findById(any())).willReturn(Optional.of(MockUser.MockUser1.USER));
        given(userVerificationCodeRepository.findByUserIdAndVerificationKinds(any(), any())).willReturn(Optional.empty());
        given(restTemplate.postForObject(any(), any(), any())).willReturn(any());

        smsService.sendSmsVerificationCode(MockUser.MockUser1.PHONE_NUM, MockUser.MockUser1.ID);

        verify(userVerificationCodeRepository, times(1)).save(any());
    }

    @Test
    @DisplayName("인증 문자 전송 성공")
    public void sendSmsVerificationCode() throws URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        given(smsProps.getFrom()).willReturn(TEST);
        given(smsProps.getAccessKey()).willReturn(TEST);
        given(smsProps.getSecretKey()).willReturn(TEST);
        given(userRepository.findById(any())).willReturn(Optional.of(MockUser.MockUser1.USER));
        given(userVerificationCodeRepository.findByUserIdAndVerificationKinds(any(), any())).willReturn(Optional.of(MockUser.MockUser1.USER_VERIFICATION_CODE));
        given(restTemplate.postForObject(any(), any(), any())).willReturn(any());

        smsService.sendSmsVerificationCode(MockUser.MockUser1.PHONE_NUM, MockUser.MockUser1.ID);

        verify(userVerificationCodeRepository, times(0)).save(any());
    }

    @Test
    @DisplayName("인증 문자 전송 실패 (해당 유저가 없는 경우)")
    public void sendSmsVerificationCodeFailUserNotFound() {
        given(userRepository.findById(any())).willReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> smsService.sendSmsVerificationCode(MockUser.MockUser1.PHONE_NUM, MockUser.MockUser1.ID));
    }
}
