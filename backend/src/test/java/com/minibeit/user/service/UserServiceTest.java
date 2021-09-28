package com.minibeit.user.service;

import com.minibeit.MvcTest;
import com.minibeit.avatar.domain.Avatar;
import com.minibeit.avatar.domain.AvatarServer;
import com.minibeit.avatar.domain.AvatarType;
import com.minibeit.avatar.service.AvatarService;
import com.minibeit.common.component.file.S3Uploader;
import com.minibeit.common.dto.SavedFile;
import com.minibeit.school.domain.School;
import com.minibeit.security.token.TokenProvider;
import com.minibeit.user.domain.Gender;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.dto.UserRequest;
import com.minibeit.user.dto.UserResponse;
import com.minibeit.user.service.exception.DuplicateNickNameException;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.SneakyThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

@ActiveProfiles("dev")
@SpringBootTest
@Transactional
@DisplayName("사용자 비즈니스 흐름 테스트")
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @MockBean
    private AvatarService avatarService;



    @Test
    @DisplayName("닉네임 중복 체크 - 성공")
    void nicknameCheck() {

        UserRequest.Nickname request = UserRequest.Nickname.builder().nickname("중복안된이름").build();

        userService.nicknameCheck(request);

    }

    @Test
    @DisplayName("닉네임 중복 체크 - 실패(중복된 이름)")
    void nicknameCheckFailureWhenDuplicateNickname(){

        UserRequest.Nickname request = UserRequest.Nickname.builder().nickname("테스터1").build();

        assertThatThrownBy(() -> userService.nicknameCheck(request))
                .isInstanceOf(DuplicateNickNameException.class);
    }

    @Test
    @DisplayName("유저 정보 업데이트 - 성공")
    void allUpdate() throws IOException {
        //given
        User user = userRepository.findById(1L).orElseThrow(UserNotFoundException::new);
        InputStream is = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MultipartFile multipartFile = new MockMultipartFile("files", "avatar.jpg", "image/jpg", is);

        UserRequest.Update updateInfo = UserRequest.Update.builder()
                .name("새로운")
                .nickname("뉴닉네임")
                .nicknameChanged(true)
                .gender(Gender.MALE)
                .phoneNum("010-1234-5432")
                .job("대학생")
                .schoolId(1L)
                .birth(LocalDate.of(2222, 1, 1))
                .avatar(multipartFile)
                .avatarChanged(true).build();
        SavedFile savedFile = new SavedFile("original", "files", "100", 10L, "avatar.com", 12, 10, true, AvatarType.IMAGE, AvatarServer.S3);

        Avatar avatar = Avatar.create(savedFile);

        given(avatarService.upload(any())).willReturn(avatar);
        userService.update(updateInfo, user);
        //then
        User updatedUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);

        assertThat(updatedUser.getNickname()).isEqualTo(updateInfo.getNickname());
        assertThat(updatedUser.getAvatar().getName()).isEqualTo(avatar.getName());
        assertThat(updatedUser.getBirth()).isEqualTo(updateInfo.getBirth());
        assertThat(updatedUser.getJob()).isEqualTo(updateInfo.getJob());
        assertThat(updatedUser.getPhoneNum()).isEqualTo(updateInfo.getPhoneNum());
        assertThat(updatedUser.getGender()).isEqualTo(updateInfo.getGender());
    }
}