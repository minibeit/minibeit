package com.minibeit.user.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class PasswordWrongException extends InvalidValueException {
    public PasswordWrongException() {
        super("비밀번호가 잘못 되었습니다.");
    }
}
