package com.minibeit.post.service.mock;

import com.minibeit.post.domain.PostFile;

import java.util.ArrayList;
import java.util.List;

public class MockPostFile {
    public static class MockPostFile1 {
        public static final Long ID = 1L;
        public static final String NAME = "file name";
        public static final String FILE_URL = "file url";
        public static final PostFile POST_FILE = PostFile.builder()
                .id(ID)
                .name(NAME)
                .url(FILE_URL)
                .build();
        public static final List<PostFile> POST_FILE_LIST = new ArrayList<>();
    }
}
