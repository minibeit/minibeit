package com.minibeit.user.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.interests.domain.Interests;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "user_interests")
public class UserInterests extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interests_id")
    private Interests interests;

    public static UserInterests create(Interests interests, User user) {
        return UserInterests.builder().interests(interests).user(user).build();
    }
}
