package com.minibeit.file.service.exception;

import com.minibeit.common.exception.BusinessException;

public class S3FileUploadException extends BusinessException {
    public S3FileUploadException() {
        super("S3파일업로드에서 IOException이 발생했습니다.");
    }
}
