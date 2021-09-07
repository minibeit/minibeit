package com.minibeit.post.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class PostIsFullException extends InvalidValueException {
    public PostIsFullException() {
        super("모집인원을 초과했습니다.");
    }
}
