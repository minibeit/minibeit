package com.minibeit.post.domain;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.common.domain.BaseEntity;
import com.minibeit.post.dto.PostRequest;
import com.minibeit.school.domain.School;
import com.minibeit.security.userdetails.CustomUserDetails;
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

    public boolean isLike(CustomUserDetails customUserDetails) {
        return customUserDetails != null && this.postLikeList.stream().anyMatch(postLike -> postLike.getUser().getId().equals(customUserDetails.getUser().getId()));
    }

    public boolean isMine(CustomUserDetails customUserDetails) {
        return customUserDetails != null && this.businessProfile.getUserBusinessProfileList().stream()
                .anyMatch(userBusinessProfile -> userBusinessProfile.getUser().getId().equals(customUserDetails.getUser().getId()));
    }

    public void completed() {
        this.postStatus = PostStatus.COMPLETE;
    }

    public void updateContent(String updatedContent) {
        this.content = updatedContent;
    }

    public static Post create(PostRequest.CreateInfo request, School school, BusinessProfile businessProfile) {
        return Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .place(request.getPlace())
                .placeDetail(request.getPlaceDetail())
                .contact(request.getContact())
                .category(request.getCategory())
                .recruitPeople(request.getHeadcount())
                .payment(request.getPayment())
                .paymentCache(request.getCache())
                .paymentDetail(request.getPaymentDetail())
                .paymentGoods(request.getGoods())
                .recruitCondition(request.isCondition())
                .recruitConditionDetail(request.getConditionDetail())
                .doTime(request.getDoTime())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .businessProfile(businessProfile)
                .school(school)
                .postStatus(PostStatus.RECRUIT)
                .build();
    }
}
