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

    private String content;

    private String place;

    private String contact;

    private Integer recruitPeople;

    @Enumerated(EnumType.STRING)
    private Payment payment;

    private Integer paymentCache;

    private String paymentGoods;

    private boolean recruitCondition;

    private String recruitConditionDetail;

    private Integer doTime;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private boolean isCompleted;

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private School school;

    private void addPostFiles(List<PostFile> postFileList) {
        for (PostFile postFile : postFileList) {
            postFile.setPost(this);
            this.postFileList.add(postFile);
        }
    }

    public boolean isLike(CustomUserDetails customUserDetails) {
        return customUserDetails != null && this.postLikeList.stream().anyMatch(postLike -> postLike.getCreatedBy().getId().equals(customUserDetails.getUser().getId()));
    }

    public static Post create(PostRequest.CreateInfo request, School school, BusinessProfile businessProfile, List<PostFile> postFileList) {
        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .place(request.getPlace())
                .contact(request.getContact())
                .recruitPeople(request.getHeadcount())
                .payment(request.getPayment())
                .paymentCache(request.getCache())
                .paymentGoods(request.getGoods())
                .recruitCondition(request.isCondition())
                .recruitConditionDetail(request.getConditionDetail())
                .doTime(request.getDoTime())
                .businessProfile(businessProfile)
                .school(school)
                .isCompleted(false)
                .build();
        post.addPostFiles(postFileList);
        return post;
    }

    public void updateDate(PostRequest.CreateDateRule request) {
        this.startDate = request.getStartDate();
        this.endDate = request.getEndDate();
    }

    public boolean applyPossible(List<PostApplicant> postApplicants) {
        return (postApplicants.size() < this.recruitPeople) && !isCompleted;
    }

    public void completed(){
        this.isCompleted = true;
    }
}
