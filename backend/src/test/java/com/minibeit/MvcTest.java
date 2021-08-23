package com.minibeit;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minibeit.config.WebMvcConfig;
import com.minibeit.security.oauth.CustomOAuth2UserService;
import com.minibeit.security.oauth.OAuth2SuccessHandler;
import com.minibeit.security.token.JwtAuthEntryPoint;
import com.minibeit.security.token.JwtProps;
import com.minibeit.security.token.TokenProvider;
import com.minibeit.security.userdetails.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureRestDocs
@Import({
        WebMvcConfig.class,
        TokenProvider.class,
        JwtProps.class,
        RestDocsConfig.class,
})
@WithMockCustomUser
public abstract class MvcTest {
    @Autowired
    protected MockMvc mvc;
    @Autowired
    protected ObjectMapper objectMapper;
    @MockBean
    protected CustomUserDetailsService customUserDetailsService;
    @MockBean
    protected JwtAuthEntryPoint jwtAuthEntryPoint;
    @MockBean
    protected OAuth2SuccessHandler oAuth2SuccessHandler;
    @MockBean
    protected CustomOAuth2UserService customOAuth2UserService;
}
