package com.minibeit.businessprofile.domain;

import com.minibeit.businessprofile.service.exception.BusinessProfileCountExceedException;
import com.minibeit.businessprofile.service.exception.DuplicateShareException;
import com.minibeit.common.domain.BaseEntity;
import com.minibeit.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.util.List;

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

    private static final int MAX_SIZE = 3;

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

    public static UserBusinessProfile createWithBusinessProfile(User user, BusinessProfile businessProfile, List<BusinessProfile> businessProfileOfShareUser) {
        countExceedValidation(businessProfileOfShareUser);
        duplicateShareValidation(businessProfileOfShareUser, businessProfile);
        UserBusinessProfile userBusinessProfile = UserBusinessProfile.builder().build();
        userBusinessProfile.addUser(user);
        userBusinessProfile.setBusinessProfile(businessProfile);
        return userBusinessProfile;
    }

    private static void countExceedValidation(List<BusinessProfile> businessProfileOfShareUser) {
        if (businessProfileOfShareUser.size() >= MAX_SIZE) {
            throw new BusinessProfileCountExceedException();
        }
    }

    private static void duplicateShareValidation(List<BusinessProfile> businessProfileOfShareUser, BusinessProfile businessProfile) {
        if (businessProfileOfShareUser.contains(businessProfile)) {
            throw new DuplicateShareException();
        }
    }
}
