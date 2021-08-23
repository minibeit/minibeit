package com.minibeit.common.advice;

import com.minibeit.common.exception.BusinessException;
import com.minibeit.common.exception.PermissionException;
import com.minibeit.security.exception.TokenException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> businessExceptionHandler(BusinessException ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .status("400")
                .error(ex.getClass().getSimpleName())
                .message(ex.getMessage())
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PermissionException.class)
    public ResponseEntity<ErrorResponse> permissionExceptionHandler(PermissionException ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .status("401")
                .error(ex.getClass().getSimpleName())
                .message(ex.getMessage())
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(TokenException.class)
    public ResponseEntity<ErrorResponse> tokenExceptionHandler(TokenException ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .status("401")
                .error(ex.getClass().getSimpleName())
                .message(ex.getMessage())
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }
}
