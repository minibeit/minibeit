package com.minibeit.common.domain;

import lombok.Getter;

@Getter
public enum FileServer {
    DISK,
    S3,
    EXTERNAL;
}
