package com.minibeit.file.domain;

import lombok.Getter;

@Getter
public enum FileServer {
    DISK,
    S3,
    EXTERNAL;
}
