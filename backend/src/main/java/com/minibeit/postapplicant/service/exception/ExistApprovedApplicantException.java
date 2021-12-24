package com.minibeit.postapplicant.service.exception;

import com.minibeit.common.exception.InvalidValueException;

public class ExistApprovedApplicantException extends InvalidValueException {
    public ExistApprovedApplicantException() {
        super("끝나지 않은 실험에 확정자가 남아있습니다.");
    }
}
