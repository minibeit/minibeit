package com.minibeit.security.oauth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Configuration
public class OAuth2Config {
    @Bean
    public ClientRegistrationRepository clientRegistrationRepositoryOAuth2ClientProperties(OAuth2ClientProperties oAuth2ClientProperties,
                                                                                           @Value("${kakao.client.id}") String clientId,
                                                                                           @Value("${kakao.client.secret}") String clientSecret) {
        List<ClientRegistration> registrations = oAuth2ClientProperties.getRegistration().keySet().stream()
                .map(client -> getRegistration(oAuth2ClientProperties, client))
                .filter(Objects::nonNull).collect(Collectors.toList());

        ClientRegistration clientRegistration = CustomOAuth2Provider.KAKAO
                .getBuilder()
                .clientId(clientId)
                .clientSecret(clientSecret)
                .build();
        registrations.add(clientRegistration);

        return new InMemoryClientRegistrationRepository(registrations);
    }

    private ClientRegistration getRegistration(OAuth2ClientProperties clientProperties, String client) {
        if ("google".equals(client)) {
            OAuth2ClientProperties.Registration registration = clientProperties.getRegistration().get("google");
            return CommonOAuth2Provider.GOOGLE.getBuilder(client)
                    .clientId(registration.getClientId())
                    .clientSecret(registration.getClientSecret())
                    .build();
        }
        return null;
    }
}
