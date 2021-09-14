package com.minibeit.businessprofile.service;

import com.minibeit.avatar.domain.Avatar;
import com.minibeit.avatar.service.AvatarService;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.businessprofile.domain.repository.BusinessProfileRepository;
import com.minibeit.businessprofile.domain.repository.UserBusinessProfileRepository;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.businessprofile.dto.BusinessProfileResponse;
import com.minibeit.businessprofile.service.exception.BusinessProfileNotFoundException;
import com.minibeit.businessprofile.service.exception.DuplicateShareException;
import com.minibeit.businessprofile.service.exception.UserBusinessProfileNotFoundException;
import com.minibeit.common.dto.PageDto;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.repository.PostRepository;
import com.minibeit.user.domain.User;
import com.minibeit.user.domain.repository.UserRepository;
import com.minibeit.user.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final AvatarService avatarService;

    public BusinessProfileResponse.IdAndName create(BusinessProfileRequest.Create request, User user) {
        User findUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);
        Avatar avatar = avatarService.upload(request.getAvatar());
        UserBusinessProfile userBusinessProfile = UserBusinessProfile.create(findUser);
        BusinessProfile businessProfile = BusinessProfile.create(request, userBusinessProfile, avatar, findUser);
        BusinessProfile savedBusinessProfile = businessProfileRepository.save(businessProfile);

        return BusinessProfileResponse.IdAndName.build(savedBusinessProfile);
    }

    //user의 bsuinessProfile list 조회
    @Transactional(readOnly = true)
    public List<BusinessProfileResponse.GetList> getListIsMine(Long userId) {
        List<BusinessProfile> businessProfileList = businessProfileRepository.findAllByUserId(userId);

        return businessProfileList.stream().map(BusinessProfileResponse.GetList::build).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BusinessProfileResponse.GetOne getOne(Long businessProfileId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        long numberOfEmployees = userRepository.findAllInBusinessProfile(businessProfileId).size();

        return BusinessProfileResponse.GetOne.build(businessProfile, numberOfEmployees, user);
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

    public void delete(Long businessProfileId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);

        permissionCheck(user, businessProfile);

        businessProfileRepository.deleteById(businessProfileId);
    }

    public void shareBusinessProfile(Long businessProfileId, BusinessProfileRequest.Share request, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);

        permissionCheck(user, businessProfile);

        User userToShare = userRepository.findByNickname(request.getNickname()).orElseThrow(UserNotFoundException::new);

        if (userBusinessProfileRepository.existsByUserIdAndBusinessProfileId(userToShare.getId(), businessProfileId)) {
            throw new DuplicateShareException();
        }
        UserBusinessProfile userBusinessProfile = UserBusinessProfile.createWithBusinessProfile(userToShare, businessProfile);

        userBusinessProfileRepository.save(userBusinessProfile);
    }

    public void cancelShare(Long businessProfileId, Long userId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        permissionCheck(user, businessProfile);

        UserBusinessProfile userBusinessProfile = userBusinessProfileRepository.findByUserIdAndBusinessProfileId(userId, businessProfileId).orElseThrow(UserBusinessProfileNotFoundException::new);
        userBusinessProfileRepository.deleteById(userBusinessProfile.getId());
    }

    public void transferOfAuthority(Long businessProfileId, Long userId, User user) {
        BusinessProfile businessProfile = businessProfileRepository.findById(businessProfileId).orElseThrow(BusinessProfileNotFoundException::new);
        permissionCheck(user, businessProfile);
        User changeUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        businessProfile.changeAdmin(changeUser);
    }


    public Page<BusinessProfileResponse.PostList> postList(Long businessProfileId, PageDto pageDto){
        Page<Post> posts = postRepository.findAllByBusinessProfileId(businessProfileId, pageDto.of(), pageDto.getSort());
        List<BusinessProfileResponse.PostList> postLists = posts.stream().map(BusinessProfileResponse.PostList::build).collect(Collectors.toList());

        return new PageImpl<>(postLists, pageDto.of(pageDto.getSort()), posts.getTotalElements());

    }

    private void permissionCheck(User user, BusinessProfile businessProfile) {
        if (!businessProfile.getAdmin().getId().equals(user.getId())) {
            throw new PermissionException();
        }
    }
}
