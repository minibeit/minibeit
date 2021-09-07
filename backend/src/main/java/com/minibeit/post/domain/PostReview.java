package com.minibeit.post.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.post.dto.PostRequest;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "post_review")
public class PostReview extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    private String content;

    public static PostReview create(Post post, PostRequest.CreateReview request) {
        return PostReview.builder().post(post).content(request.getContent()).build();
    }
}
