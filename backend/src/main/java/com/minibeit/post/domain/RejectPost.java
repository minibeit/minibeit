package com.minibeit.post.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "reject_post")
public class RejectPost extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String place;

    private String contact;

    private Integer doTime;

    private LocalDateTime doDate;

    private String rejectComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public static RejectPost create(String title, String place, String contact, Integer doTime, LocalDateTime doDate, String rejectComment, User user) {
        return RejectPost.builder()
                .title(title)
                .place(place)
                .contact(contact)
                .doTime(doTime)
                .doDate(doDate)
                .rejectComment(rejectComment)
                .user(user)
                .build();
    }
}
