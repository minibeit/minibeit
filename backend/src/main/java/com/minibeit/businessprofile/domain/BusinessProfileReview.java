package com.minibeit.businessprofile.domain;

import com.minibeit.businessprofile.dto.BusinessProfilesReviewRequest;
import com.minibeit.common.domain.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "business_profile_review")
public class BusinessProfileReview extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String postTitle;

    private String content;

    private Integer time;

    private LocalDateTime doDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_profile_id")
    private BusinessProfile businessProfile;

    public static BusinessProfileReview create(BusinessProfile businessProfile, BusinessProfilesReviewRequest.CreateReview request) {
        return BusinessProfileReview.builder()
                .postTitle(request.getPostTitle())
                .content(request.getContent())
                .doDate(request.getDoDate())
                .time(request.getTime())
                .businessProfile(businessProfile)
                .build();
    }
}

