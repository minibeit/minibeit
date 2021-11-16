package com.minibeit.user.service;

import com.minibeit.avatar.domain.Avatar;
import com.minibeit.avatar.service.AvatarService;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.UserEmailCode;
import com.minibeit.user.domain.repository.UserEmailCodeRepository;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.dto.UserRequest;
import com.minibeit.user.dto.UserResponse;
import com.minibeit.user.service.exception.*;
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
    private final SchoolRepository schoolRepository;
    private final UserEmailCodeRepository userEmailCodeRepository;
    private final AvatarService avatarService;
    private final BusinessProfileRepository businessProfileRepository;

    public UserResponse.CreateOrUpdate signup(UserRequest.Signup request, User user) {
        if (userRepository.findByNickname(request.getNickname()).isPresent()) {
            throw new DuplicateNickNameException();
        }
        User findUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);
        School school = schoolRepository.findById(request.getSchoolId()).orElseThrow(SchoolNotFoundException::new);
        Avatar avatar = avatarService.upload(request.getAvatar());
        User updatedUser = findUser.signup(request, school, avatar);

        return UserResponse.CreateOrUpdate.build(updatedUser, request.getSchoolId(), avatar);
    }

    public UserResponse.CreateOrUpdate update(UserRequest.Update request, User user) {
        User findUser = userRepository.findByIdWithAvatar(user.getId()).orElseThrow(UserNotFoundException::new);
        School school = schoolRepository.findById(request.getSchoolId()).orElseThrow(SchoolNotFoundException::new);

        if (request.isNicknameChanged()) {
            nickCheck(request.getNickname());
        }
        User updatedUser = findUser.update(request, school);

        Avatar avatar = findUser.getAvatar();
        if (request.isAvatarChanged()) {
            avatar = updateAvatar(request, findUser);
        }

        return UserResponse.CreateOrUpdate.build(updatedUser, school.getId(), avatar);
    }

    @Transactional(readOnly = true)
    public void emailVerification(Long userId, UserRequest.EmailVerification request) {
        UserEmailCode userEmailCode = userEmailCodeRepository.findById(userId).orElseThrow(UserEmailCodeNotFoundException::new);
        if (!userEmailCode.validate(request.getCode())) {
            throw new InvalidEmailCodeException();
        }
    }

    @Transactional(readOnly = true)
    public void nickNameCheck(UserRequest.Nickname request) {
        nickCheck(request.getNickname());
    }

    @Transactional(readOnly = true)
    public UserResponse.GetOne getMe(User user) {
        User findUser = userRepository.findByIdWithSchool(user.getId()).orElseThrow(UserNotFoundException::new);
        return UserResponse.GetOne.build(findUser);
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
        if (!businessProfileRepository.findAllByAdminId(user.getId()).isEmpty()) {
            throw new UserHaveBusinessProfile();
        }
        avatarService.deleteOne(user.getAvatar());
        userRepository.delete(user);
    }

    private Avatar updateAvatar(UserRequest.Update request, User findUser) {
        avatarService.deleteOne(findUser.getAvatar());
        Avatar avatar = avatarService.upload(request.getAvatar());
        findUser.updateAvatar(avatar);
        return avatar;
    }

    private void nickCheck(String nickname) {
        if (userRepository.findByNickname(nickname).isPresent()) {
            throw new DuplicateNickNameException();
        }
    }
}
