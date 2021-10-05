package com.minibeit.post.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class ExistApprovedApplicant extends InvalidValueException {
    public ExistApprovedApplicant() {
        super("끝나지 않은 실험에 확정자가 남아있습니다.");
    }
}
