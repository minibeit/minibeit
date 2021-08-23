package com.minibeit;

import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Profile("dev")
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (userRepository.findByOauthId(String.valueOf(1)).isEmpty()) {
            User user = User.builder().oauthId(String.valueOf(1)).provider(SignupProvider.MINIBEIT).role(Role.USER).signupCheck(false).build();
            userRepository.save(user);
        }
    }
}
