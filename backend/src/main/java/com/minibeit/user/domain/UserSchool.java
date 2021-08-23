package com.minibeit.user.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.school.domain.School;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "user_school")
public class UserSchool extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private School school;

    public static UserSchool create(School school) {
        return UserSchool.builder().school(school).build();
    }
}
