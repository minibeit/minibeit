package com.minibeit.user.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.school.domain.School;
import com.minibeit.user.dto.UserRequest;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "user")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String oauthId;

    private String name;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Integer age;

    private String job;

    private String phoneNum;

    private boolean signupCheck;

    @Enumerated(EnumType.STRING)
    private SignupProvider provider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private School school;

    public User signup(UserRequest.Signup request, School school) {
        this.name = request.getName();
        this.nickname = request.getNickname();
        this.age = request.getAge();
        this.gender = request.getGender();
        this.job = request.getJob();
        this.phoneNum = request.getPhoneNum();
        this.signupCheck = true;
        this.school = school;
        return this;
    }
}