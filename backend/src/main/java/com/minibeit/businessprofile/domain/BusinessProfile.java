package com.minibeit.businessprofile.domain;

import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.common.domain.BaseEntity;
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

    private String category;

    private String place;

    private String introduce;

    private String contact;


    @Builder.Default
    @OneToMany(mappedBy = "businessProfile", cascade = CascadeType.ALL)
    private List<UserBusinessProfile> userBusinessProfileList = new ArrayList<>();

    private void addUser(UserBusinessProfile userBusinessProfile) {
        this.userBusinessProfileList.add(userBusinessProfile);
        userBusinessProfile.setBusinessProfile(this);
    }

    public static BusinessProfile create(BusinessProfileRequest.Create request, UserBusinessProfile userBusinessProfile) {
        BusinessProfile businessProfile = BusinessProfile.builder()
                .name(request.getName())
                .category(request.getCategory())
                .place(request.getPlace())
                .introduce(request.getIntroduce())
                .contact(request.getContact())
                .build();
        businessProfile.addUser(userBusinessProfile);
        return businessProfile;
    }
}
