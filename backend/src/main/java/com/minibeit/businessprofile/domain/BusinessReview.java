package com.minibeit.businessprofile.domain;

import com.minibeit.common.domain.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "business_review")
public class BusinessReview extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_profile_id")
    private BusinessProfile businessProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_review_detail_id")
    private BusinessReviewDetail businessReviewDetail;

    public static BusinessReview create(BusinessProfile businessProfile, BusinessReviewDetail businessReviewDetail) {
        return BusinessReview.builder()
                .businessProfile(businessProfile)
                .businessReviewDetail(businessReviewDetail)
                .build();
    }
}

