package com.minibeit.user.service;

import com.minibeit.avatar.domain.Avatar;
import com.minibeit.avatar.service.AvatarService;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
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
    private final SchoolRepository schoolRepository;
    private final AvatarService avatarService;

    public void nicknameCheck(UserRequest.Nickname request) {
        if (userRepository.findByNickname(request.getNickname()).isPresent()) {
            throw new DuplicateNickNameException();
        }
    }

    public UserResponse.CreateOrUpdate update(UserRequest.Update request, User user) {
        User findUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);
        School school = schoolRepository.findById(request.getSchoolId()).orElseThrow(SchoolNotFoundException::new);
        findUser.nicknameDuplicateCheck(request.isNicknameChanged(), request.getNickname());

        User updatedUser = findUser.update(request, school);
        updateAvatar(request, user, findUser);

        return UserResponse.CreateOrUpdate.build(updatedUser, school.getId());
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

    private void updateAvatar(UserRequest.Update request, User user, User findUser) {
        if (request.isAvatarChanged()) {
            avatarService.deleteOne(user.getAvatar());
            Avatar file = avatarService.upload(request.getAvatar());
            findUser.updateAvatar(file);
        }
    }
}
