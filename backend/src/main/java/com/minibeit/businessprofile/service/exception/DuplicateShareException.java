package com.minibeit.businessprofile.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class DuplicateShareException extends InvalidValueException {

    public DuplicateShareException() {
        super("이미 공유된 유저입니다.");
    }
}
