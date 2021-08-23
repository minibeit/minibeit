package com.minibeit.security.oauth;

import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.LinkedHashMap;
import java.util.Map;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String id;
    private String name;
    private String email;
    private SignupProvider signupProvider;

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if ("google".equals(registrationId)) {
            return ofGoogle(userNameAttributeName, attributes);
        }
        if ("kakao".equals(registrationId)) {
            return ofKakao(attributes);
        }
        throw new IllegalArgumentException("올바르지 않은 소셜 로그인 방법입니다!");
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .id((String) attributes.get(userNameAttributeName))
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .signupProvider(SignupProvider.GOOGLE)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofKakao(Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("kakao_account");
        String nickname = (String) ((LinkedHashMap) response.get("profile")).get("nickname");
        return OAuthAttributes.builder()
                .id(String.valueOf(attributes.get("id")))
                .name(nickname)
                .signupProvider(SignupProvider.KAKAO)
                .attributes(attributes)
                .nameAttributeKey("id")
                .build();
    }

    public User toEntity() {
        return User.builder()
                .oauthId(id)
                .role(Role.USER)
                .provider(signupProvider)
                .build();
    }
}
