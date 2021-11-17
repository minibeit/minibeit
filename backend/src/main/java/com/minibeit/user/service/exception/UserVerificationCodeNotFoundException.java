package com.minibeit.user.service.exception;

import com.minibeit.common.exception.EntityNotFoundException;

public class UserVerificationCodeNotFoundException extends EntityNotFoundException {
    public UserVerificationCodeNotFoundException() {
        super("없는 인증번호입니다.");
    }
}
