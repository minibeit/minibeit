package com.minibeit.post.domain;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.common.domain.BaseEntity;
import com.minibeit.file.domain.PostFile;
import com.minibeit.school.domain.School;
import com.minibeit.security.userdetails.CustomUserDetails;
import com.minibeit.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "post")
public class Post extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String place;

    private String placeDetail;

    private String contact;

    private String category;

    private Integer recruitPeople;

    @Enumerated(EnumType.STRING)
    private Payment payment;

    private Integer paymentCache;

    private String paymentGoods;

    private String paymentDetail;

    private boolean recruitCondition;

    private String recruitConditionDetail;

    private Integer doTime;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @Enumerated(EnumType.STRING)
    private PostStatus postStatus;

    private String thumbnail;

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<PostFile> postFileList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<PostDoDate> postDoDateList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<PostLike> postLikeList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_profile_id")
    private BusinessProfile businessProfile;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private School school;

    public boolean isLike(User user) {
        return user != null && this.postLikeList.stream().anyMatch(postLike -> postLike.getUser().getId().equals(user.getId()));
    }

    public boolean isMine(User user) {
        return user != null && this.businessProfile.getUserBusinessProfileList().stream()
                .anyMatch(userBusinessProfile -> userBusinessProfile.getUser().getId().equals(user.getId()));
    }

    public void completed() {
        this.postStatus = PostStatus.COMPLETE;
    }

    public void updateContent(Post updatedPost) {
        this.content = updatedPost.getContent();
    }

    public void updateThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public void create(School school, BusinessProfile businessProfile) {
        this.school = school;
        this.businessProfile = businessProfile;
    }
}
