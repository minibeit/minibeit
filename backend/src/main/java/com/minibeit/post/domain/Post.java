package com.minibeit.post.domain;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.common.domain.BaseEntity;
import com.minibeit.school.domain.School;
import com.minibeit.user.domain.User;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "post")
@Where(clause = "del=0")
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
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<PostFile> postFileList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
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

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "del")
    private boolean del;

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

    public void delete() {
        this.del = true;
        this.deletedAt = LocalDateTime.now();
        this.getPostDoDateList().forEach(PostDoDate::delete);
        this.getPostFileList().forEach(PostFile::delete);
    }

    public void create(School school, BusinessProfile businessProfile, List<PostDoDate> postDoDates, PostFile uploadThumbnail, List<PostFile> uploadPostFileList) {
        if (uploadThumbnail != null) {
            this.thumbnail = uploadThumbnail.getUrl();
            uploadPostFileList.add(uploadThumbnail);
        }
        this.postFileList = uploadPostFileList.stream().map(postFile -> postFile.setPost(this)).collect(Collectors.toList());
        this.postDoDateList = postDoDates.stream().map(postDoDate -> postDoDate.assignPost(this)).collect(Collectors.toList());
        this.school = school;
        this.businessProfile = businessProfile;
        this.del = false;
    }
}
