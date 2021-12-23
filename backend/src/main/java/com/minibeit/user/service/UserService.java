package com.minibeit.user.service;

import com.minibeit.avatar.domain.Avatar;
import com.minibeit.avatar.service.AvatarService;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.common.exception.DuplicateException;
import com.minibeit.common.exception.InvalidOperationException;
import com.minibeit.school.domain.School;
import com.minibeit.school.domain.SchoolRepository;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.UserVerificationCode;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.domain.repository.UserVerificationCodeRepository;
import com.minibeit.user.service.exception.SchoolNotFoundException;
import com.minibeit.user.service.exception.UserNotFoundException;
import com.minibeit.user.service.exception.UserVerificationCodeNotFoundException;
import com.minibeit.user.service.dto.UserRequest;
import com.minibeit.user.service.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final SchoolRepository schoolRepository;
    private final UserVerificationCodeRepository userVerificationCodeRepository;
    private final AvatarService avatarService;
    private final BusinessProfileRepository businessProfileRepository;

    public UserResponse.CreateOrUpdate signup(UserRequest.Signup request, User user) {
        nickCheck(request.getNickname());

        User findUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);
        School school = schoolRepository.findById(request.getSchoolId()).orElseThrow(SchoolNotFoundException::new);
        Avatar avatar = avatarService.upload(request.getAvatar());
        User updatedUser = findUser.signup(request.toEntity(), school, avatar);

        return UserResponse.CreateOrUpdate.build(updatedUser, request.getSchoolId(), avatar);
    }

    public UserResponse.CreateOrUpdate update(UserRequest.Update request, User user) {
        User findUser = userRepository.findByIdWithAvatar(user.getId()).orElseThrow(UserNotFoundException::new);
        School school = schoolRepository.findById(request.getSchoolId()).orElseThrow(SchoolNotFoundException::new);

        if (request.isNicknameChanged()) {
            nickCheck(request.getNickname());
        }
        User updatedUser = findUser.update(request.toEntity(), school);

        Avatar avatar = findUser.getAvatar();
        if (request.isAvatarChanged()) {
            avatar = updateAvatar(request, findUser);
        }

        return UserResponse.CreateOrUpdate.build(updatedUser, school.getId(), avatar);
    }

    @Transactional(readOnly = true)
    public UserResponse.Verification codeVerification(Long userId, UserRequest.Verification request) {
        UserVerificationCode userVerificationCode = userVerificationCodeRepository.findByUserIdAndVerificationKinds(userId, request.getVerificationKinds())
                .orElseThrow(UserVerificationCodeNotFoundException::new);
        userVerificationCode.validate(request.getCode());

        return UserResponse.Verification.build(userVerificationCode.getUser());
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
            throw new InvalidOperationException("관리자로 있는 비즈니스 프로필이 존재합니다.");
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
        if (userRepository.existsByNickname(nickname)) {
            throw new DuplicateException("증복된 닉네임입니다.");
        }
    }
}
