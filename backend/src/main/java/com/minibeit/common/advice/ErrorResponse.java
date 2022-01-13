package com.minibeit.common.advice;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ErrorResponse {
    private int status;
    private Boolean success;
    private CustomError error;

    public static ErrorResponse build(int status, Exception ex) {
        return ErrorResponse.builder()
                .status(status)
                .success(false)
                .error(CustomError.builder()
                        .type(ex.getClass().getSimpleName())
                        .info(ex.getMessage())
                        .build())
                .build();
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    private static class CustomError {
        private String type;
        private String info;
    }
}
