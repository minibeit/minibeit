package com.minibeit.review.domain;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.common.domain.BaseEntity;
import com.minibeit.user.domain.User;
import lombok.*;

import javax.persistence.*;

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

    public static BusinessUserReview create(BusinessProfile businessProfile, BusinessUserReviewDetail businessUserReviewDetail) {
        return BusinessUserReview.builder()
                .businessProfile(businessProfile)
                .businessUserReviewDetail(businessUserReviewDetail)
                .build();
    }
}

