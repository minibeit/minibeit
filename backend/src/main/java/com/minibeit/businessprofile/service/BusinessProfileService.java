package com.minibeit.businessprofile.service;

import com.minibeit.avatar.domain.Avatar;
import com.minibeit.avatar.service.AvatarService;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.exception.*;
import com.minibeit.common.exception.PermissionException;
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
        User findUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);

        List<BusinessProfile> businessProfileOfShareUser = businessProfileRepository.findAllByUserId(user.getId());

        if (businessProfileOfShareUser.size() >= 3) {
            throw new BusinessProfileCountExceedException();
        }

        Avatar avatar = avatarService.upload(request.getAvatar());
        UserBusinessProfile userBusinessProfile = UserBusinessProfile.create(findUser);
        BusinessProfile businessProfile = BusinessProfile.create(request, userBusinessProfile, avatar, findUser);
        BusinessProfile savedBusinessProfile = businessProfileRepository.save(businessProfile);

        return BusinessProfileResponse.IdAndName.build(savedBusinessProfile);
    }

    public BusinessProfileResponse.IdAndName update(Long businessProfileId, BusinessProfileRequest.Update request, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);

        permissionCheck(user, businessProfile);
        if (request.isAvatarChanged()) {
            avatarService.deleteOne(businessProfile.getAvatar());
            Avatar file = avatarService.upload(request.getAvatar());
            businessProfile.updateAvatar(file);
        }
        businessProfile.update(request);
        return BusinessProfileResponse.IdAndName.build(businessProfile);
    }

    public void shareBusinessProfile(Long businessProfileId, Long invitedUserId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);

        permissionCheck(user, businessProfile);

        User userToShare = userRepository.findById(invitedUserId).orElseThrow(UserNotFoundException::new);

        List<BusinessProfile> businessProfileOfShareUser = businessProfileRepository.findAllByUserId(userToShare.getId());
        if (businessProfileOfShareUser.contains(businessProfile)) {
            throw new DuplicateShareException();
        }
        if (businessProfileOfShareUser.size() >= 3) {
            throw new BusinessProfileCountExceedException();
        }

        UserBusinessProfile userBusinessProfile = UserBusinessProfile.createWithBusinessProfile(userToShare, businessProfile);

        userBusinessProfileRepository.save(userBusinessProfile);
    }

    public void cancelShare(Long businessProfileId, Long userId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        permissionCheck(user, businessProfile);
        if (businessProfile.getAdmin().getId().equals(userId)) {
            throw new BusinessProfileAdminCantCancelException();
        }

        UserBusinessProfile userBusinessProfile = userBusinessProfileRepository.findByUserIdAndBusinessProfileId(userId, businessProfileId).orElseThrow(UserBusinessProfileNotFoundException::new);
        userBusinessProfileRepository.deleteById(userBusinessProfile.getId());
    }

    public void changeAdmin(Long businessProfileId, Long userId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        permissionCheck(user, businessProfile);
        if (!isExistInBusinessProfile(businessProfileId, userId)) {
            throw new UserNotFoundException();
        }
        User changeUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        businessProfile.changeAdmin(changeUser);
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

    public void goOutBusinessProfile(Long businessProfileId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        if (businessProfile.getAdmin().getId().equals(user.getId())) {
            throw new BusinessProfileAdminCantCancelException();
        }

        UserBusinessProfile userBusinessProfile = userBusinessProfileRepository.findByUserIdAndBusinessProfileId(user.getId(), businessProfileId).orElseThrow(UserBusinessProfileNotFoundException::new);
        userBusinessProfileRepository.deleteById(userBusinessProfile.getId());
    }

    public void delete(Long businessProfileId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);

        permissionCheck(user, businessProfile);

        if (postRepository.existsByBusinessProfileId(businessProfileId)) {
            throw new BusinessProfileInWork();
        }
        avatarService.deleteOne(businessProfile.getAvatar());
        businessProfileRepository.deleteById(businessProfileId);
    }

    private void permissionCheck(User user, BusinessProfile businessProfile) {
        if (!businessProfile.getAdmin().getId().equals(user.getId())) {
            throw new PermissionException();
        }
    }

    private boolean isExistInBusinessProfile(Long businessProfileId, Long userId) {
        return userBusinessProfileRepository.existsByUserIdAndBusinessProfileId(userId, businessProfileId);
    }
}
