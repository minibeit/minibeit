package com.minibeit.businessprofile.service.exception;

import com.minibeit.common.exception.EntityNotFoundException;

public class UserBusinessProfileNotFoundException extends EntityNotFoundException {
    public UserBusinessProfileNotFoundException() {
        super("공유된 유저가 아닙니다.");
    }
}
