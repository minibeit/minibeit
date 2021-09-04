package com.minibeit.post.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.post.dto.PostRequest;
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
    @JoinColumn(name = "post_id")
    private Post post;

    private LocalDateTime doDate;

    @Enumerated(EnumType.STRING)
    private PostStatus postStatus;

    private boolean finish;

    public void updateStatus(PostStatus postStatus) {
        this.postStatus = postStatus;
    }

    public static PostApplicant create(Post post, PostRequest.Apply request, User user) {
        return PostApplicant.builder()
                .post(post)
                .user(user)
                .doDate(request.getDoDate())
                .finish(false)
                .postStatus(PostStatus.WAIT)
                .build();
    }
}
