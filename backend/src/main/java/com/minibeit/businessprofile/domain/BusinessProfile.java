package com.minibeit.businessprofile.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.common.exception.DuplicateException;
import com.minibeit.common.exception.InvalidOperationException;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.file.domain.Avatar;
import com.minibeit.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "business_profile")
public class BusinessProfile extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String place;

    private String placeDetail;

    private String contact;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "avatar_id")
    private Avatar avatar;

    @Builder.Default
    @OneToMany(mappedBy = "businessProfile", cascade = CascadeType.ALL)
    private List<UserBusinessProfile> userBusinessProfileList = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private User admin;

    public void changeAdmin(User loginUser, User changedAdmin) {
        adminValidate(loginUser);
        List<Long> userIdListInBusiness = userBusinessProfileList.stream().map(userBusinessProfile -> userBusinessProfile.getUser().getId()).collect(Collectors.toList());
        if (!userIdListInBusiness.contains(changedAdmin.getId())) {
            throw new InvalidOperationException("비즈니스 프로필에 속하지 않은 사람에게 관리자를 양도할 수 없습니다.");
        }
        this.admin = changedAdmin;
    }

    public void update(BusinessProfile updatedBusinessProfile, User loginUser) {
        this.adminValidate(loginUser);
        this.name = updatedBusinessProfile.getName();
        this.place = updatedBusinessProfile.getPlace();
        this.placeDetail = updatedBusinessProfile.getPlaceDetail();
        this.contact = updatedBusinessProfile.getContact();
    }

    public void updateAvatar(Avatar avatar) {
        this.avatar = avatar;
    }

    public void adminValidate(User user) {
        if (!admin.getId().equals(user.getId())) {
            throw new PermissionException("비즈니스 프로필의 관리자가 아닙니다.");
        }
    }


    public UserBusinessProfile invite(User invitedUser, BusinessProfile businessProfile, User loginUser) {
        adminValidate(loginUser);
        invitedUser.businessProfileCountValidate();
        if (invitedUser.userInBusiness(businessProfile.getId())) {
            throw new DuplicateException("이미 공유된 유저입니다.");
        }
        return UserBusinessProfile.create(invitedUser);
    }

    public void expel(User user, Long expelUserId) {
        adminValidate(user);
        if (admin.getId().equals(expelUserId)) {
            throw new InvalidOperationException("어드민 유저은 추방당할 수 없습니다.");
        }
    }

    public void leaveValidate(User user) {
        if (admin.getId().equals(user.getId())) {
            throw new InvalidOperationException("어드민 유저은 비즈니스 프로필을 나갈 수 없습니다.");
        }
    }

    public static BusinessProfile create(BusinessProfile createdBusinessProfile, Avatar avatar, User admin) {
        admin.businessProfileCountValidate();
        UserBusinessProfile userBusinessProfile = UserBusinessProfile.create(admin);
        BusinessProfile businessProfile = BusinessProfile.builder()
                .name(createdBusinessProfile.getName())
                .place(createdBusinessProfile.getPlace())
                .placeDetail(createdBusinessProfile.getPlaceDetail())
                .contact(createdBusinessProfile.getContact())
                .avatar(avatar)
                .admin(admin)
                .build();
        userBusinessProfile.setBusinessProfile(businessProfile);
        return businessProfile;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BusinessProfile that = (BusinessProfile) o;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
