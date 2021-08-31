package com.minibeit.post.service.exception;

import com.minibeit.common.exception.EntityNotFoundException;

public class PostNotFoundException extends EntityNotFoundException {
    public PostNotFoundException() {
        super("없는 게시물 입니다.");
    }
}
