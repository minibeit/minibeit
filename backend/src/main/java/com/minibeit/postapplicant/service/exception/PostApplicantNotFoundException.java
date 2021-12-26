package com.minibeit.postapplicant.service.exception;

import com.minibeit.common.exception.EntityNotFoundException;

public class PostApplicantNotFoundException extends EntityNotFoundException {
    public PostApplicantNotFoundException() {
        super("없는 참여자 입니다.");
    }
}
