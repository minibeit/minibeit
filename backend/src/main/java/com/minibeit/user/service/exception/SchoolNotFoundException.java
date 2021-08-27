package com.minibeit.user.service.exception;

import com.minibeit.common.exception.EntityNotFoundException;

public class SchoolNotFoundException extends EntityNotFoundException {
    public SchoolNotFoundException() {
        super("존재하지 않는 학교입니다.");
    }
}
