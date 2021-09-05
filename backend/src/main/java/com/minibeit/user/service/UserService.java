package com.minibeit.user.service;

import com.minibeit.file.domain.File;
import com.minibeit.file.service.FileService;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.security.token.RefreshTokenService;
import com.minibeit.security.token.Token;
import com.minibeit.security.token.TokenProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.dto.UserRequest;
import com.minibeit.user.dto.UserResponse;
import com.minibeit.user.service.exception.DuplicateNickNameException;
import com.minibeit.user.service.exception.SchoolNotFoundException;
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
    private final FileService fileService;

    //테스트용
    public UserResponse.Login login(UserRequest.Login request) {
        User user = userRepository.findByOauthId(request.getId()).orElseThrow(UserNotFoundException::new);

        Token refreshToken = refreshTokenService.createOrUpdateRefreshToken(user);
        return UserResponse.Login.build(user.getId(), user.getName(), tokenProvider.generateAccessToken(user), refreshToken);
    }

    public UserResponse.CreateOrUpdate signup(UserRequest.Signup request, User user) {
        if (userRepository.findByNickname(request.getNickname()).isPresent()) {
            throw new DuplicateNickNameException();
        }
        User findUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);
        School school = schoolRepository.findById(request.getSchoolId()).orElseThrow(SchoolNotFoundException::new);
        File avatar = fileService.upload(request.getAvatar());
        User updatedUser = findUser.signup(request, school, avatar);

        return UserResponse.CreateOrUpdate.build(updatedUser, request.getSchoolId());
    }

    @Transactional(readOnly = true)
    public UserResponse.GetOne getMe(User user) {
        return UserResponse.GetOne.build(userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new));
    }

    public void logout(User user) {
        refreshTokenService.deleteRefreshTokenByUser(user);
    }

    public UserResponse.CreateOrUpdate update(UserRequest.Update request, User user) {
        User findUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);
        School school = schoolRepository.findById(request.getSchoolId()).orElseThrow(SchoolNotFoundException::new);
        findUser.nicknameDuplicateCheck(request.isNicknameChanged(), request.getNickname());

        User updatedUser = findUser.update(request, school);
        updateAvatar(request, user, findUser);

        return UserResponse.CreateOrUpdate.build(updatedUser, school.getId());
    }

    public List<UserResponse.IdAndNickname> getListInBusinessProfile(Long businessProfileId){
        List<User> users = userRepository.findAllInBusinessProfile(businessProfileId);
        return users.stream().map(UserResponse.IdAndNickname::build).collect(Collectors.toList());
    }

    private void updateAvatar(UserRequest.Update request, User user, User findUser) {
        if (request.isAvatarChanged()) {
            fileService.deleteOne(user.getAvatar());
            File file = fileService.upload(request.getAvatar());
            findUser.updateAvatar(file);
        }
    }
}
