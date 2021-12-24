package com.minibeit.message.service.component;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;


@Setter
@Getter
@Configuration
@ConfigurationProperties("sms")
public class SmsProps {
    private String serviceId;
    private String accessKey;
    private String secretKey;
    private String from;
}
