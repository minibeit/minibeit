package com.minibeit.user.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class DuplicateNickNameException extends InvalidValueException {
    public DuplicateNickNameException() {
        super("닉네임이 중복되었습니다.");
    }
}
