package com.minibeit.user.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class EmailExistedException extends InvalidValueException {
    public EmailExistedException() {
        super("이메일이 중복되었습니다.");
    }
}
