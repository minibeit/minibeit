package com.minibeit.businessprofile.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class BusinessProfileCountExceedException extends InvalidValueException {
    public BusinessProfileCountExceedException() {
        super("비즈니스 프로필 개수가 너무 많습니다.");
    }
}
