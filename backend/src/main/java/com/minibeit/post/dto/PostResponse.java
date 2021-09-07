package com.minibeit.post.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostReview;
import com.minibeit.user.domain.User;
import lombok.*;

import java.time.LocalDate;
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
    public static class PostReviewId {
        private Long id;

        public static PostResponse.PostReviewId build(PostReview postReview) {
            return PostResponse.PostReviewId.builder()
                    .id(postReview.getId())
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
        private String place;
        private String contact;
        private String payment;
        private String goods;
        private Integer cache;
        private boolean recruitCondition;
        private String recruitConditionDetail;
        private Integer doTime;
        private String schoolName;
        private boolean isMine;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endDate;
        private List<PostFileDto.Image> files;

        public static PostResponse.GetOne build(Post post, User user) {
            return GetOne.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .place(post.getPlace())
                    .contact(post.getContact())
                    .payment(post.getPayment().name())
                    .goods(post.getPaymentGoods())
                    .cache(post.getPaymentCache())
                    .recruitCondition(post.isRecruitCondition())
                    .recruitConditionDetail(post.getRecruitConditionDetail())
                    .doTime(post.getDoTime())
                    .schoolName(post.getSchool().getName())
                    .startDate(post.getStartDate())
                    .endDate(post.getEndDate())
                    .files(post.getPostFileList().stream().map(PostFileDto.Image::build).collect(Collectors.toList()))
                    .isMine(user.postIsMine(post))
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
        private String payment;
        private String goods;
        private Integer cache;
        private boolean recruitCondition;
        private String recruitConditionDetail;
        private Integer doTime;
        private List<String> startTimeList;

        public static PostResponse.GetList build(Post post, LocalDate doDate) {
            return GetList.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .payment(post.getPayment().name())
                    .goods(post.getPaymentGoods())
                    .cache(post.getPaymentCache())
                    .recruitCondition(post.isRecruitCondition())
                    .recruitConditionDetail(post.getRecruitConditionDetail())
                    .doTime(post.getDoTime())
                    .startTimeList(post.getPostDoDateList().stream()
                            .filter(postDoDate -> postDoDate.getDoDate().toLocalDate().equals(doDate))
                            .map(postDoDate -> postDoDate.getDoDate().getHour() + ":" + postDoDate.getDoDate().getMinute())
                            .collect(Collectors.toList()))
                    .build();
        }
    }
}
