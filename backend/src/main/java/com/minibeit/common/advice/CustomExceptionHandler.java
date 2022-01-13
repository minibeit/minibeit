package com.minibeit.common.advice;

import com.minibeit.common.exception.BusinessException;
import com.minibeit.common.exception.PermissionException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> businessExceptionHandler(BusinessException ex) {
        ErrorResponse response = ErrorResponse.build(HttpServletResponse.SC_BAD_REQUEST, ex);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PermissionException.class)
    public ResponseEntity<ErrorResponse> permissionExceptionHandler(PermissionException ex) {
        ErrorResponse response = ErrorResponse.build(HttpServletResponse.SC_UNAUTHORIZED, ex);

        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}
