package com.minibeit.post.domain;

import com.minibeit.common.domain.BaseEntity;
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
@Table(name = "post_do_date")
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

    private void setPost(Post post) {
        this.post = post;
        post.getPostDoDateList().add(this);
    }

    public void updateFull(List<PostApplicant> approvedPostApplicant) {
        this.isFull = this.post.getRecruitPeople() <= approvedPostApplicant.size();
    }

    public static PostDoDate create(LocalDateTime doDate, Post post) {
        PostDoDate postDoDate = PostDoDate.builder().doDate(doDate).isFull(false).build();
        postDoDate.setPost(post);
        return postDoDate;
    }

    public boolean applyIsPossible(Post post) {
        return !this.isFull && post.getPostStatus().equals(PostStatus.RECRUIT);
    }
}
