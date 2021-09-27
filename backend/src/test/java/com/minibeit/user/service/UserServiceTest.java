package com.minibeit.user.service;

import com.minibeit.MvcTest;
import com.minibeit.avatar.domain.Avatar;
import com.minibeit.common.component.file.S3Uploader;
import com.minibeit.school.domain.School;
import com.minibeit.security.token.TokenProvider;
import com.minibeit.user.domain.Gender;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.dto.UserRequest;
import com.minibeit.user.service.exception.DuplicateNickNameException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("dev")
@SpringBootTest
@Transactional
@DisplayName("사용자 비즈니스 흐름 테스트")
class UserServiceTest {

    @MockBean
    private S3Uploader s3Uploader;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("닉네임 중복 체크 - 성공")
    void nicknameCheck() {

        UserRequest.Nickname request = UserRequest.Nickname.builder().nickname("중복안된이름").build();

        userService.nicknameCheck(request);

    }
}