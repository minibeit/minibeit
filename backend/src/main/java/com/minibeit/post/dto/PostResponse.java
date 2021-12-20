package com.minibeit.post.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.google.common.collect.Sets;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.security.userdetails.CustomUserDetails;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class PostResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class OnlyId {
        private Long id;

        public static PostResponse.OnlyId build(Post post) {
            return PostResponse.OnlyId.builder()
                    .id(post.getId())
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetOne {
        private Long id;
        private String title;
        private String content;
        private String address;
        private String addressDetail;
        private String contact;
        private String payment;
        private String goods;
        private Integer cache;
        private String paymentDetail;
        private boolean recruitCondition;
        private String[] recruitConditionDetail;
        private Integer doTime;
        private String schoolName;
        private String category;
        private Integer likes;
        private Boolean isLike;
        private Boolean isMine;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime startDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime endDate;
        private List<PostFileDto.Image> files;
        private PostDto.BusinessProfileInfo businessProfileInfo;

        public static PostResponse.GetOne build(Post post, CustomUserDetails customUserDetails) {
            GetOneBuilder getOneBuilder = GetOne.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .address(post.getPlace())
                    .addressDetail(post.getPlaceDetail())
                    .contact(post.getContact())
                    .payment(post.getPayment().name())
                    .goods(post.getPaymentGoods())
                    .cache(post.getPaymentCache())
                    .paymentDetail(post.getPaymentDetail())
                    .recruitCondition(post.isRecruitCondition())
                    .doTime(post.getDoTime())
                    .category(post.getCategory())
                    .schoolName(post.getSchool().getName())
                    .startDate(post.getStartDate())
                    .endDate(post.getEndDate())
                    .files(post.getPostFileList().stream().map(PostFileDto.Image::build).collect(Collectors.toList()))
                    .businessProfileInfo(PostDto.BusinessProfileInfo.build(post.getBusinessProfile()))
                    .isMine(post.isMine(customUserDetails))
                    .isLike(post.isLike(customUserDetails))
                    .likes(post.getPostLikeList().size());
            if (post.getRecruitConditionDetail() != null) {
                getOneBuilder.recruitConditionDetail(post.getRecruitConditionDetail().split("\\|"));
            }
            return getOneBuilder.build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetPostStartTime {
        private Long id;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startTime;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endTime;
        private Boolean isFull;

        public static GetPostStartTime build(PostDoDate postDoDate, Post post) {
            return GetPostStartTime.builder()
                    .id(postDoDate.getId())
                    .startTime(postDoDate.getDoDate())
                    .endTime(postDoDate.getDoDate().plusMinutes(post.getDoTime()))
                    .isFull(postDoDate.isFull())
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetList {
        private Long id;
        private String title;
        private String category;
        private String payment;
        private String goods;
        private Integer cache;
        private boolean recruitCondition;
        private Integer doTime;
        private String businessProfileName;
        private Boolean isLike;
        private Integer likes;
        private PostFileDto.Image file;

        public static PostResponse.GetList build(Post post, CustomUserDetails customUserDetails) {
            GetListBuilder builder = GetList.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .category(post.getCategory())
                    .payment(post.getPayment().name())
                    .goods(post.getPaymentGoods())
                    .cache(post.getPaymentCache())
                    .recruitCondition(post.isRecruitCondition())
                    .doTime(post.getDoTime())
                    .businessProfileName(post.getBusinessProfile().getName())
                    .isLike(post.isLike(customUserDetails))
                    .likes(post.getPostLikeList().size());
            if (!post.getPostFileList().isEmpty()) {
                builder.file(PostFileDto.Image.build(post.getPostFileList().get(0))).build();
            }
            return builder.build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetLikeList {
        private Long id;
        private String title;
        private String thumbnail;
        private String payment;
        private boolean recruitCondition;
        private Integer doTime;
        private PostDto.BusinessProfileSimpleInfo businessProfile;


        public static PostResponse.GetLikeList build(Post post) {
            return GetLikeList.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .thumbnail(post.getThumbnail())
                    .payment(post.getPayment().name())
                    .recruitCondition(post.isRecruitCondition())
                    .doTime(post.getDoTime())
                    .businessProfile(PostDto.BusinessProfileSimpleInfo.build(post.getBusinessProfile().getId(), post.getBusinessProfile().getName()))
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetMyApplyList {
        private Long id;
        private String title;
        private String contact;
        private String thumbnail;
        private boolean recruitCondition;
        private Long postDoDateId;
        private Integer time;
        private String category;
        private String address;
        private String addressDetail;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime doDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startTime;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endTime;
        private boolean finish;
        private String status;
        private Boolean isWritable;
        private Boolean writeReview;
        private PostDto.BusinessProfileSimpleInfo businessProfile;

        @Builder
        @QueryProjection
        public GetMyApplyList(Long id, String title, Integer time, String category, String address, String addressDetail, String contact, String thumbnail, boolean recruitCondition, Long postDoDateId, LocalDateTime doDate, String status, boolean businessFinish, boolean writeReview, Long businessProfileId, String businessProfileName) {
            this.id = id;
            this.title = title;
            this.time = time;
            this.category = category;
            this.address = address;
            this.addressDetail = addressDetail;
            this.contact = contact;
            this.thumbnail = thumbnail;
            this.recruitCondition = recruitCondition;
            this.postDoDateId = postDoDateId;
            this.doDate = doDate;
            this.startTime = doDate;
            this.endTime = doDate.plusMinutes(time);
            this.status = status;
            this.finish = endTime.isBefore(LocalDateTime.now()) && businessFinish && status.equals(ApplyStatus.APPROVE.name());
            this.writeReview = writeReview;
            this.isWritable = doDate.plusDays(7).isAfter(LocalDateTime.now()) && businessFinish && !writeReview;
            this.businessProfile = PostDto.BusinessProfileSimpleInfo.build(businessProfileId, businessProfileName);
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetListByBusinessProfile {
        private Long id;
        private String title;
        private Integer likes;
        private String thumbnail;
        private String address;
        private String addressDetail;
        private String businessName;
        private Integer headcount;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime startDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime endDate;

        public static GetListByBusinessProfile build(Post post) {
            return GetListByBusinessProfile.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .address(post.getPlace())
                    .thumbnail(post.getThumbnail())
                    .addressDetail(post.getPlaceDetail())
                    .likes(post.getPostLikeList().size())
                    .startDate(post.getStartDate())
                    .endDate(post.getEndDate())
                    .headcount(post.getRecruitPeople())
                    .businessName(post.getBusinessProfile().getName())
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class DoDateList {
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private Set<LocalDate> doDateList;

        public static PostResponse.DoDateList build(List<PostDoDate> postDoDates) {
            List<LocalDate> localDates = postDoDates.stream().map(postDoDate -> postDoDate.getDoDate().toLocalDate()).collect(Collectors.toList());
            return DoDateList.builder()
                    .doDateList(Sets.newHashSet(localDates))
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class ApproveAndApproveCancelTemplate {
        private String title;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime doDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startTime;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endTime;

        public static ApproveAndApproveCancelTemplate build(String title, LocalDateTime doDate, Integer doTime) {
            return ApproveAndApproveCancelTemplate.builder()
                    .title(title)
                    .doDate(doDate)
                    .startTime(doDate)
                    .endTime(doDate.plusMinutes(doTime))
                    .build();
        }
    }
}
