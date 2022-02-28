package com.minibeit.businessprofile.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.BusinessValidator;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.service.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.service.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.businessprofile.service.exception.UserBusinessProfileNotFoundException;
import com.minibeit.user.domain.Avatar;
import com.minibeit.user.service.AvatarService;
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
    private final AvatarService avatarService;
    private final BusinessValidator businessValidator;

    public BusinessProfileResponse.IdAndName create(BusinessProfileRequest.Create request, User user) {
        User findUser = userRepository.findByIdWithUserBusinessProfileAndBusiness(user.getId()).orElseThrow(UserNotFoundException::new);
        businessValidator.createValidate(findUser.getUserBusinessProfileList());

        Avatar avatar = avatarService.upload(request.getAvatar());
        BusinessProfile businessProfile = BusinessProfile.create(request.toEntity(), avatar, findUser);
        BusinessProfile savedBusinessProfile = businessProfileRepository.save(businessProfile);

        return BusinessProfileResponse.IdAndName.build(savedBusinessProfile);
    }

    public BusinessProfileResponse.IdAndName update(Long businessProfileId, BusinessProfileRequest.Update request, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        businessValidator.adminValidate(businessProfile, user);
        if (request.isAvatarChanged()) {
            avatarService.deleteOne(businessProfile.getAvatar());
            Avatar file = avatarService.upload(request.getAvatar());
            businessProfile.updateAvatar(file);
        }
        businessProfile.update(request.toEntity());
        return BusinessProfileResponse.IdAndName.build(businessProfile);
    }

    public void invite(Long businessProfileId, Long invitedUserId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        User invitedUser = userRepository.findByIdWithUserBusinessProfileAndBusiness(invitedUserId).orElseThrow(UserNotFoundException::new);
        businessValidator.inviteValidate(businessProfile, invitedUser.getUserBusinessProfileList(), user);

        UserBusinessProfile userBusinessProfile = UserBusinessProfile.createWithBusinessProfile(invitedUser, businessProfile);

        userBusinessProfileRepository.save(userBusinessProfile);
    }

    public void expel(Long businessProfileId, Long userId, User loginUser) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        businessValidator.expelValidate(businessProfile, userId, loginUser);
        UserBusinessProfile userBusinessProfile = userBusinessProfileRepository.findByUserIdAndBusinessProfileId(userId, businessProfileId).orElseThrow(UserBusinessProfileNotFoundException::new);
        userBusinessProfileRepository.deleteById(userBusinessProfile.getId());
    }

    public void changeAdmin(Long businessProfileId, Long userId, User loginUser) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        User changeUser = userRepository.findByIdWithUserBusinessProfileAndBusiness(userId).orElseThrow(UserNotFoundException::new);
        businessValidator.changeAdminValidate(businessProfile, loginUser, changeUser.getUserBusinessProfileList());

        businessProfile.changeAdmin(changeUser);
    }

    public void leave(Long businessProfileId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        businessValidator.isAdmin(businessProfile, user.getId());

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

        businessValidator.deleteValidate(businessProfile, user);

        avatarService.deleteOne(businessProfile.getAvatar());
        businessProfileRepository.deleteById(businessProfileId);
    }
}
