package com.minibeit.review.service;

import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.PostApplicant;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class BusinessUserReviewValidator {
    public void createBusinessReviewValidate(PostApplicant postApplicant, LocalDateTime now) {
        if (!writeBusinessReviewIsPossible(postApplicant, now)) {
            throw new PermissionException("리뷰를 작성할 수 없습니다.");
        }
    }

    private boolean writeBusinessReviewIsPossible(PostApplicant postApplicant, LocalDateTime now) {
        return postApplicant.getApplyStatus().equals(ApplyStatus.COMPLETE) && !postApplicant.isWriteReview() &&
                postApplicant.isBusinessFinish() && postApplicant.getPostDoDate().getDoDate().plusDays(7).isAfter(now);
    }

    public void createUserReviewValidate(PostApplicant postApplicant, List<UserBusinessProfile> userBusinessProfileList, Long businessProfileId, LocalDateTime now) {
        if (!postApplicant.writeUserReviewIsPossible(now) || !containBusinessProfile(businessProfileId, userBusinessProfileList)) {
            throw new PermissionException("참여자를 평가할 수 없습니다.");
        }
    }

    private boolean containBusinessProfile(Long businessProfileId, List<UserBusinessProfile> userBusinessProfileList) {
        List<Long> businessProfileIdListByUser = userBusinessProfileList.stream().map(userBusinessProfile -> userBusinessProfile.getBusinessProfile().getId()).collect(Collectors.toList());
        return businessProfileIdListByUser.contains(businessProfileId);
    }
}
