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

    private String placeDetail;

    private String contact;

    private Boolean recruitCondition;

    private Integer doTime;

    private LocalDateTime doDate;

    private String rejectComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String businessProfileName;

    public static RejectPost create(String title, String place, String placeDetail, String contact, Boolean recruitCondition, Integer doTime, LocalDateTime doDate, String rejectComment, User user, String businessProfileName) {
        return RejectPost.builder()
                .title(title)
                .place(place)
                .placeDetail(placeDetail)
                .contact(contact)
                .recruitCondition(recruitCondition)
                .doTime(doTime)
                .doDate(doDate)
                .rejectComment(rejectComment)
                .businessProfileName(businessProfileName)
                .user(user)
                .build();
    }
}
