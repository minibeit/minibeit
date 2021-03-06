package com.minibeit.post.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.minibeit.post.domain.*;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class PostRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateInfo {
        @NotBlank(message = "반려 사유가 공백일 수 없습니다.")
        @Length(max = 40, message = "게시물 제목 길이는 1자부터 40자까지 입니다.")
        private String title;
        private String content;
        @NotBlank(message = "실험 장소가 공백일 수 없습니다.")
        private String place;
        private String placeDetail;
        @NotBlank(message = "연락처가 공백일 수 없습니다.")
        private String contact;
        @NotBlank(message = "실험 분류가 공백일 수 없습니다.")
        private String category;
        @NotNull(message = "모집인원이 null일 수 없습니다.")
        private Integer headcount;
        private Payment payment;
        private Integer cache;
        private String goods;
        private String paymentDetail;
        private boolean condition;
        private String conditionDetail;
        @NotNull(message = "실험 소요시간이 null 일 수 없습니다.")
        private Integer doTime;
        @NotNull(message = "학교식별자가 null 일 수 없습니다.")
        private Long schoolId;
        @NotNull(message = "모집하는 비즈니스프로필 식별자가 null 일 수 없습니다.")
        private Long businessProfileId;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime startDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime endDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private List<PostDto.PostDoDate> doDateList;

        public Post toEntity() {
            return Post.builder()
                    .title(title)
                    .content(content)
                    .place(place)
                    .placeDetail(placeDetail)
                    .contact(contact)
                    .category(category)
                    .recruitPeople(headcount)
                    .payment(payment)
                    .paymentCache(cache)
                    .paymentGoods(goods)
                    .paymentDetail(paymentDetail)
                    .recruitCondition(condition)
                    .recruitConditionDetail(conditionDetail)
                    .doTime(doTime)
                    .startDate(startDate)
                    .endDate(endDate)
                    .postStatus(PostStatus.RECRUIT)
                    .build();
        }

        public List<PostDoDate> toPostDoDates() {
            return doDateList.stream().map(postDoDate -> PostDoDate.builder().doDate(postDoDate.getDoDate()).isFull(false).build()).collect(Collectors.toList());
        }
    }

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class AddFile {
        private MultipartFile thumbnail;
        private List<MultipartFile> files;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class UpdateContent {
        @NotBlank(message = "수정내용이 공백일 수 없습니다.")
        private String updatedContent;

        public Post toEntity() {
            return Post.builder()
                    .content(updatedContent)
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class RejectComment {
        @NotBlank(message = "반려 사유가 공백일 수 없습니다.")
        private String rejectComment;

        public RejectPost toEntity() {
            return RejectPost.builder().rejectComment(getRejectComment()).build();
        }
    }
}
