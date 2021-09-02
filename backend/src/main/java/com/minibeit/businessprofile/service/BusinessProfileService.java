package com.minibeit.businessprofile.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.businessprofile.service.exception.DuplicateShareException;
import com.minibeit.businessprofile.service.exception.UserBusinessProfileNotFoundException;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.file.domain.File;
import com.minibeit.file.service.FileService;
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
    private final FileService fileService;

    public BusinessProfileResponse.IdAndName create(BusinessProfileRequest.Create request, User user) {
        File avatar = fileService.upload(request.getAvatar());
        UserBusinessProfile userBusinessProfile = UserBusinessProfile.create(user);
        BusinessProfile businessProfile = BusinessProfile.create(request, userBusinessProfile, avatar);
        BusinessProfile savedBusinessProfile = businessProfileRepository.save(businessProfile);

        return BusinessProfileResponse.IdAndName.build(savedBusinessProfile);
    }

    @Transactional(readOnly = true)
    public List<BusinessProfileResponse.GetList> getListIsMine(Long userId) {
        List<BusinessProfile> businessProfileList = businessProfileRepository.findAllByUserId(userId);

        return businessProfileList.stream().map(BusinessProfileResponse.GetList::build).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BusinessProfileResponse.GetOne getOne(Long businessProfileId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);

        return BusinessProfileResponse.GetOne.build(businessProfile, user);
    }

    public BusinessProfileResponse.IdAndName update(Long businessProfileId, BusinessProfileRequest.Update request, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);

        permissionCheck(user, businessProfile);
        if (request.isAvatarChanged()) {
            fileService.deleteOne(businessProfile.getAvatar());
            File file = fileService.upload(request.getAvatar());
            businessProfile.updateAvatar(file);
        }
        businessProfile.update(request);
        return BusinessProfileResponse.IdAndName.build(businessProfile);
    }

    public void delete(Long businessProfileId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);


        permissionCheck(user, businessProfile);

        businessProfileRepository.deleteById(businessProfileId);

    }

    public List<BusinessProfileResponse.IdAndNickname> shareBusinessProfile(Long businessProfileId, BusinessProfileRequest.Share request,User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);

        permissionCheck(user, businessProfile);

        User userToShare = userRepository.findByNickname(request.getNickname()).orElseThrow(UserNotFoundException::new);

        duplicationCheck(request, businessProfile);
        UserBusinessProfile userBusinessProfile = UserBusinessProfile.createWithBusinessProfile(userToShare, businessProfile);
        userBusinessProfileRepository.save(userBusinessProfile);
        businessProfile.getUserBusinessProfileList().add(userBusinessProfile);

        return businessProfile.getUserBusinessProfileList().stream().map(BusinessProfileResponse.IdAndNickname::build).collect(Collectors.toList());
    }

    private void duplicationCheck(BusinessProfileRequest.Share request, BusinessProfile businessProfile) {
        if(businessProfile.getUserBusinessProfileList().stream().
                anyMatch(userBusinessProfile -> userBusinessProfile.getUser().getNickname().equals(request.getNickname()))){
            throw new DuplicateShareException();
        }
    }

    public void cancelShare(Long businessProfileId, BusinessProfileRequest.Share request,User user){
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);

        permissionCheck(user, businessProfile);

        User sharingUser = userRepository.findByNickname(request.getNickname()).orElseThrow(UserNotFoundException::new);
        UserBusinessProfile userBusinessProfile = userBusinessProfileRepository.findByUserIdAndBusinessProfileId(sharingUser.getId(), businessProfileId).orElseThrow(UserBusinessProfileNotFoundException::new);
        userBusinessProfileRepository.deleteById(userBusinessProfile.getId());
    }

    private void permissionCheck(User user, BusinessProfile businessProfile) {
        if (!businessProfile.getCreatedBy().getId().equals(user.getId())) {
            throw new PermissionException();
        }
    }
}
