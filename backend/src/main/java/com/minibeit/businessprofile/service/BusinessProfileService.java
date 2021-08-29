package com.minibeit.businessprofile.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
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
    public BusinessProfileResponse.GetOne getOne(Long businessProfileId) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);

        return BusinessProfileResponse.GetOne.build(businessProfile);
    }

    public BusinessProfileResponse.IdAndName update(Long businessProfileId, BusinessProfileRequest.Update request) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        //TODO 기획이 확정되면 수정권한 처리 필요
        if (request.isAvatarChanged()) {
            fileService.deleteOne(businessProfile.getAvatar());
            File file = fileService.upload(request.getAvatar());
            businessProfile.updateAvatar(file);
        }
        businessProfile.update(request);
        return BusinessProfileResponse.IdAndName.build(businessProfile);
    }

    public void delete(Long businessProfileId) {
        //TODO 기획이 확정되면 삭제권한 처리 필요
        businessProfileRepository.deleteById(businessProfileId);
    }

    public void shareBusinessProfile(Long businessProfileId, BusinessProfileRequest.Share request) {
        //TODO 비즈니스프로필을 만든사람만 초대할 수 있는지 , 비즈니스 프로필을 가지고 있는 사람 모두가 초대할 수 있는지 정해지면 초대권한 처리 필요
        User user = userRepository.findByNickname(request.getNickname()).orElseThrow(UserNotFoundException::new);
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        UserBusinessProfile userBusinessProfile = UserBusinessProfile.createWithBusinessProfile(user, businessProfile);
        userBusinessProfileRepository.save(userBusinessProfile);
    }
}
