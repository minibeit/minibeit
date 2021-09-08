package com.minibeit.post.domain;

import com.minibeit.common.domain.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "post_like")
public class PostLike extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    private void setPost(Post post) {
        post.getPostLikeList().add(this);
        this.post = post;
    }

    public static PostLike create(Post post) {
        PostLike postLike = PostLike.builder().build();
        postLike.setPost(post);
        return postLike;
    }
}
