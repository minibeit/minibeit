package com.minibeit.businessprofile.domain;

import com.minibeit.businessprofile.dto.BusinessProfileRequest;
import com.minibeit.common.domain.BaseEntity;
import com.minibeit.file.domain.File;
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

    private String category;

    private String place;

    private String introduce;

    private String contact;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id")
    private File avatar;

    @Builder.Default
    @OneToMany(mappedBy = "businessProfile", cascade = CascadeType.ALL)
    private List<UserBusinessProfile> userBusinessProfileList = new ArrayList<>();

    private void addUser(UserBusinessProfile userBusinessProfile) {
        this.userBusinessProfileList.add(userBusinessProfile);
        userBusinessProfile.setBusinessProfile(this);
    }

    public void update(BusinessProfileRequest.Update createRequest) {
        this.name = createRequest.getName();
        this.category = createRequest.getCategory();
        this.place = createRequest.getPlace();
        this.contact = createRequest.getContact();
        this.introduce = createRequest.getIntroduce();
    }

    public static BusinessProfile create(BusinessProfileRequest.Create request, UserBusinessProfile userBusinessProfile, File avatar) {
        BusinessProfile businessProfile = BusinessProfile.builder()
                .name(request.getName())
                .category(request.getCategory())
                .place(request.getPlace())
                .introduce(request.getIntroduce())
                .contact(request.getContact())
                .avatar(avatar)
                .build();
        businessProfile.addUser(userBusinessProfile);
        return businessProfile;
    }

    public void updateAvatar(File avatar) {
        this.avatar = avatar;
    }

    public boolean isMine(User user){
        return this.getCreatedBy().getId().equals(user.getId());
    }
}
