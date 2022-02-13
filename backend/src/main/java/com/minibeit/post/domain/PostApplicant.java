package com.minibeit.post.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.user.domain.User;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "post_applicant")
@Where(clause = "del=0")
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

    private boolean businessFinish;

    private boolean writeReview;

    private boolean evaluatedBusiness;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "del")
    private boolean del;

    private void setPostDoDate(PostDoDate postDoDate) {
        postDoDate.getPostApplicantList().add(this);
        this.postDoDate = postDoDate;
    }

    public void updateStatus(ApplyStatus applyStatus) {
        this.applyStatus = applyStatus;
    }

    public boolean writeUserReviewIsPossible(LocalDateTime now) {
        return !this.evaluatedBusiness && this.postDoDate.getDoDate().plusDays(7).isAfter(now);
    }

    public void updateWriteReview() {
        this.writeReview = true;
    }

    public void changeBusinessFinish(Boolean isAttend) {
        this.businessFinish = isAttend;
    }

    public void delete() {
        this.del = true;
        this.deletedAt = LocalDateTime.now();
    }

    public boolean duplicatedApply(List<PostDoDate> approvedDateByUser, LocalDateTime fromApplyDate, Integer doTime) {
        LocalDateTime toApplyDate = fromApplyDate.plusMinutes(doTime);
        for (PostDoDate fromApprovedDate : approvedDateByUser) {
            LocalDateTime toApprovedDate = fromApprovedDate.getDoDate().plusMinutes(fromApprovedDate.getPost().getDoTime());
            if (fromApprovedDate.getDoDate().isBefore(toApplyDate) && toApprovedDate.isAfter(fromApplyDate)) {
                return true;
            }
        }
        return false;
    }

    public void evaluated() {
        this.evaluatedBusiness = true;
    }

    public static PostApplicant create(PostDoDate postDoDate, User user) {
        PostApplicant postApplicant = PostApplicant.builder()
                .user(user)
                .businessFinish(true)
                .writeReview(false)
                .applyStatus(ApplyStatus.WAIT)
                .del(false)
                .build();
        postApplicant.setPostDoDate(postDoDate);
        return postApplicant;
    }
}
