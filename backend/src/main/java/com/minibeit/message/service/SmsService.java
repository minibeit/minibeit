package com.minibeit.message.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minibeit.message.service.component.SmsProps;
import com.minibeit.message.service.dto.MessageDto;
import com.minibeit.message.service.dto.SmsMessageRequest;
import com.minibeit.message.service.dto.SmsResponse;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.UserVerificationCode;
import com.minibeit.user.domain.VerificationKinds;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.domain.repository.UserVerificationCodeRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class SmsService {
    private final SmsProps smsProps;
    private final UserRepository userRepository;
    private final UserVerificationCodeRepository userVerificationCodeRepository;

    public SmsResponse sendSmsVerificationCode(String receiverPhoneNumber, Long userId) throws JsonProcessingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException {
        Long time = System.currentTimeMillis();
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        UserVerificationCode userVerificationCode = UserVerificationCode.create(user, VerificationKinds.PHONE);
        Optional<UserVerificationCode> optionalUserVerificationCode = userVerificationCodeRepository.findByUserIdAndVerificationKinds(user.getId(), VerificationKinds.PHONE);

        if (optionalUserVerificationCode.isPresent()) {
            optionalUserVerificationCode.get().update(userVerificationCode);
        } else {
            userVerificationCodeRepository.save(userVerificationCode);
        }

        String content = "[미니바이트] 인증번호 [" + userVerificationCode.getCode() + "] 를 입력해주세요.";
        List<MessageDto> messageDtoList = MessageDto.build(receiverPhoneNumber, content);

        SmsMessageRequest smsMessageRequest = SmsMessageRequest.makeSmsRequest(smsProps.getFrom(), messageDtoList);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(smsMessageRequest);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time.toString());
        headers.set("x-ncp-iam-access-key", smsProps.getAccessKey());
        String sig = makeSignature(time);
        headers.set("x-ncp-apigw-signature-v2", sig);

        HttpEntity<String> body = new HttpEntity<>(jsonBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());

        return restTemplate.postForObject(new URI("https://sens.apigw.ntruss.com/sms/v2/services/" + smsProps.getServiceId() + "/messages"), body, SmsResponse.class);
    }

    private String makeSignature(Long time) throws NoSuchAlgorithmException, InvalidKeyException {
        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/" + smsProps.getServiceId() + "/messages";
        String timestamp = time.toString();
        String accessKey = smsProps.getAccessKey();
        String secretKey = smsProps.getSecretKey();

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));

        return Base64.encodeBase64String(rawHmac);
    }
}
