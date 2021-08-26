package com.minibeit.businessprofile.service.exception;

import com.minibeit.common.exception.EntityNotFoundException;

public class BusinessProfileNotFoundException extends EntityNotFoundException {
    public BusinessProfileNotFoundException() {
        super("존재하지 않는 비즈니스 프로필입니다.");
    }
}
