package com.minibeit.post.domain;

import com.minibeit.common.domain.BaseEntity;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "post_do_date")
@Where(clause = "del=0")
public class PostDoDate extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime doDate;

    private boolean isFull;

    @Builder.Default
    @OneToMany(mappedBy = "postDoDate", cascade = CascadeType.REMOVE)
    private List<PostApplicant> postApplicantList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "del")
    private Boolean del;

    public PostDoDate assignPost(Post post) {
        this.post = post;
        this.del = false;
        post.getPostDoDateList().add(this);
        return this;
    }

    public void delete() {
        this.del = true;
        this.deletedAt = LocalDateTime.now();
        this.getPostApplicantList().forEach(PostApplicant::delete);
    }

    public void updateFull(List<PostApplicant> approvedPostApplicant) {
        this.isFull = this.post.getRecruitPeople() <= approvedPostApplicant.size();
    }

    public boolean applyIsPossible(Post post) {
        return !this.isFull && post.getPostStatus().equals(PostStatus.RECRUIT);
    }
}
