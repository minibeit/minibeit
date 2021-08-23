package com.minibeit.common.advice;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ErrorResponse {
    private String status;
    private String error;
    private String message;
}
