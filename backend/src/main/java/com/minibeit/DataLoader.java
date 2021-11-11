package com.minibeit;

import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.user.domain.Gender;
import com.minibeit.user.domain.Role;
import com.minibeit.user.domain.SignupProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Profile("local")
public class DataLoader implements CommandLineRunner {
    private final UserRepository userRepository;
    private final SchoolRepository schoolRepository;

    @Override
    public void run(String... args) {
        if (userRepository.findAll().isEmpty()) {
            List<User> users = new ArrayList<>();
            for (int i = 1; i < 100; i++) {
                User user = User.builder().oauthId(String.valueOf(i)).school(schoolRepository.findById(1L).get()).name("테스터" + i).job("테스트하는사람").gender(Gender.MALE).provider(SignupProvider.MINIBEIT).nickname("테스터" + i).phoneNum("010-1234-1234").role(Role.USER).birth(LocalDate.of(2000, 12, 12)).signupCheck(true).build();
                users.add(user);
            }
            userRepository.saveAll(users);
        }
    }
}
