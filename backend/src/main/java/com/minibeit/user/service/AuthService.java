package com.minibeit.user.service;

import com.minibeit.avatar.domain.Avatar;
import com.minibeit.avatar.service.AvatarService;
import com.minibeit.interests.domain.Interests;
import com.minibeit.interests.domain.InterestsRepository;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.security.token.RefreshTokenService;
import com.minibeit.security.token.Token;
import com.minibeit.security.token.TokenProvider;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.UserInterests;
import com.minibeit.user.domain.repository.UserInterestsRepository;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.dto.AuthRequest;
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
public class AuthService {
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    private final TokenProvider tokenProvider;
    private final SchoolRepository schoolRepository;
    private final InterestsRepository interestsRepository;
    private final UserInterestsRepository userInterestsRepository;
    private final AvatarService avatarService;

    //테스트용
    public UserResponse.Login login(AuthRequest.Login request) {
        User user = userRepository.findByOauthId(request.getId()).orElseThrow(UserNotFoundException::new);

        Token refreshToken = refreshTokenService.createOrUpdateRefreshToken(user);
        return UserResponse.Login.build(user.getId(), user.getName(), tokenProvider.generateAccessToken(user), refreshToken);
    }

    public UserResponse.CreateOrUpdate signup(AuthRequest.Signup request, User user) {
        if (userRepository.findByNickname(request.getNickname()).isPresent()) {
            throw new DuplicateNickNameException();
        }
        User findUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);
        School school = schoolRepository.findById(request.getSchoolId()).orElseThrow(SchoolNotFoundException::new);
        List<Interests> interests = interestsRepository.findAllByIds(request.getInterestsIds());
        List<UserInterests> userInterestsList = interests.stream().map(interest -> UserInterests.create(interest, user)).collect(Collectors.toList());

        userInterestsRepository.saveAll(userInterestsList);
        Avatar avatar = avatarService.upload(request.getAvatar());
        User updatedUser = findUser.signup(request, school, avatar);

        return UserResponse.CreateOrUpdate.build(updatedUser, request.getSchoolId());
    }

    public void logout(User user) {
        refreshTokenService.deleteRefreshTokenByUser(user);
    }
}
