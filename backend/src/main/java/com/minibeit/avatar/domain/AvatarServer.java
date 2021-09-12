package com.minibeit.avatar.domain;

import lombok.Getter;

@Getter
public enum AvatarServer {
    DISK,
    S3,
    EXTERNAL;
}
