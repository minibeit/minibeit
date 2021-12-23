package com.minibeit.businessprofile.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.businessprofile.service.exception.UserBusinessProfileNotFoundException;
import com.minibeit.common.exception.InvalidOperationException;
import com.minibeit.file.domain.Avatar;
import com.minibeit.file.service.AvatarService;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BusinessProfileService {
    private final BusinessProfileRepository businessProfileRepository;
    private final UserBusinessProfileRepository userBusinessProfileRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final AvatarService avatarService;

    public BusinessProfileResponse.IdAndName create(BusinessProfileRequest.Create request, User user) {
        User findUser = userRepository.findByIdWithUserBusinessProfile(user.getId()).orElseThrow(UserNotFoundException::new);
        Avatar avatar = avatarService.upload(request.getAvatar());
        BusinessProfile businessProfile = BusinessProfile.create(request.toEntity(), avatar, findUser);
        BusinessProfile savedBusinessProfile = businessProfileRepository.save(businessProfile);

        return BusinessProfileResponse.IdAndName.build(savedBusinessProfile);
    }

    public BusinessProfileResponse.IdAndName update(Long businessProfileId, BusinessProfileRequest.Update request, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        if (request.isAvatarChanged()) {
            avatarService.deleteOne(businessProfile.getAvatar());
            Avatar file = avatarService.upload(request.getAvatar());
            businessProfile.updateAvatar(file);
        }
        businessProfile.update(request.toEntity(), user);
        return BusinessProfileResponse.IdAndName.build(businessProfile);
    }

    public void shareBusinessProfile(Long businessProfileId, Long invitedUserId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        User invitedUser = userRepository.findByIdWithUserBusinessProfile(invitedUserId).orElseThrow(UserNotFoundException::new);
        UserBusinessProfile userBusinessProfile = businessProfile.invite(invitedUser, businessProfile, user);

        userBusinessProfileRepository.save(userBusinessProfile);
    }

    public void cancelShare(Long businessProfileId, Long userId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        businessProfile.expel(user, userId);

        UserBusinessProfile userBusinessProfile = userBusinessProfileRepository.findByUserIdAndBusinessProfileId(userId, businessProfileId).orElseThrow(UserBusinessProfileNotFoundException::new);
        userBusinessProfileRepository.deleteById(userBusinessProfile.getId());
    }

    public void changeAdmin(Long businessProfileId, Long userId, User loginUser) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        User changeUser = userRepository.findByIdWithUserBusinessProfile(userId).orElseThrow(UserNotFoundException::new);
        businessProfile.changeAdmin(loginUser, changeUser);
    }

    public void leaveBusinessProfile(Long businessProfileId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        businessProfile.leaveValidate(user);

        UserBusinessProfile userBusinessProfile = userBusinessProfileRepository.findByUserIdAndBusinessProfileId(user.getId(), businessProfileId).orElseThrow(UserBusinessProfileNotFoundException::new);
        userBusinessProfileRepository.deleteById(userBusinessProfile.getId());
    }

    @Transactional(readOnly = true)
    public List<BusinessProfileResponse.GetList> getListIsMine(User user) {
        List<BusinessProfile> businessProfileList = businessProfileRepository.findAllByUserId(user.getId());

        return businessProfileList.stream().map(businessProfile -> BusinessProfileResponse.GetList.build(businessProfile, user)).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BusinessProfileResponse.GetOne getOne(Long businessProfileId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findByIdWithAdmin(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);

        return BusinessProfileResponse.GetOne.build(businessProfile, user);
    }

    public void delete(Long businessProfileId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);

        businessProfile.adminValidate(user);

        if (postRepository.existsByBusinessProfileId(businessProfileId)) {
            throw new InvalidOperationException("해당 비즈니스 프로필에 삭제되지 않은 게시물이 있습니다.");
        }
        avatarService.deleteOne(businessProfile.getAvatar());
        businessProfileRepository.deleteById(businessProfileId);
    }
}
