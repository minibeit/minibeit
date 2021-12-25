package com.minibeit.businessprofile.dto;

import com.minibeit.businessprofile.domain.BusinessProfile;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;

public class BusinessProfileRequest {
    @Setter
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Create {
        @NotBlank(message = "비즈니스 프로필 이름은 공백일 수 없습니다.")
        @Length(max = 20, message = "비즈니스 프로필 이름 길이는 최소 1자부터 20자까지 입니다.")
        private String name;
        @NotBlank(message = "비즈니스 프로필 장소은 공백일 수 없습니다.")
        private String place;
        private String placeDetail;
        @NotBlank(message = "비즈니스 프로필 연락처은 공백일 수 없습니다.")
        private String contact;
        private MultipartFile avatar;

        public BusinessProfile toEntity(){
            return BusinessProfile.builder()
                    .name(name)
                    .place(place)
                    .placeDetail(placeDetail)
                    .contact(contact)
                    .build();
        }
    }

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Update {
        @NotBlank(message = "비즈니스 프로필 이름은 공백일 수 없습니다.")
        @Length(max = 20, message = "비즈니스 프로필 이름 길이는 최소 1자부터 20자까지 입니다.")
        private String name;
        @NotBlank(message = "비즈니스 프로필 장소은 공백일 수 없습니다.")
        private String place;
        private String placeDetail;
        @NotBlank(message = "비즈니스 프로필 연락처은 공백일 수 없습니다.")
        private String contact;
        private MultipartFile avatar;
        private boolean avatarChanged;

        public BusinessProfile toEntity(){
            return BusinessProfile.builder()
                    .name(name)
                    .place(place)
                    .placeDetail(placeDetail)
                    .contact(contact)
                    .build();
        }
    }
}
