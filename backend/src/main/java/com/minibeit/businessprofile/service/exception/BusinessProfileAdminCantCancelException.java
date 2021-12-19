package com.minibeit.businessprofile.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class BusinessProfileAdminCantCancelException extends InvalidValueException {
    public BusinessProfileAdminCantCancelException(){
        super("어드민 유저은 비즈니스 프로필을 나갈 수 없습니다.");
    }
}
