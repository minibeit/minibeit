package com.minibeit.post.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.post.dto.PostRequest;
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

    public void updateStatus(PostStatus postStatus) {
        this.postStatus = postStatus;
    }

    public static PostApplicant create(PostDoDate postDoDate, User user) {
        return PostApplicant.builder()
                .user(user)
                .postDoDate(postDoDate)
                .finish(false)
                .postStatus(PostStatus.WAIT)
                .build();
    }
}
