package com.minibeit.postapplicant.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class DuplicateApplyException extends InvalidValueException {
    public DuplicateApplyException() {
        super("중복 지원을 할 수 없습니다.");
    }
}
