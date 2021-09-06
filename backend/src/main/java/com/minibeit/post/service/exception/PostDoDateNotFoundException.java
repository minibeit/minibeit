package com.minibeit.post.service.exception;

import com.minibeit.common.exception.EntityNotFoundException;

public class PostDoDateNotFoundException extends EntityNotFoundException {
    public PostDoDateNotFoundException() {
        super("게시물에 해당 날짜에 실험이 없습니다.");
    }
}
