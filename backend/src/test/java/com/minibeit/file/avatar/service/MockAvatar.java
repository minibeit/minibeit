package com.minibeit.file.avatar.service;

import com.minibeit.file.domain.Avatar;

public class MockAvatar {
    public static class MockAvatar1 {
        public static final Long ID = 1L;
        public static final String NAME = "file name";
        public static final String FILE_URL = "file url";
        public static final Avatar AVATAR_1 = Avatar.builder()
                .id(ID)
                .name(NAME)
                .url(FILE_URL)
                .build();
    }
}
