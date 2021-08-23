package com.minibeit.security.token;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Getter
@Configuration
@ConfigurationProperties("jwt")
public class JwtProps {
    private AccessTokenProps accessTokenProps = new AccessTokenProps();
    private RefreshTokenProps refreshTokenProps = new RefreshTokenProps();

    @Setter
    @Getter
    @Configuration
    @ConfigurationProperties("access-token-props")
    public static class AccessTokenProps implements TokenProps {
        private String secret;
        private Long expirationTimeMilliSec;
    }

    @Setter
    @Getter
    @Configuration
    @ConfigurationProperties("refresh-token-props")
    public static class RefreshTokenProps implements TokenProps {
        private String secret;
        private Long expirationTimeMilliSec;
    }

    public interface TokenProps {
        String getSecret();
        Long getExpirationTimeMilliSec();
    }
}
