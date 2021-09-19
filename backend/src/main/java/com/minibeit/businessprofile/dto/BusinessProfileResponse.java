package com.minibeit.businessprofile.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.minibeit.businessprofile.domain.BusinessProfile;

import com.minibeit.post.domain.Post;

import com.minibeit.post.dto.PostResponse;
import com.minibeit.user.domain.User;
import lombok.*;
import org.springframework.context.annotation.Description;

import java.time.LocalDateTime;

public class BusinessProfileResponse {
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class IdAndName {
        private Long id;
        private String name;

        public static BusinessProfileResponse.IdAndName build(BusinessProfile businessProfile) {
            return IdAndName.builder().id(businessProfile.getId()).name(businessProfile.getName()).build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetOne {
        private Long id;
        private String name;
        private String principalInvestigator;
        private String place;
        private String introduce;
        private String contact;
        private boolean isMine;
        private Long numberOfEmployees;
        private String avatar;

        public static BusinessProfileResponse.GetOne build(BusinessProfile businessProfile, long numberOfEmployees, User user) {
            GetOneBuilder getOneBuilder = GetOne.builder()
                    .id(businessProfile.getId())
                    .name(businessProfile.getName())
                    .principalInvestigator(businessProfile.getAdmin().getName())
                    .place(businessProfile.getPlace())
                    .introduce(businessProfile.getIntroduce())
                    .contact(businessProfile.getContact())
                    .numberOfEmployees(numberOfEmployees)
                    .isMine(user.businessProfileIsMine(businessProfile));
            if (businessProfile.getAvatar() != null) {
                return getOneBuilder.avatar(businessProfile.getAvatar().getUrl()).build();
            }
            return getOneBuilder.build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetList {
        private Long id;
        private String name;
        private String avatar;

        public static BusinessProfileResponse.GetList build(BusinessProfile businessProfile) {
            GetListBuilder getListBuilder = GetList.builder().id(businessProfile.getId()).name(businessProfile.getName());
            if (businessProfile.getAvatar() != null) {
                getListBuilder.avatar(businessProfile.getAvatar().getUrl()).build();
            }
            return getListBuilder.build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class ReviewList{
        private String title;
        private String content;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startDate;

        //private Integer doTime;

        public static BusinessProfileResponse.ReviewList build(Post post){
            return ReviewList.builder().title(post.getTitle()).content(post.getContent()).startDate(post.getStartDate()).build();
        }
    }
}
