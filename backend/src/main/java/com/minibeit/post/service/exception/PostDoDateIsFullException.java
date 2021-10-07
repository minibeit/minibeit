package com.minibeit.post.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class PostDoDateIsFullException extends InvalidValueException {
    public PostDoDateIsFullException() {
        super("모집인원을 초과했습니다.");
    }
}
