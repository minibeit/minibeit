package com.minibeit.user.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class InvalidEmailCodeException extends InvalidValueException {
    public InvalidEmailCodeException() {
        super("유효하지 않은 인증코드입니다.");
    }
}
