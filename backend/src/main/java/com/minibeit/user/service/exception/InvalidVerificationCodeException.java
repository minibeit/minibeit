package com.minibeit.user.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class InvalidVerificationCodeException extends InvalidValueException {
    public InvalidVerificationCodeException() {
        super("유효하지 않은 인증코드입니다.");
    }
}
