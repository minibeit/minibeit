package com.minibeit.businessprofile.dto;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.domain.UserBusinessProfile;
import com.minibeit.post.domain.Post;
import com.minibeit.user.domain.User;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

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
    public static class PostList{

        private String title;
        private Integer numberOfPostLike;

        public static BusinessProfileResponse.PostList build(Post post){

            return PostList.builder().title(post.getTitle()).numberOfPostLike(getPostLike(post)).build();
        }

        private static int getPostLike(Post post) {
            if(post.getPostLikeList() == null){
                return 0;
            }
            return post.getPostLikeList().size();
        }


    }
}
