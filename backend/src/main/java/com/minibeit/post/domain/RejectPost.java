package com.minibeit.post.domain;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.common.domain.BaseEntity;
import com.minibeit.postapplicant.domain.PostApplicant;
import com.minibeit.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "reject_post")
public class RejectPost extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String place;

    private String placeDetail;

    private String category;

    private String contact;

    private Boolean recruitCondition;

    private Integer doTime;

    private LocalDateTime doDate;

    private String rejectComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String businessProfileName;

    public static RejectPost create(Post post, PostDoDate postDoDate, BusinessProfile businessProfile, User user, String rejectComment) {
        return RejectPost.builder()
                .title(post.getTitle())
                .place(post.getPlace())
                .placeDetail(post.getPlaceDetail())
                .category(post.getCategory())
                .contact(post.getContact())
                .recruitCondition(post.isRecruitCondition())
                .doTime(post.getDoTime())
                .doDate(postDoDate.getDoDate())
                .rejectComment(rejectComment)
                .businessProfileName(businessProfile.getName())
                .user(user)
                .build();
    }
}
