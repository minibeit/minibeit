package com.minibeit.user.domain;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.common.domain.BaseEntity;
import com.minibeit.common.exception.DuplicateException;
import com.minibeit.common.exception.InvalidOperationException;
import com.minibeit.file.domain.Avatar;
import com.minibeit.school.domain.School;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    private String email;

    private String name;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String job;

    private String phoneNum;

    private LocalDate birth;

    private boolean signupCheck;

    @Enumerated(EnumType.STRING)
    private SignupProvider provider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private School school;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "avatar_id")
    private Avatar avatar;

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<UserBusinessProfile> userBusinessProfileList = new ArrayList<>();

    public User signup(User user, School school, Avatar avatar) {
        this.name = user.getName();
        this.nickname = user.getNickname();
        this.email = user.getEmail();
        this.gender = user.getGender();
        this.job = user.getJob();
        this.phoneNum = user.getPhoneNum();
        this.birth = user.getBirth();
        this.signupCheck = true;
        this.school = school;
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
        this.school = school;
        this.birth = user.getBirth();
        return this;
    }

    public void updateAvatar(Avatar avatar) {
        this.avatar = avatar;
    }

    public boolean isAdminInBusinessProfile(BusinessProfile businessProfile) {
        return businessProfile.getAdmin().getId().equals(this.getId());
    }

    public void businessProfileCountValidate() {
        if (userBusinessProfileList.size() >= MAX_SHARE_SIZE) {
            throw new InvalidOperationException("비즈니스 프로필 개수가 너무 많습니다.");
        }
    }

    public boolean userInBusiness(Long businessProfileId) {
        List<Long> businessProfileIdListByUser = userBusinessProfileList.stream().map(userBusinessProfile -> userBusinessProfile.getBusinessProfile().getId()).collect(Collectors.toList());
        return businessProfileIdListByUser.contains(businessProfileId);
    }
}