package com.minibeit.businessprofile.service;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.common.exception.DuplicateException;
import com.minibeit.common.exception.InvalidOperationException;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.user.domain.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BusinessValidator {
    private static final int MAX_SHARE_SIZE = 3;

    public void createValidate(List<UserBusinessProfile> userBusinessProfileList) {
        businessCountValidate(userBusinessProfileList);
    }

    public void inviteValidate(BusinessProfile businessProfile, List<UserBusinessProfile> invitedUserBusinessProfileList, User user) {
        adminValidate(businessProfile, user);
        businessCountValidate(invitedUserBusinessProfileList);
        if (containBusinessProfile(businessProfile, invitedUserBusinessProfileList)) {
            throw new DuplicateException("이미 공유된 유저입니다.");
        }
    }

    public void changeAdminValidate(BusinessProfile businessProfile, User loginUser, List<UserBusinessProfile> userBusinessProfileList) {
        adminValidate(businessProfile, loginUser);
        if (!containBusinessProfile(businessProfile, userBusinessProfileList)) {
            throw new InvalidOperationException("비즈니스 프로필에 속하지 않은 사람에게 관리자를 양도할 수 없습니다.");
        }
    }

    public void expelValidate(BusinessProfile businessProfile, Long userId, User loginUser) {
        adminValidate(businessProfile, loginUser);
        isAdmin(businessProfile, userId);
    }

    public void isAdmin(BusinessProfile businessProfile, Long userId) {
        if (businessProfile.getAdmin().getId().equals(userId)) {
            throw new InvalidOperationException("비즈니스 프로필의 관리자 입니다.");
        }
    }

    public void adminValidate(BusinessProfile businessProfile, User user) {
        if (!businessProfile.getAdmin().getId().equals(user.getId())) {
            throw new PermissionException("비즈니스 프로필의 관리자가 아닙니다.");
        }
    }

    private void businessCountValidate(List<UserBusinessProfile> userBusinessProfileList) {
        if (userBusinessProfileList.size() >= MAX_SHARE_SIZE) {
            throw new InvalidOperationException("비즈니스 프로필 개수가 너무 많습니다.");
        }
    }

    private boolean containBusinessProfile(BusinessProfile businessProfile, List<UserBusinessProfile> userBusinessProfileList) {
        List<Long> businessProfileIdListByUser = userBusinessProfileList.stream().map(userBusinessProfile -> userBusinessProfile.getBusinessProfile().getId()).collect(Collectors.toList());
        return businessProfileIdListByUser.contains(businessProfile.getId());
    }
}
