package com.minibeit.businessprofile.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.file.domain.Avatar;
import com.minibeit.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    public void changeAdmin(User changedAdmin) {
        this.admin = changedAdmin;
    }

    public void update(BusinessProfile updatedBusinessProfile, User loginUser) {
        this.name = updatedBusinessProfile.getName();
        this.place = updatedBusinessProfile.getPlace();
        this.placeDetail = updatedBusinessProfile.getPlaceDetail();
        this.contact = updatedBusinessProfile.getContact();
    }

    public void updateAvatar(Avatar avatar) {
        this.avatar = avatar;
    }

    public boolean isAdminInBusinessProfile(User user) {
        return this.getAdmin().getId().equals(user.getId());
    }

    public static BusinessProfile create(BusinessProfile createdBusinessProfile, Avatar avatar, User admin) {
        UserBusinessProfile userBusinessProfile = UserBusinessProfile.createWithBusinessProfile(admin);
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
