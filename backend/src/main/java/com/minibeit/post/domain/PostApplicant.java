package com.minibeit.post.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.user.domain.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "post_applicant")
public class PostApplicant extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_do_date_id")
    private PostDoDate postDoDate;

    @Enumerated(EnumType.STRING)
    private PostStatus postStatus;

    private boolean finish;

    private void setPostDoDate(PostDoDate postDoDate) {
        postDoDate.getPostApplicantList().add(this);
        this.postDoDate = postDoDate;
    }

    public void updateStatusApprove() {
        this.postStatus = PostStatus.APPROVE;
    }

    public void updateStatusReject() {
        this.postStatus = PostStatus.REJECT;
    }

    public boolean writeReviewIsPossible() {
        return this.postStatus.equals(PostStatus.APPROVE) && this.finish;
    }

    public static PostApplicant create(PostDoDate postDoDate, User user) {
        PostApplicant postApplicant = PostApplicant.builder()
                .user(user)
                .finish(false)
                .postStatus(PostStatus.WAIT)
                .build();
        postApplicant.setPostDoDate(postDoDate);
        return postApplicant;
    }
}
