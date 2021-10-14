package com.minibeit.businessprofile.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class BusinessProfileNotPermission extends InvalidValueException {
    public BusinessProfileNotPermission(){
        super("어드민 유저를 취소할수 없습니다. ");
    }
}
