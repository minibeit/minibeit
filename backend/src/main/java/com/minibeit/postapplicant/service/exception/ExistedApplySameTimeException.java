package com.minibeit.postapplicant.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class ExistedApplySameTimeException extends InvalidValueException {
    public ExistedApplySameTimeException() {
        super("지원자의 확정된 모집중 시간이 겹치는 모집이 있습니다.");
    }
}
