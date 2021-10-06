package com.minibeit.businessprofile.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class BusinessProfileInWork extends InvalidValueException {
    public BusinessProfileInWork() {
        super("해당 비즈니스 프로필에 삭제되지 않은 게시물이 있습니다.");
    }
}
