package com.minibeit.businessprofile.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.post.dto.PostRequest;
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

    private LocalDateTime doDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_profile_id")
    private BusinessProfile businessProfile;

    public static BusinessProfileReview create(BusinessProfile businessProfile, PostRequest.CreateReview request) {
        return BusinessProfileReview.builder()
                .postTitle(request.getPostTitle())
                .content(request.getContent())
                .doDate(request.getDoDate())
                .businessProfile(businessProfile)
                .build();
    }
}
