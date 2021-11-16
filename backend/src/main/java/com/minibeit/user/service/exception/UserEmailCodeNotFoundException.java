package com.minibeit.user.service.exception;

import com.minibeit.common.exception.EntityNotFoundException;

public class UserEmailCodeNotFoundException extends EntityNotFoundException {
    public UserEmailCodeNotFoundException() {
        super("없는 인증번호입니다.");
    }
}
