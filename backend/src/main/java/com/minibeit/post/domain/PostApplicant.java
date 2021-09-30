package com.minibeit.post.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private ApplyStatus applyStatus;

    private boolean myFinish;

    private boolean businessFinish;

    private boolean writeReview;

    private void setPostDoDate(PostDoDate postDoDate) {
        postDoDate.getPostApplicantList().add(this);
        this.postDoDate = postDoDate;
    }

    public void updateStatus(ApplyStatus applyStatus) {
        this.applyStatus = applyStatus;
    }

    public boolean writeReviewIsPossible(LocalDateTime now) {
        return this.applyStatus.equals(ApplyStatus.APPROVE) && !this.writeReview &&
                this.businessFinish && this.myFinish && postDoDate.getDoDate().plusDays(6).isAfter(now);
    }

    public void updateMyFinish() {
        this.myFinish = true;
    }

    public void updateWriteReview() {
        this.writeReview = true;
    }

    public void changeBusinessFinish(Boolean isAttend) {
        this.businessFinish = isAttend;
    }

    public static PostApplicant create(PostDoDate postDoDate, User user) {
        PostApplicant postApplicant = PostApplicant.builder()
                .user(user)
                .myFinish(false)
                .businessFinish(true)
                .writeReview(false)
                .applyStatus(ApplyStatus.WAIT)
                .build();
        postApplicant.setPostDoDate(postDoDate);
        return postApplicant;
    }
}
