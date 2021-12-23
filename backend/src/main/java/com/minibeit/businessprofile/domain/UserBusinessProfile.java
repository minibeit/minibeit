package com.minibeit.businessprofile.domain;

import com.minibeit.common.domain.BaseEntity;
import com.minibeit.user.domain.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "user_business_profile")
public class UserBusinessProfile extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_profile_id")
    private BusinessProfile businessProfile;

    public void setBusinessProfile(BusinessProfile businessProfile) {
        this.businessProfile = businessProfile;
        businessProfile.getUserBusinessProfileList().add(this);
    }

    private void addUser(User user) {
        user.getUserBusinessProfileList().add(this);
        this.user = user;
    }

    public static UserBusinessProfile create(User user) {
        UserBusinessProfile userBusinessProfile = UserBusinessProfile.builder().build();
        userBusinessProfile.addUser(user);
        return userBusinessProfile;
    }

    public static UserBusinessProfile create(User invitedUser, BusinessProfile businessProfile) {
        UserBusinessProfile userBusinessProfile = UserBusinessProfile.builder().build();
        userBusinessProfile.addUser(invitedUser);
        userBusinessProfile.setBusinessProfile(businessProfile);
        return userBusinessProfile;
    }
}
