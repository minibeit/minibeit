package com.minibeit.common.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ApiResult<T> {
    private int status ;
    private boolean success;
    private T data;

    public static<T> ApiResult<T> build(int status,T data){
        return ApiResult.<T>builder()
                .status(status)
                .data(data)
                .success(true)
                .build();
    }

    public static<T> ApiResult<T> build(int status){
        return ApiResult.<T>builder()
                .status(status)
                .success(true)
                .build();
    }
}
