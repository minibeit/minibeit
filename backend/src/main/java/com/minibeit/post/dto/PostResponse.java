package com.minibeit.post.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.minibeit.post.domain.ApplyStatus;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostDoDate;
import com.minibeit.security.userdetails.CustomUserDetails;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class PostResponse {
    @Getter
    @Builder
    @NoArgsConstructor
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
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetOne {
        private Long id;
        private String title;
        private String content;
        private String updatedContent;
        private String place;
        private String contact;
        private String payment;
        private String goods;
        private Integer cache;
        private String paymentDetail;
        private boolean recruitCondition;
        private String[] recruitConditionDetail;
        private Integer doTime;
        private String schoolName;
        private Boolean isLike;
        private Boolean isMine;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime startDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime endDate;
        private List<PostFileDto.Image> files;
        private PostDto.BusinessProfileInfo businessProfileInfo;

        public static PostResponse.GetOne build(Post post, CustomUserDetails customUserDetails) {
            final GetOneBuilder getOneBuilder = GetOne.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .updatedContent(post.getUpdatedContent())
                    .place(post.getPlace())
                    .contact(post.getContact())
                    .payment(post.getPayment().name())
                    .goods(post.getPaymentGoods())
                    .cache(post.getPaymentCache())
                    .paymentDetail(post.getPaymentDetail())
                    .recruitCondition(post.isRecruitCondition())
                    .doTime(post.getDoTime())
                    .schoolName(post.getSchool().getName())
                    .startDate(post.getStartDate())
                    .endDate(post.getEndDate())
                    .files(post.getPostFileList().stream().map(PostFileDto.Image::build).collect(Collectors.toList()))
                    .businessProfileInfo(PostDto.BusinessProfileInfo.build(post.getBusinessProfile()))
                    .isMine(post.isMine(customUserDetails))
                    .isLike(post.isLike(customUserDetails));
            if (post.getRecruitConditionDetail() != null) {
                getOneBuilder.recruitConditionDetail(post.getRecruitConditionDetail().split("\\|"));
            }
            return getOneBuilder.build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
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
    @NoArgsConstructor
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

        public static PostResponse.GetList build(Post post, CustomUserDetails customUserDetails) {
            return GetList.builder()
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
                    .likes(post.getPostLikeList().size())
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetLikeList {
        private Long id;
        private String title;

        public static PostResponse.GetLikeList build(Post post) {
            return GetLikeList.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    public static class GetMyApplyList {
        private Long id;
        private String title;
        private String contact;
        private boolean recruitCondition;
        private Long postDoDateId;
        private Integer time;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime doDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startTime;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endTime;
        private boolean finish;
        private String status;

        @Builder
        @QueryProjection
        public GetMyApplyList(Long id, String title, Integer time, String contact, boolean recruitCondition, Long postDoDateId, LocalDateTime doDate, String status, boolean businessFinish) {
            this.id = id;
            this.title = title;
            this.time = time;
            this.contact = contact;
            this.recruitCondition = recruitCondition;
            this.postDoDateId = postDoDateId;
            this.doDate = doDate;
            this.startTime = doDate;
            this.endTime = doDate.plusMinutes(time);
            this.status = status;
            this.finish = endTime.isBefore(LocalDateTime.now()) && businessFinish && status.equals(ApplyStatus.APPROVE.name());
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    public static class GetMyCompletedList {
        private Long postId;
        private Long postDoDateId;
        private String title;
        private Long reviewId;
        private String review;
        private Boolean isWritable;
        @JsonIgnore
        private LocalDateTime postDoDate;

        @Builder
        @QueryProjection
        public GetMyCompletedList(Long postId, Long postDoDateId, String title, Long reviewId, String review, LocalDateTime postDoDate) {
            this.postId = postId;
            this.postDoDateId = postDoDateId;
            this.title = title;
            this.reviewId = reviewId;
            this.review = review;
            this.isWritable = postDoDate.plusDays(7).isAfter(LocalDateTime.now());
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetListByBusinessProfile {
        private Long id;
        private String title;
        private Integer likes;

        public static GetListByBusinessProfile build(Post post) {

            return GetListByBusinessProfile.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .likes(post.getPostLikeList().size())
                    .build();
        }
    }
}
