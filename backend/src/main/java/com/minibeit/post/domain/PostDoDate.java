package com.minibeit.post.domain;

import com.minibeit.common.domain.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
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

    private boolean full;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    private void setPost(Post post) {
        this.post = post;
        post.getPostDoDateList().add(this);
    }


    public static PostDoDate create(LocalDateTime doDate, Post post) {
        PostDoDate postDoDate = PostDoDate.builder().doDate(doDate).full(false).build();
        postDoDate.setPost(post);
        return postDoDate;
    }

    public void updateFull(List<PostApplicant> approvedPostApplicant) {
        this.full = this.post.getRecruitPeople() <= approvedPostApplicant.size();
    }
}
