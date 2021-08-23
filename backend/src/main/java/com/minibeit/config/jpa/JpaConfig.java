package com.minibeit.config.jpa;


import com.minibeit.user.domain.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaConfig {
    @Bean
    public AuditorAware<User> auditorProvider() {
        return new AuditorAwareImpl();
    }
}
