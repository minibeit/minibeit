package com.minibeit.businessprofile.service.exception;

import com.minibeit.common.exception.EntityNotFoundException;

public class BusinessReviewDetailNotFoundException extends EntityNotFoundException {
    public BusinessReviewDetailNotFoundException() {
        super("존재하지 않는 리뷰입니다.");
    }
}
