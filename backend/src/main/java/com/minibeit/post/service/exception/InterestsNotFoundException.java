package com.minibeit.post.service.exception;

import com.minibeit.common.exception.EntityNotFoundException;

public class InterestsNotFoundException extends EntityNotFoundException {
    public InterestsNotFoundException() {
        super("없는 관심분야입니다.");
    }
}
