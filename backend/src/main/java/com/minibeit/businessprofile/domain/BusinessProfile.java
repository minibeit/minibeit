package com.minibeit.businessprofile.domain;

import com.minibeit.avatar.domain.Avatar;
import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.common.domain.BaseEntity;
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

    public void update(BusinessProfileRequest.Update createRequest) {
        this.name = createRequest.getName();
        this.place = createRequest.getPlace();
        this.placeDetail = createRequest.getPlaceDetail();
        this.contact = createRequest.getContact();
    }

    public void updateAvatar(Avatar avatar) {
        this.avatar = avatar;
    }

    public static BusinessProfile create(BusinessProfileRequest.Create request, UserBusinessProfile userBusinessProfile, Avatar avatar, User admin) {
        BusinessProfile businessProfile = BusinessProfile.builder()
                .name(request.getName())
                .place(request.getPlace())
                .placeDetail(request.getPlaceDetail())
                .contact(request.getContact())
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
