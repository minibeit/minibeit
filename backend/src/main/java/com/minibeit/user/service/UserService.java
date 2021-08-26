package com.minibeit.user.service;

import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.security.token.RefreshTokenService;
import com.minibeit.security.token.Token;
import com.minibeit.security.token.TokenProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.UserSchool;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.domain.repository.UserSchoolRepository;
import com.minibeit.user.dto.UserRequest;
import com.minibeit.user.dto.UserResponse;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    private final TokenProvider tokenProvider;
    private final SchoolRepository schoolRepository;
    private final UserSchoolRepository userSchoolRepository;

    //테스트용
    public UserResponse.Login login(UserRequest.Login request) {
        User user = userRepository.findByOauthId(request.getId()).orElseThrow(UserNotFoundException::new);

        Token refreshToken = refreshTokenService.createOrUpdateRefreshToken(user);
        return UserResponse.Login.build(user.getId(), user.getName(), tokenProvider.generateAccessToken(user), refreshToken);
    }

    public UserResponse.OnlyId signup(UserRequest.Signup request, User user) {
        User findUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);
        List<School> schoolList = schoolRepository.findAllById(request.getSchoolIdList());
        List<UserSchool> userSchoolList = schoolList.stream().map(UserSchool::create).collect(Collectors.toList());
        userSchoolRepository.saveAll(userSchoolList);
        //TODO nickname 중복 막는 로직 처리
        findUser.signup(request);
        return UserResponse.OnlyId.builder().id(findUser.getId()).build();
    }

    @Transactional(readOnly = true)
    public UserResponse.GetOne getMe(User user) {
        return UserResponse.GetOne.build(userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new));
    }

    public void logout(User user) {
        refreshTokenService.deleteRefreshTokenByUser(user);
    }
}
