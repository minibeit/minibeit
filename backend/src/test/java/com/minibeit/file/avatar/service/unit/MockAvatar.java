package com.minibeit.file.avatar.service.unit;

import com.minibeit.file.domain.Avatar;
import com.minibeit.file.service.dto.SavedFile;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

public class MockAvatar {
    public static class MockAvatar1 {
        public static final Long ID = 1L;
        public static final String NAME = "file name";
        public static final String FILE_URL = "file url";
        public static final MultipartFile MULTIPART_FILE_AVATAR = new MockMultipartFile("filename", "test".getBytes());

        public static final Avatar AVATAR = Avatar.builder()
                .id(ID)
                .name(NAME)
                .url(FILE_URL)
                .build();

        public static final SavedFile SAVED_FILE=SavedFile.builder()
                .name("file name")
                .build();
    }
}
