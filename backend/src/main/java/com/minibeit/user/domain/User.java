package com.minibeit.user.domain;

import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.common.domain.BaseEntity;
import com.minibeit.common.utils.CryptoConverter;
import com.minibeit.file.domain.Avatar;
import com.minibeit.school.domain.School;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "user")
public class User extends BaseEntity {
    private static final int MAX_SHARE_SIZE = 3;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String oauthId;

    @Convert(converter = CryptoConverter.class)
    private String email;

    private String name;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String job;

    @Convert(converter = CryptoConverter.class)
    private String phoneNum;

    private LocalDate birth;

    private boolean signupCheck;

    @Enumerated(EnumType.STRING)
    private SignupProvider provider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private Long schoolId;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "avatar_id")
    private Avatar avatar;

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<UserBusinessProfile> userBusinessProfileList = new ArrayList<>();

    private String testId;

    public User signup(User user, School school, Avatar avatar) {
        this.name = user.getName();
        this.nickname = user.getNickname();
        this.email = user.getEmail();
        this.gender = user.getGender();
        this.job = user.getJob();
        this.phoneNum = user.getPhoneNum();
        this.birth = user.getBirth();
        this.signupCheck = true;
        this.schoolId = school.getId();
        this.avatar = avatar;
        return this;
    }

    public User update(User user, School school) {
        this.name = user.getName();
        this.nickname = user.getNickname();
        this.email = user.getEmail();
        this.gender = user.getGender();
        this.job = user.getJob();
        this.phoneNum = user.getPhoneNum();
        this.schoolId = school.getId();
        this.birth = user.getBirth();
        return this;
    }

    public void updateAvatar(Avatar avatar) {
        this.avatar = avatar;
    }
}