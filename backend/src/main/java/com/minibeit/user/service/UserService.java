package com.minibeit.user.service;

import com.minibeit.school.domain.School;
import com.minibeit.school.service.integrate.Schools;
import com.minibeit.user.domain.Avatar;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.UserValidator;
import com.minibeit.user.domain.UserVerificationCode;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.domain.repository.UserVerificationCodeRepository;
import com.minibeit.user.service.dto.UserRequest;
import com.minibeit.user.service.dto.UserResponse;
import com.minibeit.user.service.exception.UserNotFoundException;
import com.minibeit.user.service.exception.UserVerificationCodeNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserVerificationCodeRepository userVerificationCodeRepository;
    private final Schools schools;
    private final AvatarService avatarService;
    private final UserValidator userValidator;

    public UserResponse.CreateOrUpdate signup(UserRequest.Signup request, User user) {
        userValidator.nicknameValidate(request.getNickname());

        User findUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);
        School school = schools.getOne(request.getSchoolId());

        Avatar avatar = avatarService.upload(request.getAvatar());
        User updatedUser = findUser.signup(request.toEntity(), school, avatar);

        return UserResponse.CreateOrUpdate.build(updatedUser, request.getSchoolId());
    }

    public UserResponse.CreateOrUpdate update(UserRequest.Update request, User user) {
        userValidator.updateValidate(request.getNickname(), request.isNicknameChanged());

        User findUser = userRepository.findByIdWithAvatar(user.getId()).orElseThrow(UserNotFoundException::new);
        School school = schools.getOne(request.getSchoolId());

        User updatedUser = findUser.update(request.toEntity(), school);
        avatarService.update(request.isAvatarChanged(), request.getAvatar(), findUser);

        return UserResponse.CreateOrUpdate.build(updatedUser, school.getId());
    }

    @Transactional(readOnly = true)
    public UserResponse.Verification codeVerification(Long userId, UserRequest.Verification request, LocalDateTime now) {
        UserVerificationCode userVerificationCode = userVerificationCodeRepository.findByUserIdAndVerificationKinds(userId, request.getVerificationKinds())
                .orElseThrow(UserVerificationCodeNotFoundException::new);
        userValidator.verificationCodeValidate(userVerificationCode, request.getCode(), now);

        return UserResponse.Verification.build(userVerificationCode.getUser());
    }

    @Transactional(readOnly = true)
    public void nickNameCheck(UserRequest.Nickname request) {
        userValidator.nicknameValidate(request.getNickname());
    }

    @Transactional(readOnly = true)
    public UserResponse.GetOne getMe(User user) {
        User findUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);
        School school = schools.getOne(findUser.getSchoolId());
        return UserResponse.GetOne.build(findUser, school);
    }

    @Transactional(readOnly = true)
    public List<UserResponse.IdAndNickname> getListInBusinessProfile(Long businessProfileId) {
        List<User> users = userRepository.findAllInBusinessProfile(businessProfileId);
        return users.stream().map(UserResponse.IdAndNickname::build).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<UserResponse.IdAndNickname> searchByNickname(String nickname) {
        List<User> users = userRepository.findByNicknameStartsWith(nickname);
        return users.stream().map(UserResponse.IdAndNickname::build).collect(Collectors.toList());
    }

    public void deleteOne(User user) {
        User findUser = userRepository.findByIdWithAvatar(user.getId()).orElseThrow(UserNotFoundException::new);
        userValidator.deleteValidate(findUser.getId());
        avatarService.deleteOne(findUser.getAvatar());
        userRepository.delete(findUser);
    }
}
