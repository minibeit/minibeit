package com.minibeit.businessprofile.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class BusinessProfilesReviewRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Create {
        @NotBlank(message = "후기 제목은 공백일 수 없습니다.")
        private String postTitle;
        @NotBlank(message = "후기 내용은 공백일 수 없습니다.")
        private String content;
        @NotNull(message = "실험 소요시간은 공백일 수 없습니다.")
        private Integer time;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime doDate;
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Update {
        @NotBlank(message = "후기 내용은 공백일 수 없습니다.")
        private String content;
    }
}
