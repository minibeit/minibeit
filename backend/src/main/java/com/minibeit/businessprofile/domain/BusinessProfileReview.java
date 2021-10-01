package com.minibeit.businessprofile.domain;

import com.minibeit.businessprofile.dto.BusinessProfilesReviewRequest;
import com.minibeit.common.domain.BaseEntity;
import com.minibeit.post.domain.PostDoDate;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_do_date_id")
    private PostDoDate postDoDate;

    public void update(String content) {
        this.content = content;
    }

    private void setPostDoDate(PostDoDate postDoDate) {
        this.postDoDate = postDoDate;
        postDoDate.getBusinessProfileReviewList().add(this);
    }

    public boolean updateReviewIsPossible(LocalDateTime now){
        return this.getDoDate().plusDays(7).isAfter(now);
    }

    public static BusinessProfileReview create(PostDoDate postDoDate, BusinessProfile businessProfile, BusinessProfilesReviewRequest.Create request) {
        final BusinessProfileReview businessProfileReview = BusinessProfileReview.builder()
                .postTitle(request.getPostTitle())
                .content(request.getContent())
                .doDate(request.getDoDate())
                .time(request.getTime())
                .businessProfile(businessProfile)
                .build();
        businessProfileReview.setPostDoDate(postDoDate);
        return businessProfileReview;
    }
}

