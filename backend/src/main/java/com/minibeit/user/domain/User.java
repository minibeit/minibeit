package com.minibeit.user.domain;

import com.minibeit.avatar.domain.Avatar;
import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.common.domain.BaseEntity;
import com.minibeit.school.domain.School;
import com.minibeit.user.dto.AuthRequest;
import com.minibeit.user.dto.UserRequest;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    private String job;

    private String phoneNum;

    private LocalDate birth;

    private boolean signupCheck;

    @Embedded
    private Alarm alarm;

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

    public User signup(AuthRequest.Signup request, School school, Avatar avatar) {
        this.name = request.getName();
        this.nickname = request.getNickname();
        this.gender = request.getGender();
        this.job = request.getJob();
        this.phoneNum = request.getPhoneNum();
        this.birth = request.getBirth();
        this.signupCheck = true;
        this.school = school;
        this.alarm = null;
        this.avatar = avatar;
        return this;
    }

    public User update(UserRequest.Update request, School school) {
        this.name = request.getName();
        this.nickname = request.getNickname();
        this.gender = request.getGender();
        this.job = request.getJob();
        this.phoneNum = request.getPhoneNum();
        this.school = school;
        this.birth = request.getBirth();
        return this;
    }

    public void updateAvatar(Avatar avatar) {
        this.avatar = avatar;
    }

    public boolean isAdminInBusinessProfile(BusinessProfile businessProfile) {
        return businessProfile.getAdmin().getId().equals(this.getId());
    }

    public boolean rejectedAlarmOnOff() {
        if (this.alarm == null || this.alarm.getRejectedAlarm() == null) {
            return false;
        }
        LocalDateTime plusDays = this.alarm.getRejectedAlarm().plusDays(3L);
        return LocalDateTime.now().isBefore(plusDays);
    }

    public boolean approvedAlarmOnOff() {
        if (this.alarm == null || this.alarm.getApprovedAlarm() == null) {
            return false;
        }
        LocalDateTime plusDays = this.alarm.getApprovedAlarm().plusDays(3L);
        return LocalDateTime.now().isBefore(plusDays);
    }

    public void approvedAlarmOn(){
        if(this.alarm == null){
            this.alarm = new Alarm(LocalDateTime.now(), null);
        }
        else{
            this.alarm.approvedOn();
        }
    }

    public void approvedAlarmOff(){
        if(this.alarm != null){
            this.alarm.approvedOff();
        }
    }

    public void rejectedAlarmOn(){
        if(this.alarm == null){
            this.alarm = new Alarm(null, LocalDateTime.now());
        }
        else{
            this.alarm.rejectedOn();
        }
    }

    public void rejectedAlarmOff(){
        if(this.alarm != null){
            this.alarm.rejectedOff();
        }
    }


}