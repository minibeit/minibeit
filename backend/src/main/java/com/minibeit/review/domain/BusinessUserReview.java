package com.minibeit.review.domain;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.common.domain.BaseEntity;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.post.domain.PostApplicant;
import com.minibeit.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "business_user_review")
public class BusinessUserReview extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_profile_id")
    private BusinessProfile businessProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_review_detail_id")
    private BusinessUserReviewDetail businessUserReviewDetail;

    private void setBusinessUserReviewDetail(BusinessUserReviewDetail businessUserReviewDetail) {
        this.businessUserReviewDetail = businessUserReviewDetail;
        businessUserReviewDetail.getBusinessUserReviewList().add(this);
    }

    public static BusinessUserReview createWithBusiness(BusinessProfile businessProfile, BusinessUserReviewDetail businessUserReviewDetail, PostApplicant postApplicant, LocalDateTime now) {
        permissionValidation(postApplicant, now);
        BusinessUserReview businessReview = BusinessUserReview.builder()
                .businessProfile(businessProfile)
                .build();
        businessReview.setBusinessUserReviewDetail(businessUserReviewDetail);
        return businessReview;
    }

    public static BusinessUserReview createWithUser(User applicantUser, BusinessUserReviewDetail businessUserReviewDetail, PostApplicant postApplicant, LocalDateTime now) {
        permissionValidation(postApplicant, now);
        BusinessUserReview userReview = BusinessUserReview.builder()
                .user(applicantUser)
                .build();
        userReview.setBusinessUserReviewDetail(businessUserReviewDetail);
        postApplicant.updateEvaluatedBusiness();
        return userReview;
    }

    private static void permissionValidation(PostApplicant postApplicant, LocalDateTime now) {
        if (!postApplicant.writeUserReviewIsPossible(now)) {
            throw new PermissionException();
        }
    }
}

